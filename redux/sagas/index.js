import { all } from 'redux-saga/effects';

import authSaga from './auth';
import baseSaga from './base';
import reportSaga from "~/scenes/Report/saga";


const Saga = function* () {
  yield all([
    authSaga(),
    baseSaga(),
    reportSaga(),
  ])
}

export default Saga