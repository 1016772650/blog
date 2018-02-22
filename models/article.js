/**
 * Created by vijay on 2018/2/22.
 */
import mongoose from 'mongoose';
import articleSchema from '../schemas/article';

module.exports = mongoose.model('Article', articleSchema);