import React, { PropTypes } from 'react';

import Page from '../components/Page';
import Catalogue from '../containers/Catalogue';

export default function CataloguePage(props) {
  return (
    <Page backgroundColor="#f7f7f7">
      <Catalogue params={props.params} />
    </Page>
  );
}

CataloguePage.propTypes = {
  params: PropTypes.shape({ categoryCode: PropTypes.string.isRequired }).isRequired
};
