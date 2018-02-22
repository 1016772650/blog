/**
 * Created by vijay on 2018/2/22.
 */
import mongoose from 'mongoose';
import tagSchema from '../schemas/tags';

module.exports = mongoose.model('Tag', tagSchema);