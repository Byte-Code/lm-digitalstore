import React, { Component } from 'react';
import styles from './styles.css';
import PropTypes from 'prop-types';

export default class ScreenSaver extends Component {
  static propTypes = {
    video: PropTypes.any ,
  };

  render() {
    const { video } = this.props;

    return (
      <video
        autoPlay
        loop
        muted
        className={styles.video}

      >
        <source src={video} type="video/mp4" />
      </video>
    );
  }
}
