import { put, takeEvery } from 'redux-saga/effects';
import { REQUEST_EMAIL_PURCHASE, REQUEST_SMS_PURCHASE } from '../actions/actionTypes';
import * as purchaseAction from '../actions/purchaseActions';

function* callSendEmail({ email }) {
  try {
    if (email) {
      yield put(purchaseAction.successEmailPurchase());
    } else {
      yield put(purchaseAction.failureEmailPurchase());
    }
  } catch (error) {
    yield put(purchaseAction.failureEmailPurchase(error));
  }
}

function* callSendsms({ sms }) {
  try {
    if (sms) {
      yield put(purchaseAction.successSmsPurchase());
    } else {
      yield put(purchaseAction.failureSmsPurchase());
    }
  } catch (error) {
    yield put(purchaseAction.failureSmsPurchase(error));
  }
}

export default function* purchase() {
  yield takeEvery(REQUEST_EMAIL_PURCHASE, callSendEmail);
  yield takeEvery(REQUEST_SMS_PURCHASE, callSendsms);
}
