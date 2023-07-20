import {
  Box,
  CollectionPreferences,
  CollectionPreferencesProps,
  TableProps,
} from '@cloudscape-design/components';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export interface Author {
  id: string;
  name: string;
  country: string;
}

export const COLUMN_DEFINITIONS: TableProps.ColumnDefinition<Author>[] = [
  {
    id: 'id',
    sortingField: 'id',
    header: 'Id',
    cell: (author: Author) => (
      <div>
        <Link to={`/author/${author.id}`}>{author.id}</Link>
      </div>
    ),
    width: 50,
  },
  {
    id: 'name',
    sortingField: 'name',
    header: 'Name',
    cell: (author: Author) => author.name,
    minWidth: 160,
  },
  {
    id: 'country',
    sortingField: 'country',
    header: 'Country',
    cell: (author: Author) => author.country,
    minWidth: 100,
  },
];

export const MyCollectionPreferences = ({
  preferences,
  setPreferences,
}: {
  preferences: CollectionPreferencesProps.Preferences;
  setPreferences: (preferences: CollectionPreferencesProps.Preferences) => void;
}) => {
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

type EmptyStateProps = {
  title: string;
  subtitle: string;
  action: ReactNode;
};

export function EmptyState({ title, subtitle, action }: EmptyStateProps) {
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
