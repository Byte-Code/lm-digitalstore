import React, { PropTypes } from 'react';

import Page from '../components/Page';
import Product from '../containers/Product';

export default function ProductPage(props) {
  return (
    <Page backgroundColor="#f7f7f7">
      <Product params={props.params} />
    </Page>
  );
}

ProductPage.propTypes = {
  params: PropTypes.shape({ productCode: PropTypes.string.isRequired }).isRequired
};
