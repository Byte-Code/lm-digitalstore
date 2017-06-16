class IdleTimer {
  constructor() {
    this.idleTime = 0;
    this.tresholdReached = false;
    this.handleEvent = this.handleEvent.bind(this);
    this.tick = this.tick.bind(this);
  }

  init(time, onStart, onComplete, treshold, onReachTreshold, onReset) {
    this.time = time;
    this.onStart = onStart;
    this.onComplete = onComplete;
    this.onReachTreshold = onReachTreshold;
    this.treshold = treshold;
    this.onReset = onReset;
    document.addEventListener('pointerenter', this.handleEvent, false);
    document.addEventListener('pointermove', this.handleEvent, false);
    document.addEventListener('scroll', this.handleEvent, false);
    this.start();
  }

  handleEvent() {
    this.resetIndleTime();
  }

  tick() {
    this.idleTime = this.idleTime + 1;
    if (!this.tresholdReached && this.idleTime >= this.treshold / 1000) {
      this.tresholdReached = true;
      this.onReachTreshold();
    }
    if (this.idleTime >= this.time / 1000) {
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

  resetIndleTime() {
    if (this.onReset) {
      this.onReset();
    }
    this.tresholdReached = false;
    this.idleTime = 0;
  }
}

export default new IdleTimer();
