import React from 'react';
import styles from './styles.css';

export function sunShowerIcon() {
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

export function thunderStormIcon() {
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

export function cloudyIcon() {
  return (
    <div className={styles.icon}>
      <div className={styles.cloud} />
      <div className={styles.cloud} />
    </div>
  );
}

export function flurriesIcon() {
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

export function sunnyIcon() {
  return (
    <div className={styles.icon}>
      <div className={styles.sun}>
        <div className={styles.rays} />
      </div>
    </div>
  );
}

export function rainyIcon() {
  return (
    <div className={styles.icon}>
      <div className={styles.cloud} />
      <div className={styles.rain} />
    </div>
  );
}
