import axios from 'axios';
export const GET_COMMENTS = 'GET_COMMENTS';

export const getComments = (comments) => ({
  type: GET_COMMENTS,
  comments
});

export const fetchComments = (postId) => {
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return (dispatch) => {
    // Returns a promise
    
    return axios.get(`http://localhost:3001/posts/${postId}/comments`, {headers: { 'Authorization': 'ABC1234'}})
      .then(response => {
        // Dispatch another action
        // to consume data
        dispatch(getComments(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};