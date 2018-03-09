import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions/categoriesActions'
import CategoryList from './CategoryList';
import PostList from './PostList';
import {AppBar} from 'material-ui';
import {Route, withRouter, Switch} from 'react-router-dom';
import CategoryView from './CategoryView';
import PostDetail from './PostDetail';
import PostForm from './PostForm';

class App extends Component {

  componentDidMount () {
    const {requestCategories} = this.props;
    requestCategories && requestCategories();
  }
  
  handleClickCategory  = (category) => {
    const {history} = this.props;
    history && history.push(`/${category.path}`);
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
                <PostList />
              </div>
          </div>
        )}/>
        <Route exact path='/:category' component={CategoryView} />
        <Route exact path='/:category/:post_id' component={PostDetail} />
        <Route exact path='/post/form/:post_id' component={PostForm} />
        <Route exact path='/post/new/:category' component={PostForm} />
      </Switch>
    )
  }
}

function mapStateToProps ({ post, getAllCategories }) {
  return {
    postList: post,
    listCategories: getAllCategories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    requestCategories: () => dispatch(fetchCategories())
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))