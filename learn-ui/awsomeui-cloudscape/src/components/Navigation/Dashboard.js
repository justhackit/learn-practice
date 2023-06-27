import React from 'react';
import {
  Box,
  Container,
  Header,
  SpaceBetween,
  ColumnLayout,
  Link,
} from '@cloudscape-design/components';

export default () => {
  return (
    <SpaceBetween>
      <Box variant="h1">Dashboard</Box>
      <Container
        header={
          <Header variant="h2" description="This is resource count">
            Service Overview
          </Header>
        }
      >
        <ColumnLayout columns="4">
          <div>
            <Box>Authors</Box>
            <Link fontSize="display-l" href="#">
              12
            </Link>
          </div>
          <div>
            <Box>Books</Box>
            <Link fontSize="display-l" href="#">
              32
            </Link>
          </div>
          <div>
            <Box>Publishers</Box>
            <Link fontSize="display-l" href="#">
              3
            </Link>
          </div>
          <div>
            <Box>Readers</Box>
            <Link fontSize="display-l" href="#">
              100
            </Link>
          </div>
        </ColumnLayout>
      </Container>
    </SpaceBetween>
  );
};
