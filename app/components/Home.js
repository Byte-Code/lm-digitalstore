import React, { Component } from 'react';
import video from '../../app/assets/videos/ScreensaverLM.mp4';
import styles from './Home.css';


export default class Home extends Component {
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
