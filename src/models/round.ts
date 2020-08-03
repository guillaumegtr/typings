type Time = { minutes: number; seconds: number };

export class Round {
  private wordCount: number;
  private keyStrokes: number;
  private errorCount: number;
  private accuracy: number;
  private WPM: number;

  constructor() {
    this.init();
  }

  init = () => {
    this.accuracy = 0;
    this.wordCount = 0;
    this.keyStrokes = 0;
    this.errorCount = 0;
    this.WPM = 0;
  };

  setWordCount = (wordCount: number) => {
    this.wordCount = wordCount;
  };

  addError = () => {
    this.errorCount++;
  };

  countEntry = () => {
    this.keyStrokes++;
  };

  /**
   * To calculate the WPM, this uses the NET WPM formala
   * 1. Convert seconds into minutes (s / 60)
   * 2. Calculate Gross WPM == (n entries (key strokes) / 5) / time (min)
   * 3. Calculate Net WPM == Gross WPM - (errors / time (min))
   * 4. WPM === Net WPM * accuracy (to avoid someone spamming his keys with no accuracy)
   * @param time minutes and seconds
   */
  calculateWPM = (time: Time) => {
    const totalMinutes = time.minutes + time.seconds / 60;
    const grossWPM = this.keyStrokes / 5 / totalMinutes;
    this.accuracy = 1 - this.errorCount / this.wordCount;
    this.WPM = Math.round(
      (grossWPM - this.errorCount / totalMinutes) * this.accuracy
    );
  };

  getWPM = () => {
    return this.WPM;
  };

  getAccuracy = () => {
    return this.accuracy;
  };
}
