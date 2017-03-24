import React, { PropTypes } from 'react';

import Page from '../components/Page';
import Product from '../containers/Product';

export default function ProductPage(props) {
  return (
    <Page>
      <Product params={props.params} />
    </Page>
  );
}

ProductPage.propTypes = {
  params: PropTypes.shape({ productCode: PropTypes.string.isRequired }).isRequired
};
