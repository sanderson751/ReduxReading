import React, { Component } from 'react';
import PostList from './PostList';
import {AppBar, IconButton, FontIcon} from 'material-ui';

class CategoryView extends Component {
  
  render() {
    const {location, history} = this.props;
    return (
      <div>
        <AppBar
            title={`Redux-Reading - ${location.state.category}`}
            iconElementLeft={<IconButton><FontIcon className="material-icons">arrow_back</FontIcon></IconButton>}
            onLeftIconButtonClick={() => {history.goBack()}}
        />
        <div className="container">
          <PostList category={location.state.category} />
        </div>
      </div>
    )
  }
}
export default CategoryView;