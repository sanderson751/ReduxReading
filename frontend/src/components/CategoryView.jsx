import React, { Component } from 'react';
import PostList from './PostList';
import {AppBar, IconButton, FontIcon} from 'material-ui';

class CategoryView extends Component {
  
  render() {
    const {match, history} = this.props;
    return (
      <div>
        <AppBar
            title={`Redux-Reading - ${match.params.category}`}
            iconElementLeft={<IconButton><FontIcon className="material-icons">arrow_back</FontIcon></IconButton>}
            onLeftIconButtonClick={() => {history.goBack()}}
        />
        <div className="container">
          <PostList category={match.params.category} />
        </div>
      </div>
    )
  }
}
export default CategoryView;