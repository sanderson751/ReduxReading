import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {List, ListItem, Subheader, Paper, DropDownMenu, FlatButton, MenuItem, Divider} from 'material-ui';
import {Route, withRouter, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postsActions';

class PostList extends Component {
    
    static propTypes = {
        onClickPost: PropTypes.func,
        category: PropTypes.string
    }

    state = {
        sortOrder: 1
    }

    componentDidMount () {
        const {match} = this.props;
        this.props.getPosts(match.params.id);
    }

    handleClick = (post) => {
        // const {onClickPost} = this.props;
        // if (onClickPost) {
        //     onClickPost.call(this, post);
        // }
        this.props.history.push(`/post/detail/${post.id}`);
    }

    handleChangeDropDownMenu = (event, index, sortOrder) => {
        this.setState({
            sortOrder
        });
    }

    getDate (timestamp) {
        let date = new Date(timestamp);
        return date.toLocaleString("en-US");
    }

    render () {
        const {sortOrder} = this.state;
        const {postList} = this.props;
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
                                <FlatButton label="add Post" primary={true} />
                            </div>
                        </div>
                    </Subheader>
                    {postList.posts.map((post, index) => (
                        <div key={post.id}>
                            <Divider />
                            <ListItem primaryText={post.title} onClick={this.handleClick.bind(this, post)}>
                                <div style={{display:'flex', alignItems: 'baseline', padding: '4px 0px 4px 0px'}}>
                                    <div style={{display:'flex'}}>
                                        {post.category}
                                    </div>
                                    <div style={{display:'flex', flexGrow: '1', justifyContent: 'flex-end'}}>
                                        {this.getDate(post.timestamp)}
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

function mapStateToProps ({ getPosts }) {
    return {
      postList: getPosts
    }
}
  
function mapDispatchToProps (dispatch) {
    return {
        getPosts: (data) => dispatch(fetchPosts(data)),
    }
}
  
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList))