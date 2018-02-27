/**
 * Created by vijay on 2018/2/24.
 */
import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {bindActionCreators} from 'redux';
import remark from 'remark';
import {connect} from 'react-redux';
import style from './style.css';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const {articleContent, title, author, viewCount, commentCount, time} = this.props;
        return (
            <div className={style.container}>
                <h2>{title}</h2>
                <div className={style.articleInfo}>

                </div>
            </div>
        );
    }

}