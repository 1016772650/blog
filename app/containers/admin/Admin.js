/**
 * Created by vijay on 2018/2/12.
 */
import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import style from './style.css';
import {bindActionCreators} from 'redux';
import {actions} from '../../reducers/admin';
import AdminMenu from "../../components/adminMenu/AdminMenu";
import NotFound from "../../components/notFound/NotFound";
import AdminIndex from "../adminindex/AdminIndex";
import AdminManageUser from "../adminManagerUser/AdminManageUser";
import AdminManageTags from "../adminManagerTags/AdminManagerTags";
import AdminNewArticle from "../adminNewArticle/AdminNewArticle"
import AdminManagerArticle from '../adminManagerArticle/AdminManagerArticle';

const {change_location_admin} = actions;

class Admin extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const {url} = this.props.match;
        if (this.props.userInfo&&this.props.userInfo.userType) {
            // console.log("Admin.js, userInfo:", this.props.userInfo);
            return (
                <div>
                    {
                        this.props.userInfo.userType === 'admin' ?
                            <div className={style.container} >
                                <div className={style.menuContainer}>
                                    <AdminMenu
                                        history={this.props.history}
                                        url = {this.props.adminUrl}
                                        changeUrl = {this.props.change_location_admin}
                                    />
                                </div>
                                <div className={style.contentContainer} >
                                    <Switch>
                                        <Route exact path={url} component={AdminIndex} />
                                        <Route exact path={`${url}/managerUser`} component={AdminManageUser} />
                                        <Route path={`${url}/managerTags`} component={AdminManageTags} />
                                        <Route path={`${url}/newArticle`} component={AdminNewArticle} />
                                        <Route path={`${url}/managerArticle`} component={AdminManagerArticle} />
                                        <Route component={NotFound} />
                                    </Switch>
                                </div>
                            </div> :
                            <Redirect to='/'/>
                    }
                </div>
            );
        } else {
            // console.log("Admin.js,notFound userInfo:", this.props.userInfo);
            return <NotFound />
        }
    }

    componentWillReceiveProps() {
        this.props.change_location_admin(window.location.pathname.replace(/\/admin/, "") || '/');
    }

}

Admin.defaultProps = {
    adminUrl: '/'
};

Admin.propTypes = {
    adminUrl: PropTypes.string,
    change_location_admin: PropTypes.func
};

function mapStateToProps(state) {
    const {url} = state.admin.adminGlobalState;
    return {
        adminUrl: url,
        userInfo: state.globalState.userInfo
    };
}

function mapDispatchToProps(dispatch) {
    return {
        change_location_admin: bindActionCreators(change_location_admin, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Admin);







