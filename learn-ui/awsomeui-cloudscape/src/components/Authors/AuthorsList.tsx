import { useState, useEffect } from 'react';
import {
  Button,
  Header,
  Pagination,
  Table,
  TextFilter,
  SpaceBetween,
  CollectionPreferencesProps,
  FlashbarProps,
} from '@cloudscape-design/components';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { getAuthors, deleteAuthor } from './AuthorsService';
import { useNavigate } from 'react-router-dom';
import {
  COLUMN_DEFINITIONS,
  Author,
  MyCollectionPreferences,
  EmptyState,
} from './authorslist-table-config';

interface Props {
  setShowNotifications: (
    notifications: FlashbarProps.MessageDefinition[]
  ) => void;
}

export default function AuthorsList(props: Props) {
  const [allItems, setAllItems] = useState([] as Author[]);
  const [preferences, setPreferences] =
    useState<CollectionPreferencesProps.Preferences>({
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

  const selectedItems = collectionProps.selectedItems;
  const selectedItem =
    selectedItems && selectedItems.length > 0 ? selectedItems[0].id : undefined;
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
      `Are you sure you wish to delete author "${selectedItem}"?`
    );
    if (confirm) {
      deleteAuthor(selectedItem!).then(() => {
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
    history(`/author/${selectedItem}`);
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
            selectedItems?.length
              ? `(${selectedItems.length}/${allItems.length})`
              : `(${allItems.length})`
          }
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button
                disabled={selectedItems?.length === 0}
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                disabled={selectedItems?.length === 0}
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
          countText={filteredItemsCount?.toString()}
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
