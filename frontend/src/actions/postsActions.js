import axios from 'axios';
export const GET_POSTS = 'GET_POSTS';

export const getPosts = (posts) => ({
  type: GET_POSTS,
  posts
});

export const fetchPosts = (category) => {
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return (dispatch) => {
    // Returns a promise
    return axios.get(category ? `http://localhost:3001/${category}/posts` : 'http://localhost:3001/posts', {headers: { 'Authorization': 'ABC1234'}})
      .then(response => {
        // Dispatch another action
        // to consume data
        dispatch(getPosts(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};