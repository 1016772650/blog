/**
 * Created by vijay on 2018/2/13.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import style from './style.css';
import {
    Switch,
    Route
} from 'react-router-dom';
import NotFound from '../../components/notFound/NotFound';
import {bindActionCreators} from 'redux';
// import {actions} from '../../reducers/adminManagerTags';
import {actions as FrontActions} from '../../reducers/frontReducer';
import {actions as IndexActions} from '../../reducers/index';
import Login from '../home/components/login/Login';
import {Logined} from '../home/components/logined/Logined'
import Banner from '../components/banner/Banner';


class Front extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {url}  = this.props.match;
        const {login, register} = this.props;
        console.log("Front.js,this.props.userInfo",this.props.userInfo);
        return (
            <div>
                <div className={style.headContainer}>
                    <Banner/>
                </div>
                <div className={style.container}>
                    <div className={style.contentContainer}>
                        <div className={style.content}>
                            <Switch>
                                {/*<Route component={NotFound} />*/}
                            </Switch>
                        </div>
                        <div className={`${style.loginContainer}`}>
                            {console.log('Front,this.props:', this.props)}
                            {this.props.userInfo.userId ?
                                <Logined history={this.props.history} userInfo={this.props.userInfo} /> :
                                <Login login={login} register={register} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {

    }
}

Front.defaultProps = {
    categories: []
};

Front.propTypes = {
    categories: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        categories: state.admin.tags,
        userInfo: state.globalState.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // get_all_tags: bindActionCreators(get_all_tags, dispatch),
        // get_article_list: bindActionCreators(get_article_list, dispatch),
        login: bindActionCreators(IndexActions.get_login, dispatch),
        register: bindActionCreators(IndexActions.get_register, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Front);




