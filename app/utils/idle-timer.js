class IdleTimer {
  constructor() {
    this.idleTime = 0;
    this.handleEvent = this.handleEvent.bind(this);
    this.tick = this.tick.bind(this);
  }
  init(time, onStart, onComplete, onReset, onTick) {
    this.time = time;
    this.onStart = onStart;
    this.onComplete = onComplete;
    this.onReset = onReset;
    this.onTick = onTick;
    document.addEventListener('pointerenter', this.handleEvent, false);
    document.addEventListener('pointermove', this.handleEvent, false);
    this.start();
  }
  handleEvent() {
    this.resetIndleTime();
  }
  tick() {
    this.idleTime = this.idleTime + 1;
    if (this.onTick) {
      this.onTick(this.idleTime);
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
    this.idleTime = 0;
  }
}

export default new IdleTimer();
