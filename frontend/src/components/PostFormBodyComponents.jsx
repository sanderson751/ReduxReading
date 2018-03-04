import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {TextField, MenuItem, SelectField, FlatButton} from 'material-ui';

class PostFormBodyComponents extends Component {

    static propTypes = {
        onChange: PropTypes.func,
        post: PropTypes.object,
        disabled: PropTypes.bool,
        category: PropTypes.string,
        categories: PropTypes.object
    }

    state = {
        post: {
            author: '',
            title: '',
            body: '',
            category: '',
            timestamp: '',
            voteScore: 1,
            deleted: false
        }
    }

    constructor () {
        super();
        this.onChangeAuthor = this.handleChange.bind(this, 'author');
        this.onChangeTitle = this.handleChange.bind(this, 'title');
        this.onChangeBody = this.handleChange.bind(this, 'body');
        this.onChangeCategory = this.handleChangeCategory.bind(this, 'category');
    }

    componentDidMount () {
        const {post, category} = this.props;
        if (post && post.id) {
            this.setState({
                post: Object.assign({}, post)
            })            
        } else {
            if (category) {
                this.setState({
                    post: Object.assign(this.state.post, {'category': category})
                })            
            }
        }
    }

    componentWillReceiveProps (nextProps) {
        const {post, category} = nextProps;
        if (post && post.id) {
            this.setState({
                post: Object.assign({}, post)
            })            
        } else {
            if (category) {
                this.setState({
                    post: Object.assign(this.state.post, {'category': category})
                })            
            }
        }
    }

    getDate (timestamp) {
        if (timestamp) {
            let date = new Date(timestamp);
            return date.toLocaleString("pt-BR");
        }
        return '';
    }

    handleChange (field, event, value) {
        this.setState({
            post: Object.assign(this.state.post, {[field]: value})
        });
    }

    handleChangeCategory (field, event, value) {
        const {categories} = this.props;
        this.setState({
            post: Object.assign(this.state.post, {[field]: categories.categories[value].name})
        });
    }

    callChange = () => {
        const {onChange} = this.props;
        if (onChange) {
            onChange.call(this, this.state.post);
        }
    }

    getCategories (post, disabled, categories) {
        return (
            <SelectField
                floatingLabelText="Category"
                value={post && post.category}
                onChange={this.onChangeCategory}
                disabled={disabled}
                >
                {categories.map((category, index)=>{
                    return <MenuItem key={category.name+index} value={category.name} primaryText={category.name} />
                })} 
            </SelectField>
        )
    }

    render () {
        const {disabled, categories} = this.props;
        const {post} = this.state;
        return (
            <div style={{display: 'flex', flexDirection: 'column', padding: '10px'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <TextField
                        floatingLabelText="Title"
                        disabled={disabled}
                        value={post && post.title}
                        onChange={this.onChangeTitle}
                        fullWidth />
                    <TextField
                        floatingLabelText="Author"
                        value={post && post.author}
                        disabled={disabled}
                        onChange={this.onChangeAuthor}
                        fullWidth />
                    <TextField
                        floatingLabelText="Body"
                        disabled={disabled}
                        value={post && post.body}
                        onChange={this.onChangeBody}
                        fullWidth />
                    {categories && this.getCategories(post, disabled, categories.categories)}
                    <TextField
                        floatingLabelText="Create at"
                        disabled={true}
                        value={this.getDate(post && post.timestamp)}
                        fullWidth />
                    <TextField
                        floatingLabelText="Vote Score"
                        disabled={true}
                        value={post && post.voteScore}
                        fullWidth />
                </div>
                {!disabled && <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <FlatButton label="Save" primary onClick={this.callChange.bind(this)} />
                </div>}
            </div>
        )
    }
}

export default PostFormBodyComponents;