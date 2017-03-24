import React, { PropTypes } from 'react';

import Page from '../components/Page';

export default function ProductPage(props) {
  return (
    <Page backgroundColor="#f7f7f7">
      <div>{props.params.productCode}</div>
    </Page>
  );
}

ProductPage.propTypes = {
  params: PropTypes.shape({ productCode: PropTypes.string.isRequired }).isRequired
};
