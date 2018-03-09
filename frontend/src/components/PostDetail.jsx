import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {Paper, IconButton, FlatButton, FontIcon, AppBar} from 'material-ui';
import CommentList from './CommentList';
import { connect } from 'react-redux';
import { fetchPost, deletePost, votePost} from '../actions/postsActions';
import { fetchCategories } from '../actions/categoriesActions'
import PostFormBodyComponents from './PostFormBodyComponents';
import {blue500, red500} from 'material-ui/styles/colors';
import ErrorComp from './ErrorComp';

class PostDetail extends Component {

    state = {
        error: false
    }

    componentDidMount () {
        const {match, getCategories, getPostById} = this.props;
        getCategories && getCategories();
        getPostById && getPostById(match.params.post_id).then(({id}) => {
            if (!id) {
                this.updateStateError(true);
            }
        });
    }

    updateStateError = (value) => {
        this.setState({
            error : value
        });
    }

    handleClickEdit = () => {
        const {post, history} = this.props;
        history.push(`/post/form/${post.id}`);
    }

    handleClickDelete = () => {
        const {post, deletePost, history} = this.props;
        let isDeleted = deletePost([post]);
        if (isDeleted) {
            history.goBack();
        }
    }

    handleChangeDropDownMenu = (event, index, sortOrder) => {
        this.setState({
            sortOrder
        });
    }

    handleVoteUp (post, event) {
        event.stopPropagation();
        const {votePost, category} = this.props;
        votePost && votePost([Object.assign(post, {option: 'upVote'}), category]);
    }

    handleVoteDown (post, event) {
        event.stopPropagation();
        const {votePost, category} = this.props;
        votePost && votePost([Object.assign(post, {option: 'downVote'}), category]);
    }

    getDate (timestamp) {
        let date = new Date(timestamp);
        return date.toLocaleString("pt-BR");
    }

    render () {
        let {post, commentsList, categories, history} = this.props;
        const {error} = this.state;
        return (
            <div>
                <AppBar
                    title={post && post.title ? `Redux-Reading - ${post.title}` : 'Redux-Reading'}
                    iconElementLeft={<IconButton><FontIcon className="material-icons">arrow_back</FontIcon></IconButton>}
                    onLeftIconButtonClick={() => {history.goBack()}}
                />
                {!error ? <div className="container">
                    <Paper zDepth={1} style={{margin: '10px'}}>
                        <div style={{display: 'flex', flexDirection: 'column', padding: '10px'}}>
                            <PostFormBodyComponents post={post} categories={categories} disabled/>
                            <div style={{display:'flex', flexGrow: '1', alignItems: 'center'}}>
                                <IconButton
                                    tooltip="Vote up"
                                    onClick={this.handleVoteUp.bind(this, post)}>
                                    <FontIcon className="material-icons" color={blue500}>
                                        thumb_up
                                    </FontIcon>
                                </IconButton>   
                                <IconButton
                                    tooltip="Vote down"
                                    onClick={this.handleVoteDown.bind(this, post)}>
                                    <FontIcon className="material-icons" color={red500}>
                                        thumb_down
                                    </FontIcon>
                                </IconButton>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                <FlatButton label="Edit" onClick={this.handleClickEdit} />
                                <FlatButton label="Delete" secondary={true} onClick={this.handleClickDelete} />
                            </div>
                        </div>
                    </Paper>
                    <CommentList commentsList={commentsList} parentId={post.id} />
                </div>
                :
                    <ErrorComp message="The post it does not exist anymore"/>
                }
                
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
        getCategories: () => dispatch(fetchCategories()),
        votePost: (data) => dispatch(votePost(data)),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetail));