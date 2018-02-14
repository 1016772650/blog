/**
 * Created by vijay on 2018/2/11.
 */
import Express from 'express';
import User from '../../models/user';
import {responseClient} from '../util';

const router = Express.Router();

// admin请求后台验证
router.use( (req, res, next) => {
    console.log("api/admin.js,req.session:", req.session)
    if (req.session.userInfo) {
        next();
    } else {
        return res.send(responseClient(res, 200, 1, '身份信息已过期，请重新登录'));
    }
} );

router.get('/getUsers', (req, res) => {
    let skip = (req.query.pageNum-1)<0 ? 0: (req.query.pageNum-1) * 10;
    // console.log("api/admin,getUsers,req.session:", req.session);
    let responseData = {
        total: 0,
        list: []
    };
    User.count().then(
        count => {
            responseData.total = count;
            User.find(null, '_id username type password', {skip: skip, limit:10}).then(
                (result) => {
                    responseData.list = result;
                    responseClient(res, 200, 0, "", responseData);
                }
            ).catch(
                err => {
                    responseClient(res, message="获取失败，稍后重试");
                }
            );
        }
    );
});



module.exports = router;