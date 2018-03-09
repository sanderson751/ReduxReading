import axios from 'axios';
import {fetchComments} from './commentsActions';

export const GET_POSTS = 'GET_POSTS';
export const GET_POST = 'GET_POST';
export const UPDATE_SORT_ORDER = 'UPDATE_SORT_ORDER';

export const getPosts = (posts) => ({
  type: GET_POSTS,
  posts
});

export const getPost = (post) => ({
  type: GET_POST,
  post
});

export const fetchPosts = (category) => {
  return (dispatch) => {
    return axios.get(category ? `http://localhost:3001/${category}/posts` : 'http://localhost:3001/posts', {headers: { 'Authorization': 'ABC1234'}})
      .then(response => {
        dispatch(getPosts(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const fetchPost = (id) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/posts/${id}`, {headers: { 'Authorization': 'ABC1234'}})
      .then(response => {
        dispatch(getPost(response.data));
        dispatch(fetchComments(response.data.id));
        return response.data;
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const editPost = (post) => {
  return (dispatch) => {
    return axios.put(`http://localhost:3001/posts/${post.id}`, post, {headers: { 'Authorization': 'ABC1234'}})
      .then(response => {
        dispatch(getPost(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const addPost = (post) => {
  return (dispatch) => {
    return axios.post(`http://localhost:3001/posts`, post, {headers: { 'Authorization': 'ABC1234'}})
      .then(response => {
        dispatch(getPost(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const deletePost = (data) => {
  const post = data[0];
  const category = data[1];
  return (dispatch) => {
    return axios.delete(`http://localhost:3001/posts/${post.id}`, {headers: { 'Authorization': 'ABC1234'}})
      .then(response => {
        dispatch(fetchPosts(category))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const votePost = (data) => {
  const post = data[0];
  const category = data[1];
  return (dispatch) => {
    return axios.post(`http://localhost:3001/posts/${post.id}`, post, {headers: { 'Authorization': 'ABC1234'}})
      .then(response => {
        dispatch(fetchPosts(category));
        dispatch(getPost(response.data));
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