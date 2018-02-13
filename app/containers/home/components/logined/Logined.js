/**
 * Created by vijay on 2018/2/13.
 */
import React from 'react';
import style from './style.css';
import {Button, Icon} from 'antd';
import axios from 'axios';

export const Logined = (props) => (
    <div className={style.container}>
        <img src={require('./timg.jpeg')} />
        <p>欢迎：{props.userInfo.username} &nbsp;<a className={style.exit} onClick={ () => {axios.get('/api/user/logout');location.reload();}}><Icon type="logout" /></a></p>
        {
            props.userInfo.userType === 'admin' ?
                <Button onClick={() => props.history.push('/admin')} type="primary">点击进入管理页面</Button> :
                <p className={style.centerP}>光临博客</p>
        }
    </div>
);