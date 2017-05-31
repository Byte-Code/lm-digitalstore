import React from 'react';
import PropTypes from 'prop-types';

import Page from '../components/Page';
import Catalogue from '../containers/Catalogue';
import Footer from '../components/Footer';
import SideMenu from '../components/SideMenu';

export default function CataloguePage(props) {
  return (
    <Page background="#f7f7f7" padding="0 0 140px" height="1920px">
      <SideMenu />
      <Catalogue params={props.params} router={props.router} />
      <Footer />
    </Page>
  );
}

CataloguePage.propTypes = {
  params: PropTypes.shape({ categoryCode: PropTypes.string.isRequired }).isRequired,
  router: PropTypes.shape({ location: PropTypes.object.isRequired }).isRequired
};
