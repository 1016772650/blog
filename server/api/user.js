/**
 * Created by vijay on 2018/2/13.
 */
import Express from 'express';
import User from '../../models/user';
import {MD5_SUFFIX, responseClient, md5} from '../util'

const router = Express.Router();

/**
 * 登录
 * */
router.post('/login', (req, res) => {
    let {username, password} =  req.body;
    if (!username) {
        responseClient(res, 400, 2, '用户名不可为空');
        return;
    }
    if (!password) {
        responseClient(res, 400, 2,'密码不可为空');
    }
    User.findOne({
        username,
        // password: md5(password + MD5_SUFFIX)
    }).then(userInfo => {
        // console.log("api,user.js,userInfo:", userInfo);
        if (userInfo) {
            // 登陆成功
            let data = {};
            data.username = userInfo.username;
            data.userType = userInfo.type;
            data.userId = userInfo._id;
            // 登录成功后设置session
            req.session.uerInfo = data;
            // console.log("api,user.js,session:", req.session);
            responseClient(res, 200, 0, '登录成功', data);
            return;
        }

        responseClient(res, 400, 1, '用户名或者密码错误');
    }).catch(err => {
        responseClient(res, 500, 3, err);
        console.log("api,user.js,err:", err);
    })
});


router.get('/logout', function (req, res) {
    req.session.destroy();
    // console.log('spi,user,logout,req.session:', req.session);
    res.redirect('/');
});

module.exports = router;
