type Time = { minutes: number; seconds: number };

export class Timer {
  private static instance: Timer;

  private startTime: number;
  private updatedTime: number;
  private difference: number;
  private timeInterval: number;
  private savedTime: number;

  private paused: boolean;
  private running: boolean;

  private time: Time;

  private constructor() {
    this.reset();
  }

  public static getInstance(): Timer {
    if (!Timer.instance) {
      Timer.instance = new Timer();
    }

    return Timer.instance;
  }

  start = () => {
    if (!this.running) {
      this.startTime = new Date().getTime();
      this.timeInterval = window.setInterval(this.calculateTime, 1000);
      this.paused = false;
      this.running = true;
    }
  };

  pause = () => {
    if (!this.difference) {
      return;
    } else if (!this.paused) {
      clearInterval(this.timeInterval);
      this.savedTime = this.timeInterval;
      this.paused = true;
      this.running = false;
    } else {
      this.start();
    }
  };

  reset = () => {
    clearInterval(this.timeInterval);
    this.savedTime = 0;
    this.difference = 0;
    this.paused = true;
    this.running = false;
  };

  calculateTime = () => {
    this.updatedTime = new Date().getTime();
    if (this.savedTime) {
      this.difference = this.updatedTime - this.startTime + this.savedTime;
    } else {
      this.difference = this.updatedTime - this.startTime;
    }

    let minutes = Math.floor(
      (this.difference % (1000 * 60 * 60)) / (1000 * 60)
    );
    let seconds = Math.floor((this.difference % (1000 * 60)) / 1000);

    this.time = { minutes, seconds };
  };

  isStarted = (): boolean => {
    return this.running;
  };

  getTime = (): Time => {
    return this.time;
  };

  clearTime = () => {
    this.time = { minutes: 0, seconds: 0 };
  };
}
