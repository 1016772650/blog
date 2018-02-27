/**
 * Created by vijay on 2018/2/22.
 */
import Express from 'express';
import Article from '../../models/article';
import {responseClient} from '../util';

const router = Express.Router();

router.post('/addArticle', function (req, res) {
    const {
        title,
        content,
        time,
        tags,
        isPublish
    } = req.body;
    // console.log("article, time: ", time);
    const author = req.session.userInfo.username;
    const coverImg = `/${Math.round(Math.random() * 9 + 1)}.jpg`;
    const viewCount = 0;
    const commentCount = 0;
    let tempArticle = new Article({
        title,
        content,
        isPublish,
        viewCount,
        commentCount,
        time,
        author,
        coverImg,
        tags: tags.split(',')
    });
    tempArticle.save().then(data => {
        responseClient(res, 200, 0, '保存成功', data);
    }).cancel(err=>{
        console.error(err);
        responseClient(res);
    })
});

router.post('/updateArticle', (req, res) => {
    const {
        title,
        content,
        time,
        tags,
        isPublish,
        id
    } = req.body;
    Article.update({_id: id}, {title, content, time, tags: tags.split(','), isPublish})
        .then(result => {
            responseClient(res, 200, 0, '更新成功', result)
        }).cancel(err => {
            responseClient(res);
            console.error(err);
    })
});

router.get('/delArticle', (req, res) => {
     let id = req.query.id;
     Article.remove({_id:id})
         .then(result => {
             if(result.n === 1) {
                 responseClient(res, 200, 0, '删除成功');
             } else {
                 responseClient(res, 200, 1, '文章不存在');
             }
         }).cancel(err => {
             responseClient(res);
             console.error(err);
        });
});

module.exports = router;
