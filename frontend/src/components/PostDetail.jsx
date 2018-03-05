import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {Paper, IconButton, FlatButton, FontIcon, AppBar} from 'material-ui';
import CommentList from './CommentList';
import { connect } from 'react-redux';
import { fetchPost, deletePost} from '../actions/postsActions';
import { fetchCategories } from '../actions/categoriesActions'
import PostFormBodyComponents from './PostFormBodyComponents';

class PostDetail extends Component {

    componentDidMount () {
        const {location, getCategories, getPostById} = this.props;
        getCategories && getCategories();
        getPostById && getPostById(location.state.postId);
    }

    handleClickEdit = () => {
        const {post, history} = this.props;
        history.push('/post/form', {postId: post.id});
    }

    handleClickDelete = () => {
        const {post, deletePost, history} = this.props;
        let isDeleted = deletePost(post);
        if (isDeleted) {
            history.goBack();
        }
    }

    handleChangeDropDownMenu = (event, index, sortOrder) => {
        this.setState({
            sortOrder
        });
    }

    getDate (timestamp) {
        let date = new Date(timestamp);
        return date.toLocaleString("pt-BR");
    }

    render () {
        let {post, commentsList, categories, history} = this.props;
        return (
            <div>
                <AppBar
                    title={post && post.title ? `Redux-Reading - ${post.title}` : 'Redux-Reading'}
                    iconElementLeft={<IconButton><FontIcon className="material-icons">arrow_back</FontIcon></IconButton>}
                    onLeftIconButtonClick={() => {history.goBack()}}
                />
                <div className="container">
                    <Paper zDepth={1} style={{margin: '10px'}}>
                        <div style={{display: 'flex', flexDirection: 'column', padding: '10px'}}>
                            <PostFormBodyComponents post={post} categories={categories} disabled/>
                            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                <FlatButton label="Edit" onClick={this.handleClickEdit} />
                                <FlatButton label="Delete" secondary={true} onClick={this.handleClickDelete} />
                            </div>
                        </div>
                    </Paper>
                    <CommentList commentsList={commentsList} parentId={post.id} />
                </div>
            </div>
        )
    }
}

function mapStateToProps ({ getPost, getComments, getAllCategories }) {
    return {
      post: getPost,
      commentsList: getComments,
      categories: getAllCategories
    }
}
  
function mapDispatchToProps (dispatch) {
    return {
        getPostById: (data) => dispatch(fetchPost(data)),
        deletePost: (data) => dispatch(deletePost(data)),
        getCategories: () => dispatch(fetchCategories())
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetail));