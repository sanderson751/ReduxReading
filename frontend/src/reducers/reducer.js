import {combineReducers} from 'redux'

import {ADD_POST, REMOVE_FROM_POST} from '../actions/actions';

import {GET_ALL_CATEGORIES} from '../actions/categoriesActions';
import {GET_POSTS} from '../actions/postsActions';
import {GET_COMMENTS} from '../actions/commentsActions';

const initialPostState = {}
const initialPostsState = {posts: []}
const initialCategoriesState = {categories: []}
const initialCommentsState = {comments: []}

function getAllCategories (state = initialCategoriesState, action) {
  const {categories} = action
  switch (action.type) {
    case GET_ALL_CATEGORIES :
      return {
        ...state,
        categories
      }
    default :
      return state
  }
}

function getPosts (state = initialPostsState, action) {
  const {posts} = action
  switch (action.type) {
    case GET_POSTS :
      return {
        ...state,
        posts
      }
    default :
      return state
  }
}

function getComments (state = initialCommentsState, action) {
  const {comments} = action
  switch (action.type) {
    case GET_COMMENTS :
      return {
        ...state,
        comments
      }
    default :
      return state
  }
}

function post (state = initialPostState, action) {
//   const { id, timestamp, title, body, author, category } = action

  switch (action.type) {
    case ADD_POST :
      return {
        ...state,
        // [id]: {
        //   ...state[day],
        //   [meal]: recipe.label,
        // }
      }
    case REMOVE_FROM_POST :
      return {
        ...state,
        // [day]: {
        //   ...state[day],
        //   [meal]: null,
        // }
      }
    default :
      return state
  }
}

export default combineReducers({
  getAllCategories,
  getPosts,
  getComments,
  post,
})