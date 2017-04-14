import React from 'react';

import Page from '../components/Page';
import SplashScreen from '../containers/SplashScreen';

export default function SplashScreenPage() {
  return (
    <Page background="rgba(255, 255, 255, 0.2)" height="1920px">
      <SplashScreen />
    </Page>
  );
}
