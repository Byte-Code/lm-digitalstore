import { call, put, takeEvery } from 'redux-saga/effects';
import { REQUEST_EMAIL_PURCHASE, REQUEST_SMS_PURCHASE } from '../actions/actionTypes';
import * as purchaseAction from '../actions/purchaseActions';

function* callSendEmail({ email }) {
  try {
    const result = yield call(setTimeout(() => email, 2000));
    if (result) {
      yield put(purchaseAction.successEmailPurchase());
    } else {
      yield put(purchaseAction.failureEmailPurchase, result);
    }
  } catch (error) {
    yield put(purchaseAction.failureEmailPurchase(error));
  }
}

function* callSendsms({ sms }) {
  try {
    if (sms) {
      yield put(purchaseAction.successSmsPurchase(sms));
    } else {
      yield put(purchaseAction.failureSmsPurchase);
    }
  } catch (error) {
    yield put(purchaseAction.failureSmsPurchase(error));
  }
}

export default function* purchase() {
  yield takeEvery(REQUEST_EMAIL_PURCHASE, callSendEmail);
  yield takeEvery(REQUEST_SMS_PURCHASE, callSendsms);
}
