const baseUrl = 'https://alantursystems.com/mock-rest-svc/authors';

export async function getAuthors() {
  const response = await fetch(baseUrl);
  const authors = await response.json();
  return authors;
}

export function deleteAuthor(id) {
  return fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
}
