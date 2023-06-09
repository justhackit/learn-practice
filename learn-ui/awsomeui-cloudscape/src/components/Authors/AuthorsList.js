import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Header,
  Pagination,
  Table,
  TextFilter,
  SpaceBetween,
  CollectionPreferences,
} from '@cloudscape-design/components';
//import { authors } from './AuthorsDB'
import { useCollection } from '@cloudscape-design/collection-hooks';
import { getAuthors, deleteAuthor } from './AuthorsService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const COLUMN_DEFINITIONS = [
  {
    id: 'id',
    sortingField: 'id',
    header: 'Id',
    cell: (item) => (
      <div>
        <Link to={`/author/${item.id}`}>{item.id}</Link>
      </div>
    ),
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
      title="Preferences"
      confirmLabel="Confirm"
      cancelLabel="Cancel"
      preferences={preferences}
      onConfirm={({ detail }) => setPreferences(detail)}
      pageSizePreference={{
        title: 'Page size',
        options: [
          { value: 10, label: '10 Authors' },
          { value: 30, label: '30 Authors' },
          { value: 50, label: '50 Authors' },
        ],
      }}
      wrapLinesPreference={{
        label: 'Wrap lines',
        description: 'Check to see all the text and wrap the lines',
      }}
      visibleContentPreference={{
        title: 'Select visible columns',
        options: [
          {
            label: 'Author properties',
            options: [
              { id: 'id', label: 'Id', editable: false },
              { id: 'name', label: 'Name' },
              { id: 'country', label: 'Country' },
            ],
          },
        ],
      }}
    />
  );
};

function EmptyState({ title, subtitle, action }) {
  return (
    <Box textAlign="center">
      <Box variant="strong">{title}</Box>
      <Box variant="p" padding={{ bottom: 's' }}>
        {subtitle}
      </Box>
      {action}
    </Box>
  );
}

export default function AuthorsList(props) {
  const [allItems, setAllItems] = useState([]);
  const [preferences, setPreferences] = useState({
    pageSize: 10,
    visibleContent: ['id', 'name', 'country'],
  });
  const [tableLoading, setTableLoading] = useState(false);
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
        <EmptyState
          title="No authors"
          subtitle="No authors to display."
          action={<Button>Create author</Button>}
        />
      ),
      noMatch: (
        <EmptyState
          title="No matches"
          subtitle="Your search didn't return any records."
          action={
            <Button onClick={() => actions.setFiltering('')}>
              Clear filter
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
  const history = useNavigate();

  useEffect(() => {
    refreshTable();
  }, []);

  const refreshTable = () => {
    setTableLoading(true);
    getAuthors().then((items) => {
      setAllItems(items);
      setTableLoading(false);
    });
  };

  function handleDelete() {
    const confirm = window.confirm(
      `Are you sure you wish to delete author "${selectedItems[0].id}"?`
    );
    if (confirm) {
      deleteAuthor(selectedItems[0].id).then(() => {
        console.log('Author deleted');
        getAuthors().then((items) => {
          setAllItems(items);
        });
        props.setShowNotifications([
          {
            type: 'success',
            content: 'Resource deleted successfully',
            dismissible: true,
            onDismiss: () => props.setShowNotifications([]),
          },
        ]);
      });
    }
  }

  function handleEdit() {
    history(`/author/${selectedItems[0].id}`);
  }

  function handleCreate() {
    history('/author/');
  }

  return (
    <Table
      {...collectionProps}
      loading={tableLoading}
      loadingText="Loading Table..."
      header={
        <Header
          counter={
            selectedItems.length
              ? `(${selectedItems.length}/${allItems.length})`
              : `(${allItems.length})`
          }
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button
                disabled={selectedItems.length === 0}
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                disabled={selectedItems.length === 0}
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Button variant="primary" onClick={handleCreate}>
                Create Author
              </Button>
            </SpaceBetween>
          }
        >
          Authors
        </Header>
      }
      filter={
        <TextFilter
          {...filterProps}
          filteringPlaceholder="Find text..."
          countText={filteredItemsCount}
        />
      }
      columnDefinitions={COLUMN_DEFINITIONS}
      visibleColumns={preferences.visibleContent}
      pagination={<Pagination {...paginationProps} />}
      preferences={
        <MyCollectionPreferences
          preferences={preferences}
          setPreferences={setPreferences}
        />
      }
      items={items}
      selectionType="single"
    />
  );
}
