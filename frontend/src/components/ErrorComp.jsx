import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Paper} from 'material-ui';

class ErrorComp extends Component {

    static propTypes = {
        message: PropTypes.string
    }

    render () {
        const {message} = this.props;
        return (
            <Paper zDepth={1} style={{margin: '10px'}}>
                <div style={{display: 'flex', flexDirection: 'column', padding: '10px'}}>
                    <div style={{display: 'flex', padding: '10px'}}>
                        {message}
                    </div>
                </div>
            </Paper>
        )
    }
}
export default ErrorComp;