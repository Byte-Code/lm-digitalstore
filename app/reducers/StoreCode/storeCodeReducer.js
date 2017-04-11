export default function storeCodeReducer(state = null, action) {
  switch (action.type) {
    case 'SET_STORE_CODE': {
      return action.storeCode;
    }
    default:
      return state;
  }
}
