/**
 * Created by vijay on 2018/2/24.
 */
import {take, put, call} from 'redux-saga/effects';
import {get} from '../fetch/fetch';
import {actionTypes as IndexActionTypes} from '../reducers';
import {actionTypes as FrontActionTypes} from '../reducers/frontReducer';

export function* getArticleDetail (id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/getArticleDetail?id=${id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END});
    }
}

export function* getArticleDetailFlow () {
    while (true) {
        let req = yield take(FrontActionTypes.GET_ARTICLE_DETAIL);
        let res = yield call(getArticleDetail, req.id);
        if (res) {
            if (res.code === 0) {
                yield put({type: FrontActionTypes.RESPONSE_ARTICLE_DETAIL, data:res.data});
            } else {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}
