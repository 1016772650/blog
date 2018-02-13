/**
 * Created by vijay on 2018/2/13.
 * 用户的表结构
 */

import mongoose from 'mongoose';

module.exports = new mongoose.Schema({
    username: String,
    password: String,
    type: String    // 管理员、普通用户
});
