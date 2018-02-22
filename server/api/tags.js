/**
 * Created by vijay on 2018/2/22.
 */
import Express from 'express';
import Tags from '../../models/tags';
import {responseClient} from '../util';

const router = Express.Router();

// 获取全部标签
router.get('/getAllTags', function (req, res) {
    Tags.find(null, 'name')
        .then(data => {
            responseClient(res, 200, 0, '请求成功', data);
        })
        .catch(err => {
            responseClient(res);
            console.log(err);
        })
});

// 添加标签
router.post('/addTag', function (req, res) {
    let {name} = req.body;
    Tags.findOne({
        name
    }).then(result => {
        if (!result) {
            let tag = new Tags({
                name
            });
            tag.save().then(data => {
                responseClient(res, 200, 0, '添加成功', data);
            }).catch(err => {
                console.error(err);
            })
        } else {
            responseClient(res, 200, 1, '该标签已存在');
        }
    }).catch(err => {
        responseClient(res);
        console.error(err);
    });
});

// 删除标签
router.get('/delTag', function (req, res) {
    let {name} = req.query;
    Tags.remove({name})
        .then(result => {
            // console.log("tags, result: ", result);
            if (result.n === 1) {
                responseClient(res, 200, 0, '删除成功');
            } else {
                responseClient(res, 200, 1, '标签不存在');
            }
        })
        .catch(err => {
            responseClient(res);
            console.error(err);
        })
});

module.exports = router;