import axios from 'axios';
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';

export const getAllCategories = (categories) => ({
  type: GET_ALL_CATEGORIES,
  categories
});

export const fetchCategories = () => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/categories`, {headers: { 'Authorization': 'ABC1234'}})
      .then(response => {
        dispatch(getAllCategories(response.data.categories))
      })
      .catch(error => {
        throw(error);
      });
  };
};