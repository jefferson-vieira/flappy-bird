export default class RandomNumber {
  readonly value: number;

  constructor(
    readonly min: number,
    readonly max: number,
  ) {
    if (min > max) {
      throw new Error('O valor mínimo deve ser menor que o valor máximo');
    }

    this.value = Math.round((Math.random() * (max - min) + min) * 100) / 100;
  }
}
