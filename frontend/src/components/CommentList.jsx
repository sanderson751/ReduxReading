import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {List, ListItem, Subheader, Paper, DropDownMenu, FlatButton, MenuItem, Divider, Dialog, IconButton, FontIcon, Avatar} from 'material-ui';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchComments, addComment, editComment, deleteComment, voteComment, updateSortOrder } from '../actions/commentsActions';
import CommentForm from './CommentForm';
import {blue500, red500, gray200} from 'material-ui/styles/colors';
import uuid from 'uuid';
import sortBy from 'sort-by';

class CommentList extends Component {
    
    static propTypes = {
        parentId: PropTypes.string
    }

    state = {
        commentModalOpen: false,
        comment: {}
    }

    componentDidMount () {
        this.props.getComments(this.props.parentId);
    }

    handleClick = (comment, viewComment) => {
        this.openCommentModal(comment, viewComment);
    }

    handleChangeDropDownMenu = (event, index, sortOrder) => {
        this.props.updateSortOrder(sortOrder);
    }

    getDate (timestamp) {
        let date = new Date(timestamp);
        return date.toLocaleString("en-US");
    }

    handleSaveCommentClick = () => {
        const {comment} = this.state;
        const {parentId} = this.props;
        if (comment.id) {
            this.props.editComment(comment);
        } else {
            this.props.addComment(Object.assign(comment, {id: uuid(), parentId: parentId, timestamp: new Date().getTime()}));
        }
        this.closeCommentModal();
        this.props.getComments(parentId);
    }

    handleCommentChange = (comment) => {
        this.setState({
            comment
        })
    }

    openCommentModal = (comment, viewComment) => {
        this.setState({
            commentModalOpen: true,
            comment,
            viewComment
        });
    }

    closeCommentModal = () => {
        this.setState({
            commentModalOpen: false,
            viewComment: false
        });
    }

    getActionsCommentModal = (viewComment) => {
        return [
            <FlatButton
              label="Cancel"
              onClick={this.closeCommentModal}
            />,
            <FlatButton
              label="Save"
              disabled={viewComment}
              primary={true}
              onClick={this.handleSaveCommentClick}
            />
          ];
    }

    handleVoteUp (comment, event) {
        event.stopPropagation();
        this.props.voteComment(Object.assign(comment, {option: 'upVote'}));
    }

    handleVoteDown (comment, event) {
        event.stopPropagation();
        this.props.voteComment(Object.assign(comment, {option: 'downVote'}));
    }

    handleDeleteComment (comment, event) {
        event.stopPropagation();
        this.props.deleteComment(comment);
    }

    handleEditComment (comment, viewComment, event) {
        event.stopPropagation();
        this.openCommentModal(comment, viewComment);
    }

    render () {
        const {commentModalOpen, comment, viewComment} = this.state;
        const {commentsList, sortOrder} = this.props;
        return (
            <Paper zDepth={1} style={{margin: '10px'}}>
                <List>
                    <Subheader>
                        <div style={{display:'flex', alignItems: 'baseline'}}>
                            <div style={{display:'flex', flexGrow: '1'}}>
                                Comments
                            </div>
                            <div style={{display:'flex'}}>
                                <DropDownMenu value={sortOrder} onChange={this.handleChangeDropDownMenu}>
                                    <MenuItem value={1} primaryText="Vote Score" />
                                    <MenuItem value={2} primaryText="Date" />
                                </DropDownMenu>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                <FlatButton label="add new comment" primary={true} onClick={this.handleClick.bind(this, undefined, false)} />
                            </div>
                        </div>
                    </Subheader>
                    {commentsList.comments.map((comment, index) => (
                        <div key={`${comment.id}_${comment.voteScore}`}>
                            <Divider />
                            <ListItem onClick={this.handleClick.bind(this, comment, true)}>
                                <div style={{display:'flex', alignItems: 'baseline'}}>
                                    <div style={{display:'flex', flexDirection:'column'}}>
                                        <div style={{display:'flex', padding: '4px'}}>
                                            {comment.body}
                                        </div>
                                        <div style={{display:'flex', padding: '4px'}}>
                                            {comment.author}
                                        </div>
                                    </div>
                                    <div style={{display:'flex', flexGrow: '1', justifyContent: 'flex-end'}}>
                                        {this.getDate(comment.timestamp)}
                                    </div>
                                </div>
                                <div style={{display:'flex', justifyContent: 'flex-end'}}>
                                    <div style={{display:'flex', flexGrow: '1', alignItems: 'center'}}>
                                        <Avatar backgroundColor={gray200} size={25}>
                                            {comment.voteScore}
                                        </Avatar>
                                        <IconButton
                                            tooltip="Vote up"
                                            onClick={this.handleVoteUp.bind(this, comment)}>
                                            <FontIcon className="material-icons" color={blue500}>
                                                thumb_up
                                            </FontIcon>
                                        </IconButton>   
                                        <IconButton
                                            tooltip="Vote down"
                                            onClick={this.handleVoteDown.bind(this, comment)}>
                                            <FontIcon className="material-icons" color={red500}>
                                                thumb_down
                                            </FontIcon>
                                        </IconButton>
                                    </div>
                                    <div style={{display:'flex'}}>
                                        <IconButton
                                            iconClassName="material-icons"
                                            tooltip="Edit"
                                            onClick={this.handleEditComment.bind(this, comment, false)}>
                                                edit
                                        </IconButton>   
                                        <IconButton
                                            tooltip="Delete"
                                            onClick={this.handleDeleteComment.bind(this, comment)}>
                                            <FontIcon className="material-icons" color={red500}>
                                                delete
                                            </FontIcon>
                                        </IconButton>
                                    </div>
                                </div>
                            </ListItem>
                        </div>
                    ))}
                </List>
                {commentModalOpen && 
                    <Dialog
                        title="Edit Comment"
                        actions={this.getActionsCommentModal(viewComment)}
                        modal={true}
                        open={commentModalOpen}>
                            <CommentForm comment={comment} disabled={viewComment} onChange={this.handleCommentChange}/>
                    </Dialog>
                }
            </Paper>
        )
    }
}

function mapStateToProps ({ getComments, getSortOrder }) {
    getComments.comments = getComments.comments.sort(getSortOrder.sortOrder === 1 ? sortBy('-voteScore') : sortBy('-timestamp'));
    return {
      commentsList: getComments,
      sortOrder: getSortOrder.sortOrder
    }
}
  
function mapDispatchToProps (dispatch) {
    return {
        getComments: (data) => dispatch(fetchComments(data)),
        addComment: (data) => dispatch(addComment(data)),
        editComment: (data) => dispatch(editComment(data)),
        deleteComment: (data) => dispatch(deleteComment(data)),
        voteComment: (data) => dispatch(voteComment(data)),
        updateSortOrder: (data) => dispatch(updateSortOrder(data))
    }
}
  
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentList))