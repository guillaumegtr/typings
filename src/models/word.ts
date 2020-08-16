export class Word {
  value: String;
  className: String;

  constructor(value: String, className: String = 'word') {
    this.value = value;
    this.className = className;
  }

  setClassByIndexAndRound = (index: number, round: number) => {
    if (index == round) {
      this.className = this.className.concat(' ').concat(' current');
    } else if (index < round) {
      this.className = this.className.concat(' ').concat(' done');
    }
  };
}
