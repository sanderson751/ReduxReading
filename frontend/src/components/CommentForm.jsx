import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Paper, TextField} from 'material-ui';

class CommentForm extends Component {
  
    static propTypes = {
        comment: PropTypes.object,
        onChange: PropTypes.func,
        disabled: PropTypes.bool
    }

    state = {
        comment: {
            timestamp: '',
            body: '',
            author: '',
            parentId: '',
            voteScore: 1,
            deleted: false,
            parentDeleted: false
        }
    }

    constructor () {
        super();
        this.onChangeAuthor = this.handleChange.bind(this, 'author');
        this.onChangeBody = this.handleChange.bind(this, 'body');
    }

    componentDidMount () {
        const {comment} = this.props;
        if (comment) {
            this.updateComment(Object.assign({}, comment));
        }
    }

    updateComment = (comment) => {
        this.setState({
            comment
        });
    }

    getDate (timestamp) {
        if (timestamp) {
            const date = new Date(timestamp);
            return date.toLocaleString("pt-BR");
        }
        return '';
    }

    handleChange (field, event, value) {
        const {comment} = this.state;
        const objectVal = {[field]: value};
        this.setState({
            comment: Object.assign(comment, objectVal)
        }, this.callChange);
    }

    callChange () {
        const {onChange} = this.props;
        if (onChange) {
            onChange.call(this, this.state.comment);
        }
    }

    render () {
        const {comment} = this.state;
        const {disabled} = this.props;
        return (
            <Paper zDepth={1} style={{margin: '10px'}}>
                <div style={{display: 'flex', flexDirection: 'column', padding: '10px'}}>
                    <TextField
                        floatingLabelText="Author"
                        value={comment.author}
                        disabled={disabled}
                        onChange={this.onChangeAuthor}
                        fullWidth />
                    <TextField
                        floatingLabelText="Body"
                        value={comment.body}
                        disabled={disabled}
                        onChange={this.onChangeBody}
                        fullWidth />
                    <TextField
                        floatingLabelText="Create at"
                        disabled={true}
                        value={this.getDate(comment.timestamp)}
                        fullWidth />
                    <TextField
                        floatingLabelText="Vote Score"
                        disabled={true}
                        value={comment.voteScore}
                        fullWidth />
                </div>
            </Paper>
        )
    }
}
export default CommentForm;