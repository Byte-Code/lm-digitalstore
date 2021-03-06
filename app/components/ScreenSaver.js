import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles.css';

export default class ScreenSaver extends Component {
  static propTypes = {
    video: PropTypes.string.isRequired,
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
