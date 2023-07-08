import {
  Form,
  FormField,
  Input,
  Container,
  Header,
  SpaceBetween,
  Button,
} from '@cloudscape-design/components';
import { useEffect, useState } from 'react';
import { createAuthor, getAuthor, updateAuthor } from './AuthorsService';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function AuthorDetails(props) {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [country, setCountry] = useState();
  const history = useNavigate();
  const { authorId } = useParams();

  console.log('authorId: ', authorId);

  function handleCancel() {
    history('/authors');
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!name) {
      alert('Please provide a name for this author');
      return;
    }
    if (!country) {
      alert('Please provide a country for this author');
      return;
    }

    if (authorId) {
      updateAuthor({ id, name, country }).then((json) => {
        console.log('Author updated successfully');
        console.log(json);
        props.setShowNotifications([
          {
            type: 'success',
            content: 'Resource updated successfully',
            dismissible: true,
            onDismiss: () => props.setShowNotifications([]),
          },
        ]);
        history('/authors');
      });
    } else {
      createAuthor({ name, country }).then((json) => {
        console.log('Author created successfully');
        console.log(json);
        props.setShowNotifications([
          {
            type: 'success',
            content: 'Resource created successfully',
            dismissible: true,
            onDismiss: () => props.setShowNotifications([]),
          },
        ]);
        history('/authors');
      });
    }
  }

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
        <Header variant="h1" description="Author details">
          {authorId ? 'Edit Author' : 'Create Author'}
        </Header>
      }
    >
      <Container header={<Header variant="h2">Author</Header>}>
        <SpaceBetween direction="vertical" size="l">
          <FormField label="Author Id" description="Author Id">
            <Input
              value={id}
              disabled={true}
              onChange={(event) => setId(event.detail.value)}
            />
          </FormField>
          <FormField label="Name" description="Name">
            <Input
              value={name}
              onChange={(event) => setName(event.detail.value)}
            />
          </FormField>
          <FormField label="Country" description="Country">
            <Input
              value={country}
              onChange={(event) => setCountry(event.detail.value)}
            />
          </FormField>
        </SpaceBetween>
      </Container>
    </Form>
  );
}
