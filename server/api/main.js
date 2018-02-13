/**
 * Created by vijay on 2018/2/11.
 */
import Express from 'express';


const router = Express.Router();

router.use('/user', require('./user'));

module.exports = router;