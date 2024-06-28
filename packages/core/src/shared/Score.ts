import ObjectMapper from './ObjectMapper';

export interface ScoreProps {
  value?: number;
  attr?: string;
}

export default class Score extends ObjectMapper<Score> {
  constructor(props: ScoreProps) {
    super({ ...props, attr: props.attr ?? 'pontuação' });

    const { value, attr } = this.props;

    if (value == null) {
      throw new Error(`O valor de ${attr} é obrigatório`);
    }

    if (value < 0) {
      throw new Error(`O valor de ${attr} não pode ser negativo`);
    }
  }

  static new(value: number, attr?: string) {
    return new Score({ value, attr });
  }

  increment(value: number = 1): Score {
    return Score.new(this.value + value);
  }

  get value(): number {
    return this.props.value!;
  }

  get attr(): string {
    return this.props.attr!;
  }
}
