import React, { PropTypes } from 'react';

import Page from '../components/Page';
import Product from '../containers/Product';
import Footer from '../components/Footer';
import SideMenu from '../components/SideMenu';

export default function ProductPage(props) {
  return (
    <Page>
      <SideMenu />
      <Product params={props.params} />
      <Footer />
    </Page>
  );
}

ProductPage.propTypes = {
  params: PropTypes.shape({ productCode: PropTypes.string.isRequired }).isRequired
};
