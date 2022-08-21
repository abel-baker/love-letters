class Deck extends Array {
  constructor(source = ["fourth", "fifth", "sixth", "sixth"]) {
    super(...source);
  }

  shuffle() {
    let m = this.length, i;

    while (m) {
      i = Math.floor(Math.random() * m--);

      [this[m], this[i]] = [this[i], this[m]];
    }

    return this;
  }
}

module.exports = Deck;