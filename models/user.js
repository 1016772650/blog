/**
 * Created by vijay on 2018/2/13.
 */
import mongoose from 'mongoose';
import userSchema from '../schemas/users';

module.exports = mongoose.model("User", userSchema);