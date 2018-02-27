import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost, removeFromPost } from '../actions/actions';
import PostList from './PostList';
import {AppBar, IconButton, FontIcon} from 'material-ui';

class CategoryView extends Component {
  
  // static propTypes = {
  //   category: PropTypes.Object
  // }

  state = {
    category: {},
    posts: []
  }
  
  componentDidMount () {
    window.console.log('carregar posts filtrado pela categoria na prop');
    window.console.log(this.props.match.params.id);
  }

  render() {
  
    return (
      <div>
        <AppBar
            title={`Redux-Reading - ${this.props.match.params.id}`}
            iconElementLeft={<IconButton><FontIcon className="material-icons">arrow_back</FontIcon></IconButton>}
            onLeftIconButtonClick={() => {this.props.history.goBack()}}
        />
        <div className="container">
          <PostList category={this.props.match.params.id} onClickPost={(a) => {window.console.log(a)}}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ post }) {
  //const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  return {
    postList: post,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addNewPost: (data) => dispatch(addPost(data)),
    removePost: (data) => dispatch(removeFromPost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryView)