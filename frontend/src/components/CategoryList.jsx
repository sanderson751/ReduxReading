import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {List, ListItem, Subheader, Paper, Divider} from 'material-ui';

class CategoryList extends Component {
    
    static propTypes = {
        categories: PropTypes.array,
        onClickCategory: PropTypes.func
    }

    handleClick = (category) => {
        const { onClickCategory } = this.props;
        onClickCategory && onClickCategory.call(this, category);
    }

    render () {
        const {categories} = this.props;
        return (
            <Paper zDepth={1} style={{margin: '10px'}}>
                <List>
                    <Subheader>Categories</Subheader>
                    {categories.map((category, index) => (
                        <div key={`category_${index}`}>
                            <Divider />
                            <ListItem primaryText={category.name} onClick={this.handleClick.bind(this, category)}/>
                        </div>
                    ))}
                </List>
            </Paper>
        )
    }

}

export default CategoryList
