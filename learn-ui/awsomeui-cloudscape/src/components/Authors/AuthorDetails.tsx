import React from 'react';
import {
  Form,
  FormField,
  Input,
  Container,
  Header,
  SpaceBetween,
  Button,
  ButtonProps,
  FlashbarProps,
} from '@cloudscape-design/components';
import { useEffect, useState } from 'react';
import { createAuthor, getAuthor, updateAuthor } from './AuthorsService';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { CancelableEventHandler } from '@cloudscape-design/components/internal/events';

interface Props {
  setShowNotifications: (
    notifications: FlashbarProps.MessageDefinition[]
  ) => void;
}

export default function AuthorDetails(props: Props) {
  const [id, setId] = useState<string>();
  const [name, setName] = useState<string>();
  const [country, setCountry] = useState<string>();
  const history = useNavigate();
  const { authorId } = useParams();

  function handleCancel() {
    history('/authors');
  }

  const handleSubmit: CancelableEventHandler<ButtonProps.ClickDetail> = (
    event
  ) => {
    event.preventDefault();

    if (!name) {
      alert('Please provide a name for this author');
      return;
    }
    if (!country) {
      alert('Please provide a country for this author');
      return;
    }

    if (authorId) {
      updateAuthor({ id, name, country }).then((json) => {
        console.log('Author updated successfully');
        props.setShowNotifications([
          {
            type: 'success',
            content: 'Resource updated successfully',
            dismissible: true,
            onDismiss: () => props.setShowNotifications([]),
          },
        ]);
        history('/authors');
      });
    } else {
      createAuthor({ name, country }).then((json) => {
        console.log('Author created successfully');
        props.setShowNotifications([
          {
            type: 'success',
            content: 'Resource created successfully',
            dismissible: true,
            onDismiss: () => props.setShowNotifications([]),
          },
        ]);
        history('/authors');
      });
    }
  };

  useEffect(() => {
    if (authorId) {
      getAuthor(authorId).then((author) => {
        setId(author.id);
        setName(author.name);
        setCountry(author.country);
      });
    }
  }, []);

  return (
    <Form
      actions={
        <SpaceBetween direction="horizontal" size="xs">
          <Button variant="link" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </SpaceBetween>
      }
      header={
        <Header variant="h1" description="Author details">
          {authorId ? 'Edit Author' : 'Create Author'}
        </Header>
      }
    >
      <Container header={<Header variant="h2">Author</Header>}>
        <SpaceBetween direction="vertical" size="l">
          <FormField label="Author Id" description="Author Id">
            <Input
              value={id!}
              disabled={true}
              onChange={(event) => setId(event.detail.value)}
            />
          </FormField>
          <FormField label="Name" description="Name">
            <Input
              value={name!}
              onChange={(event) => setName(event.detail.value)}
            />
          </FormField>
          <FormField label="Country" description="Country">
            <Input
              value={country!}
              onChange={(event) => setCountry(event.detail.value)}
            />
          </FormField>
        </SpaceBetween>
      </Container>
    </Form>
  );
}