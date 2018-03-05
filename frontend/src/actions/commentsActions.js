import axios from 'axios';
export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_COMMENT = 'GET_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const UPDATE_SORT_ORDER = 'UPDATE_SORT_ORDER';

export const getComments = (comments) => ({
  type: GET_COMMENTS,
  comments
});

export const updateComment= (comment) => ({
  type: UPDATE_COMMENT,
  comment
});

export const getComment = (comment) => ({
  type: GET_COMMENT,
  comment
});

export const fetchComments = (postId) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/posts/${postId}/comments`, {headers: { 'Authorization': 'ABC1234'}})
      .then(response => {
        dispatch(getComments(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const editComment = (comment) => {
  return (dispatch) => {
    return axios.put(`http://localhost:3001/comments/${comment.id}`, comment, {headers: { 'Authorization': 'ABC1234'}})
      .then(response => {
        dispatch(fetchComments(comment.parentId));
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const addComment = (comment) => {
  return (dispatch) => {
    return axios.post(`http://localhost:3001/comments`, comment, {headers: { 'Authorization': 'ABC1234'}})
      .then(response => {
        dispatch(fetchComments(comment.parentId));
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const deleteComment = (comment) => {
  return (dispatch) => {
    return axios.delete(`http://localhost:3001/comments/${comment.id}`, {headers: { 'Authorization': 'ABC1234'}})
      .then(response => {
        dispatch(fetchComments(comment.parentId));
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const voteComment = (comment) => {
  return (dispatch) => {
    return axios.post(`http://localhost:3001/comments/${comment.id}`, comment, {headers: { 'Authorization': 'ABC1234'}})
      .then(response => {
        dispatch(fetchComments(response.data.parentId));
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function updateSortOrder (order) {
  return {
    type: UPDATE_SORT_ORDER,
    order
  }
}