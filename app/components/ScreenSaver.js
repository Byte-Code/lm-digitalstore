import React, { Component } from 'react';
import video from '../../app/assets/videos/ScreensaverLM.mp4';
import styles from './ScreenSaver.css';

export default class ScreenSaver extends Component {
  render() {
    return (
      <video
        autoPlay
        loop
        muted
        className={styles.bgvid}
      >
        <source src={video} type="video/mp4" />
      </video>
    );
  }
}
