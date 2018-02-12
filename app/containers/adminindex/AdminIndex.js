/**
 * Created by vijay on 2018/2/12.
 */
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {actions} from '../../reducers/index';
import {bindActionCreators} from 'redux';
import React, {Component, PropTypes} from 'react';

const {user_auth} = actions;
class AdminIndex extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div>
                <h1>Welcome to the blog</h1>
            </div>
        );
    }
}

AdminIndex.defaultProps = {
    isAdmin: false
};

function mapStateToProps(state) {
    return {
        isAdmin: state.globalState.userInfo.userType === 'admin',
        userInfo: state.globalState.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        user_auth: bindActionCreators(user_auth, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminIndex);


