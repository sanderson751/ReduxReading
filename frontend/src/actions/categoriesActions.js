import axios from 'axios';
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';

export const getAllCategories = (categories) => ({
  type: GET_ALL_CATEGORIES,
  categories
});

export const fetchCategories = () => {
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return (dispatch) => {
    // Returns a promise
    return axios.get(`http://localhost:3001/categories`, {headers: { 'Authorization': 'ABC1234'}})
      .then(response => {
        // Dispatch another action
        // to consume data
        dispatch(getAllCategories(response.data.categories))
      })
      .catch(error => {
        throw(error);
      });
  };
};