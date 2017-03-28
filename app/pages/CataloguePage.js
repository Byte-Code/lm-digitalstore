import React, { PropTypes } from 'react';

import Page from '../components/Page';
import Catalogue from '../containers/Catalogue';
import Footer from '../components/Footer';

export default function CataloguePage(props) {
  return (
    <Page background="#f7f7f7">
      <Catalogue params={props.params} />
      <Footer />
    </Page>
  );
}

CataloguePage.propTypes = {
  params: PropTypes.shape({ categoryCode: PropTypes.string.isRequired }).isRequired
};
