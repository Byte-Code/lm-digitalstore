import { connect } from 'react-redux';

import StoreStockBadge from '../components/StoreStockBadge';
import { getStoreName } from '../reducers/selectors';

const mapStateToProps = (state) => ({
  storeName: getStoreName(state)
});

export default connect(mapStateToProps, {})(StoreStockBadge);
