/**
 * Created by vijay on 2018/2/11.
 */
import {fork} from 'redux-saga/effects';
import {loginFlow, registerFlow} from './homeSaga';


export default function* rootSaga() {
    yield fork(loginFlow);
    yield fork(registerFlow)
}

