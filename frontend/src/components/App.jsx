import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost, removeFromPost } from '../actions/actions'
import { fetchCategories } from '../actions/categoriesActions'
import CategoryList from './CategoryList';
import PostList from './PostList';
import {AppBar} from 'material-ui';
import {Route, withRouter, Switch} from 'react-router-dom';
import CategoryView from './CategoryView';
import PostDetail from './PostDetail';

class App extends Component {
  state = {
    foodModalOpen: false,
    meal: null,
    day: null,
    food: null,
    ingredientsModalOpen: false,
    loadingFood: false,
    categories: [],
    posts: []
  }

  componentDidMount () {
    this.props.requestCategories();
  }
  
  handleClickCategory  = (category) => {
    this.props.history.push(`/category/${category.path}`);
  }

  render() {
    
    return (
      <Switch>
        <Route exact path='/' render={() => (
          <div>
              <AppBar
                title="Redux-Reading"
                showMenuIconButton={false}
              />
              <div className='container'>
                <CategoryList categories={this.props.listCategories.categories} onClickCategory={this.handleClickCategory}/>
                <PostList onClickPost={(a) => {window.console.log(a)}}/>
              </div>
          </div>
        )}/>
        <Route path='/category/:id' component={CategoryView}/>
        <Route path='/post/detail/:id' component={PostDetail}/>
      </Switch>
    )
  }
}

function mapStateToProps ({ post, getAllCategories }) {
  //const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  return {
    postList: post,
    listCategories: getAllCategories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addNewPost: (data) => dispatch(addPost(data)),
    removePost: (data) => dispatch(removeFromPost(data)),
    requestCategories: () => dispatch(fetchCategories()),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))