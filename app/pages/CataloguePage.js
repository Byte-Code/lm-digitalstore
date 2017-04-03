import React, { PropTypes } from 'react';

import Page from '../components/Page';
import Catalogue from '../containers/Catalogue';
import Footer from '../components/Footer';

export default function CataloguePage(props) {
  return (
    <Page
      background="#f7f7f7"
      padding="0 0 140px"
    >
      <Catalogue params={props.params} router={props.router} />
      <Footer />
    </Page>
  );
}

CataloguePage.propTypes = {
  params: PropTypes.shape({ categoryCode: PropTypes.string.isRequired }).isRequired,
  router: PropTypes.shape({ location: PropTypes.object.isRequired }).isRequired
};
