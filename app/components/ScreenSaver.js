import React, { Component } from 'react';
import video from '../../app/assets/videos/DS_Splash02.mp4';
import styles from './styles.css';

export default class ScreenSaver extends Component {
  render() {
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
