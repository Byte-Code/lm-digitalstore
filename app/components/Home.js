import React, { Component } from 'react';
import styles from './Home.css';


export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Leroy_Merlin.svg" alt="logo" />
          <h1>Digital Store</h1>
        </div>
      </div>
    );
  }
}
