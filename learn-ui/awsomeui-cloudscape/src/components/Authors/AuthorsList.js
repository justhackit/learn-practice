import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Header,
  Pagination,
  Table,
  TextFilter,
  CollectionPreferences,
  SpaceBetween,
} from '@cloudscape-design/components';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { getAuthors, deleteAuthor } from './AuthorsService';

const COLUMN_DEFNITIONS = [
  {
    id: 'id',
    header: 'Id',
    cell: (item) => item.id,
    width: 50,
  },
  {
    id: 'name',
    sortingField: 'name',
    header: 'Name',
    cell: (item) => item.name,
    minWidth: 160,
  },
  {
    id: 'country',
    sortingField: 'country',
    header: 'Country',
    cell: (item) => item.country,
    minWidth: 100,
  },
];

const MyCollectionPreferences = ({ preferences, setPreferences }) => {
  return (
    <CollectionPreferences
      preferences={preferences}
      onConfirm={(detail) => {
        setPreferences(detail);
      }}
      title="Preferences"
      confirmLabel="Confirm"
      cancelLabel="Cancel"
      pageSizePreference={{
        title: 'Page size',
        options: [
          { value: 5, label: '5 Authors' },
          { value: 10, label: '10 Authors' },
          { value: 20, label: '20 Authors' },
        ],
      }}
      wrapLinesPreference={{
        label: 'Wrap Lines',
        description: 'Check to see all the text and wrap the lines',
      }}
      visibleContentPreference={{
        title: 'Select visible columns',
        options: [
          {
            label: 'Author properties',
            options: [
              {
                id: 'id',
                label: 'Id',
                editable: false,
              },
              {
                id: 'name',
                label: 'Name',
              },
              {
                id: 'country',
                label: 'Country',
              },
            ],
          },
        ],
      }}
    />
  );
};

function EmptyTableSate({ title, subTitle, action }) {
  return (
    <Box textAlign="center">
      <Box variant="strong">{title}</Box>
      <Box variant="p" padding={{ bottom: 1 }}>
        {subTitle}
      </Box>
      <Box>{action}</Box>
    </Box>
  );
}

function AuthorsList(props) {
  const [preferences, setPreferences] = useState({
    visibleContent: ['id', 'name', 'country'],
    pageSize: 10,
  });
  const handleSetPreferences = (prefs) => {
    setPreferences(prefs.detail);
  };

  const [allItems, setAllItems] = useState([]);
  const [fetchingAuthors, setFetchingAuthors] = useState(false);

  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    filterProps,
    paginationProps,
  } = useCollection(allItems, {
    filtering: {
      empty: (
        <EmptyTableSate
          title="No Authors"
          subTitle="No Authors to display"
          action={<Button>Create Author</Button>}
        />
      ),
      noMatch: (
        <EmptyTableSate
          title="No Matches"
          subTitle="Search did not return any results"
          action={
            <Button
              onClick={() => {
                actions.setFiltering('');
              }}
            >
              Clear Filters
            </Button>
          }
        />
      ),
    },
    pagination: { pageSize: preferences.pageSize },
    sorting: {},
    selection: {},
  });

  const { selectedItems } = collectionProps;

  const getAuthorsHelper = () => {
    setFetchingAuthors(true);
    getAuthors().then((authors) => {
      setAllItems(authors);
      setFetchingAuthors(false);
    });
  };

  useEffect(() => {
    getAuthorsHelper();
  }, []);

  const handleEdit = (id) => {};
  const handleCreate = () => {};
  const handleDelete = () => {
    const selectedId = selectedItems[0].id;
    const confirm = window.confirm(
      `Are you sure you want to delete user ${selectedItems[0].name}`
    );
    if (confirm) {
      deleteAuthor(selectedId).then(() => {
        console.log('Author deleted');
        props.setShowNotifications([
          {
            type: 'success',
            content: `Author deleted successfully`,
            dismissible: true,
            onDismiss: () => {
              props.setShowNotifications([]);
            },
          },
        ]);
        getAuthorsHelper();
      });
    }
  };

  return (
    <Table
      {...collectionProps}
      loadingText="Fetching authors.."
      loading={fetchingAuthors}
      header={
        <Header
          counter={
            selectedItems.length
              ? `${selectedItems.length}/${allItems.length}`
              : `${allItems.length}`
          }
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button
                disabled={selectedItems.length === 0}
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Button
                disabled={selectedItems.length === 0}
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button onClick={handleCreate}>Create Author</Button>
            </SpaceBetween>
          }
        >
          Authors
        </Header>
      }
      columnDefinitions={COLUMN_DEFNITIONS}
      visibleColumns={preferences.visibleContent}
      filter={
        <TextFilter
          {...filterProps}
          filteringPlaceholder="Find an Author..."
          countText={`${filteredItemsCount} match found`}
        />
      }
      pagination={<Pagination {...paginationProps} />}
      preferences={
        <MyCollectionPreferences
          preferences={preferences}
          setPreferences={handleSetPreferences}
        />
      }
      items={items}
      selectionType="single"
    ></Table>
  );
}

export default AuthorsList;
