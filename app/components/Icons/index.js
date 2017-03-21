import React, { PropTypes } from 'react';

import * as conditions from '../../utils/weatherConditions';
import styles from './styles.css';

function sunShowerIcon() {
  return (
    <div className={styles.icon}>
      <div className={styles.cloud} />
      <div className={styles.sun}>
        <div className={styles.rays} />
      </div>
      <div className={styles.rain} />
    </div>
  );
}

function thunderStormIcon() {
  return (
    <div className={styles.icon}>
      <div className={styles.cloud} />
      <div className={styles.lightning}>
        <div className={styles.bolt} />
        <div className={styles.bolt} />
      </div>
    </div>
  );
}

function cloudyIcon() {
  return (
    <div className={styles.icon}>
      <div className={styles.cloud} />
      <div className={styles.cloud} />
    </div>
  );
}

function flurriesIcon() {
  return (
    <div className={styles.icon}>
      <div className={styles.cloud} />
      <div className={styles.snow}>
        <div className={styles.flake} />
        <div className={styles.flake} />
      </div>
    </div>
  );
}

function sunnyIcon() {
  return (
    <div className={styles.icon}>
      <div className={styles.sun}>
        <div className={styles.rays} />
      </div>
    </div>
  );
}

function rainyIcon() {
  return (
    <div className={styles.icon}>
      <div className={styles.cloud} />
      <div className={styles.rain} />
    </div>
  );
}

const IconSelector = ({ weather }) => {
  switch (weather) {
    case conditions.clearSky:
    default:
      return sunnyIcon();
    case conditions.fewClouds:
    case conditions.scatteredClouds:
    case conditions.brokenClouds:
    case conditions.mist:
      return cloudyIcon();
    case conditions.showerRain:
      return rainyIcon();
    case conditions.rain:
      return sunShowerIcon();
    case conditions.snow:
      return flurriesIcon();
    case conditions.thunderstorm:
      return thunderStormIcon();
  }
};

IconSelector.propTypes = {
  weather: PropTypes.string.isRequired
};

export default IconSelector;
