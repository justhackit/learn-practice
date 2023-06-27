import React, { useState } from 'react';
import {
  Box,
  Button,
  Header,
  Pagination,
  Table,
  TextFilter,
  CollectionPreferences,
} from '@cloudscape-design/components';
import { useCollection } from '@cloudscape-design/collection-hooks';

import { authors, authorsStatic } from './AuthorsDB';

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

function AuthorsList() {
  const [preferences, setPreferences] = useState({
    visibleContent: ['id', 'name', 'country'],
    pageSize: 10,
  });
  const handleSetPreferences = (prefs) => {
    setPreferences(prefs.detail);
  };

  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    filterProps,
    paginationProps,
  } = useCollection(authorsStatic, {
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

  return (
    <Table
      {...collectionProps}
      header={
        <Header
          counter={
            selectedItems.length
              ? `${selectedItems.length}/${authorsStatic.length}`
              : `${authorsStatic.length}`
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
          filteringPlaceholder="Find Text..."
          countText={filteredItemsCount}
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
      selectionType="multi"
    ></Table>
  );
}

export default AuthorsList;
