import {combineReducers} from 'redux'

import {GET_ALL_CATEGORIES} from '../actions/categoriesActions';
import {GET_POSTS, GET_POST} from '../actions/postsActions';
import {GET_COMMENTS, UPDATE_COMMENT, UPDATE_SORT_ORDER} from '../actions/commentsActions';

const initialPostState = {
  timestamp: '',
  title: '',
  body: '',
  author: '',
  category: '',
  voteScore: 1,
  deleted: false,
  commentCount: 0
}

const initialPostsState = {posts: []}
const initialCategoriesState = {categories: []}
const initialCommentsState = {comments: []}
const initialCommentState = {}
const initialSortOrderState = {sortOrder: 1};


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

function getPost (state = initialPostState, action) {
  const {post} = action
  switch (action.type) {
    case GET_POST :
      return {
        ...state[post] = post,
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

function updateComment (state = initialCommentState, action) {
  const {comment} = action
  switch (action.type) {
    case UPDATE_COMMENT :
      return {
        ...state[comment] = comment,
      }
    default :
      return state
  }
}

function getSortOrder (state = initialSortOrderState, action) {
    const { order } = action
  
    switch (action.type) {
      case UPDATE_SORT_ORDER :
        return {
          ...state,
          sortOrder: order,
        }
      default :
        return state
    }
  }

export default combineReducers({
  getAllCategories,
  getPosts,
  getPost,
  getComments,
  updateComment,
  getSortOrder
})