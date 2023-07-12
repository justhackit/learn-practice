const baseUrl = 'https://alantursystems.com/mock-rest-svc/authors';

export async function getAuthors() {
  const response = await fetch(baseUrl);
  const authors = await response.json();
  return authors;
}

export async function deleteAuthor(id) {
  return fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
}

export async function createAuthor(author) {
  return fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(author),
  }).then((res) => res.json());
}

export async function getAuthor(id) {
  return fetch(`${baseUrl}/${id}`).then((res) => res.json());
}

export async function updateAuthor(author) {
  return fetch(`${baseUrl}/${author.id}`, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(author),
  }).then((res) => res.json());
}
