import _ from 'lodash';

class IdleTimer {
  constructor() {
    this.idleTime = 0;
    this.tresholdReached = false;
    this.handleEvent = this.handleEvent.bind(this);
    this.tick = this.tick.bind(this);
  }

  init(limit, onStart, onComplete, treshold, onReachTreshold, onReset) {
    this.limit = limit;
    this.onStart = onStart;
    this.onComplete = onComplete;
    this.onReachTreshold = onReachTreshold;
    this.treshold = treshold;
    this.onReset = onReset;
    document.addEventListener('pointerenter', this.handleEvent, false);
    document.addEventListener('pointermove', this.handleEvent, false);
    document.addEventListener('scroll', _.throttle(this.handleEvent, 5 * 1000), false);
    this.start();
  }

  handleEvent() {
    this.resetIndleTime();
  }

  tick() {
    this.idleTime = this.idleTime + 1;
    if (!this.tresholdReached && this.idleTime >= this.treshold / 1000) {
      this.tresholdReached = true;
      const countDownTime = this.limit - this.treshold;
      this.onReachTreshold(countDownTime);
    }
    if (this.idleTime >= this.limit / 1000) {
      if (this.onComplete) {
        this.onComplete();
      }
      this.resetIndleTime();
    }
  }

  start() {
    clearInterval(this.interval);
    if (this.onStart) {
      this.onStart();
    }
    this.interval = setInterval(this.tick, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  resetIndleTime() {
    if (this.onReset) {
      this.onReset(this.tresholdReached);
    }
    if (this.tresholdReached) {
      this.tresholdReached = false;
    }
    this.idleTime = 0;
  }
}

export default new IdleTimer();
