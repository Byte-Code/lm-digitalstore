import { REQUEST_EMAIL_PURCHASE, SUCCESS_EMAIL_PURCHASE, FAILURE_EMAIL_PURCHASE,
  REQUEST_SMS_PURCHASE, SUCCESS_SMS_PURCHASE, FAILURE_SMS_PURCHASE } from './actionTypes';

export function requestEmailPurchase(email) {
  return ({ type: REQUEST_EMAIL_PURCHASE, email });
}

export function successEmailPurchase() {
  return ({ type: SUCCESS_EMAIL_PURCHASE });
}

export function failureEmailPurchase(error) {
  return ({ type: FAILURE_EMAIL_PURCHASE, error });
}

export function requestSmsPurchase(sms) {
  return ({ type: REQUEST_SMS_PURCHASE, sms });
}

export function successSmsPurchase() {
  return ({ type: SUCCESS_SMS_PURCHASE });
}

export function failureSmsPurchase(error) {
  return ({ type: FAILURE_SMS_PURCHASE, error });
}
