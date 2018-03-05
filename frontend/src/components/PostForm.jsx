import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {Paper, IconButton, FontIcon, AppBar} from 'material-ui';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { fetchPost, editPost, addPost } from '../actions/postsActions';
import { fetchCategories } from '../actions/categoriesActions'
import PostFormBodyComponents from './PostFormBodyComponents';

class PostForm extends Component {
    
    componentDidMount () {
        const {location, getCategories, getPostById} = this.props;
        getCategories && getCategories();
        getPostById && getPostById(location.state.postId ? location.state.postId : '');
        
        if (location.state.category) {
            this._category = location.state.category;
        }
    }

    handleFormBodyChange = (postData) => {
        const {post, editPost, addPost, history} = this.props;
        if (post.id) {
            editPost(Object.assign(post, postData));
        } else {
            addPost(Object.assign(postData, {id: uuid(), timestamp: new Date().getTime()}));
        }
        history.goBack();
    }
    
    getDate (timestamp) {
        let date = new Date(timestamp);
        return date.toLocaleString("pt-BR");
    }

    render () {
        const {post, categories, history, location} = this.props;
        return (
            <div>
                <AppBar
                    title={post && post.title ? `Redux-Reading - ${post.title}` : 'Redux-Reading - New post'}
                    iconElementLeft={<IconButton><FontIcon className="material-icons">arrow_back</FontIcon></IconButton>}
                    onLeftIconButtonClick={() => {history.goBack()}}
                />
                <div className="container">
                    <Paper zDepth={1} style={{margin: '10px'}}>
                        <PostFormBodyComponents key={`${post.id}_${location.state.postId}`} category={this._category} categories={categories} post={post} onChange={this.handleFormBodyChange}/>
                    </Paper>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({ getPost, getAllCategories }) {
    return {
        post: getPost,
        categories: getAllCategories
    }
}
  
function mapDispatchToProps (dispatch) {
    return {
        getPostById: (data) => dispatch(fetchPost(data)),
        editPost: (data) => dispatch(editPost(data)),
        addPost: (data) => dispatch(addPost(data)),
        getCategories: () => dispatch(fetchCategories())
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostForm));