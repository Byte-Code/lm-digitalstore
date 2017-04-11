export default function storeIdReducer(state = null, action) {
  switch (action.type) {
    case 'SET_STORE_ID': {
      return action.storeId;
    }
    default:
      return state;
  }
}
