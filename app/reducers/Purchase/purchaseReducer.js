import { fromJS } from 'immutable';
import { REQUEST_EMAIL_PURCHASE, SUCCESS_EMAIL_PURCHASE, FAILURE_EMAIL_PURCHASE,
  REQUEST_SMS_PURCHASE, SUCCESS_SMS_PURCHASE, FAILURE_SMS_PURCHASE
} from '../../actions/actionTypes';

const initialState = fromJS({
  email: { sending: false },
  sms: { sending: false }
});
export default function purchaseReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_EMAIL_PURCHASE:
      return state.setIn(['email', 'sending'], true);
    case SUCCESS_EMAIL_PURCHASE:
    case FAILURE_EMAIL_PURCHASE:
      return state.setIn(['email', 'sending'], false);
    case REQUEST_SMS_PURCHASE:
      return state.setIn(['sms', 'sending'], true);
    case SUCCESS_SMS_PURCHASE:
    case FAILURE_SMS_PURCHASE:
      return state.setIn(['sms', 'sending'], false);
    default:
      return state;
  }
}
