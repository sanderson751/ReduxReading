export const ADD_POST = 'ADD_POST';
export const REMOVE_FROM_POST = 'REMOVE_FROM_POST';

export function addPost ({ id, timestamp, title, body, author, category }) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category
  }
}

export function removeFromPost ({ id }) {
  return {
    type: REMOVE_FROM_POST,
    id
  }
}