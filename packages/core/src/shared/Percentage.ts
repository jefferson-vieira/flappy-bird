import ObjectMapper from './ObjectMapper';

export interface PercentageProps {
  value?: number;
  attr?: string;
  min?: number;
  max?: number;
}

export default class Percentage extends ObjectMapper<Percentage> {
  constructor(props: PercentageProps) {
    super({
      ...props,
      attr: props.attr ?? 'percentual',
      min: props.min ?? 0,
      max: props.max ?? 1,
    });

    const { value, attr, min, max } = this.props;

    if (value == null) throw new Error(`O valor de ${attr} é obrigatório`);

    if (value < min! || value > max!) {
      throw new Error(`O valor de ${attr} deve ser entre ${min} e ${max}`);
    }
  }

  static new(value: number, attr?: string, min?: number, max?: number) {
    return new Percentage({ value, attr, min, max });
  }

  get value(): number {
    return this.props.value!;
  }

  get attr(): string {
    return this.props.attr!;
  }

  get min(): number {
    return this.props.min!;
  }

  get max(): number {
    return this.props.max!;
  }
}
