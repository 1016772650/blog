/**
 * Created by vijay on 2018/2/11.
 */
import Express from 'express';


const router = Express.Router();

router.use('/user', require('./user'));
// 获取所有标签


module.exports = router;