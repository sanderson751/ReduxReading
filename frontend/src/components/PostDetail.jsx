import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Paper, TextField, IconButton, FontIcon, AppBar, List, ListItem, Subheader, MenuItem, DropDownMenu, Divider} from 'material-ui';
import CommentList from './CommentList';

class PostDetail extends Component {
    
    static propTypes = {
        onClickPost: PropTypes.func,
        category: PropTypes.object
    }

    state = {
        post: {
            id: '',
            timestamp: '',
            title: '',
            body: '',
            author: '',
            category: '',
            voteScore: 1,
            deleted: false,
            commentCount: 0
        }
    }

    componentDidMount () {
        const {match} = this.props;
        this.props.getPost(match.params.id);
    }

    handleClick = (post, a) => {
        const {onClickPost} = this.props;
        if (onClickPost) {
            onClickPost.call(this, post);
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
        const {post} = this.state;
        return (
            <div>
                <AppBar
                    title={post.title ? `Redux-Reading - ${post.title}` : 'Redux-Reading - New post'}
                    iconElementLeft={<IconButton><FontIcon className="material-icons">arrow_back</FontIcon></IconButton>}
                    onLeftIconButtonClick={() => {this.props.history.goBack()}}
                />
                <div className="container">
                    <Paper zDepth={1} style={{margin: '10px'}}>
                        <div style={{padding : '10px'}}>
                            <TextField
                                hintText="Title"
                                floatingLabelText="Title"
                                fullWidth />
                            <TextField
                                hintText="Author"
                                floatingLabelText="Author"
                                fullWidth />
                            <TextField
                                hintText="Body"
                                floatingLabelText="Body"
                                fullWidth />
                            <TextField
                                hintText="Create at"
                                floatingLabelText="Create at"
                                defaultValue={new Date().toLocaleString("en-US")}
                                disabled
                                fullWidth />
                            <TextField
                                hintText="Vote Score"
                                floatingLabelText="Vote Score"
                                value={post.voteScore}
                                disabled
                                fullWidth />
                        </div>
                    </Paper>
                    <CommentList post={post} />
                </div>
            </div>
        )
    }

}

export default PostDetail;