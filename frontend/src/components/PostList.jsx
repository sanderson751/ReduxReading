import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {List, ListItem, Subheader, Paper, DropDownMenu, FlatButton, MenuItem, Divider, IconButton, FontIcon, Avatar} from 'material-ui';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts, votePost, updateSortOrder } from '../actions/postsActions';
import {blue500, red500, gray200} from 'material-ui/styles/colors';
import sortBy from 'sort-by';

class PostList extends Component {
    
    static propTypes = {
        onClickPost: PropTypes.func,
        category: PropTypes.string
    }

    componentDidMount () {
        const {category, getPosts} = this.props;
        getPosts && getPosts(category);
    }

    handlePostItemClick = (post) => {
        const {history} = this.props;
        history && history.push('/post/detail', {postId: post.id});
    }

    handleNewPostClick = (category) => {
        const {history} = this.props;
        history && history.push(`/post/form/new`, {category});
    }

    handleChangeDropDownMenu = (event, index, sortOrder) => {
        const {updateSortOrder} = this.props;
        updateSortOrder && updateSortOrder(sortOrder);
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
        return date.toLocaleString("en-US");
    }

    render () {
        const {postList, category, sortOrder} = this.props;
        return (
            <Paper zDepth={1} style={{margin: '10px'}}>
                <List>
                    <Subheader>
                        <div style={{display:'flex', alignItems: 'baseline'}}>
                            <div style={{display:'flex', flexGrow: '1'}}>
                                Posts 
                            </div>
                            <div style={{display:'flex'}}>
                                <DropDownMenu value={sortOrder} onChange={this.handleChangeDropDownMenu}>
                                    <MenuItem value={1} primaryText="Vote Score" />
                                    <MenuItem value={2} primaryText="Date" />
                                </DropDownMenu>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                <FlatButton label="add Post" primary={true} onClick={this.handleNewPostClick.bind(this, category)} />
                            </div>
                        </div>
                    </Subheader>
                    {postList.posts.map((post, index) => (
                        <div key={post.id}>
                            <Divider />
                            <ListItem onClick={this.handlePostItemClick.bind(this, post)}>
                                <div style={{display:'flex', alignItems: 'baseline'}}>
                                    <div style={{display:'flex', flexDirection:'column'}}>
                                        <div style={{display:'flex', padding: '4px'}}>
                                            {post.title}
                                        </div>
                                        <div style={{display:'flex', padding: '4px'}}>
                                            {post.category}
                                        </div>
                                    </div>
                                    <div style={{display:'flex', flexGrow: '1', justifyContent: 'flex-end'}}>
                                        {this.getDate(post.timestamp)}
                                    </div>
                                </div>
                                <div style={{display:'flex', justifyContent: 'flex-end'}}>
                                    <div style={{display:'flex', flexGrow: '1', alignItems: 'center'}}>
                                        <Avatar backgroundColor={gray200} size={25}>
                                            {post.voteScore}
                                        </Avatar>
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
                                    <div style={{display:'flex', alignItems: 'center', flexDirection: 'column-reverse'}}>
                                        <Avatar backgroundColor={gray200} size={25}>
                                            {post.commentCount}
                                        </Avatar>
                                        Comments
                                    </div>
                                </div>
                            </ListItem>
                        </div>
                    ))}
                </List>
            </Paper>
        )
    }
}

function mapStateToProps ({ getPosts, getSortOrder }) {
    getPosts.posts = getPosts.posts.sort(getSortOrder.sortOrder === 1 ? sortBy('-voteScore') : sortBy('-timestamp'));
    return {
      postList: getPosts,
      sortOrder: getSortOrder.sortOrder
    }
}
  
function mapDispatchToProps (dispatch) {
    return {
        getPosts: (data) => dispatch(fetchPosts(data)),
        votePost: (data) => dispatch(votePost(data)),
        updateSortOrder: (data) => dispatch(updateSortOrder(data))
    }
}
  
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList))