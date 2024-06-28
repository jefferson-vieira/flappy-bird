import ObjectMapper from '../shared/ObjectMapper';
import Percentage from '../shared/Percentage';

export interface BirdProps {
  height?: number;
  width?: number;
  weight?: number;
  altitude?: number;
  flying?: boolean;
}

export default class Bird extends ObjectMapper<Bird> {
  readonly height: Percentage;
  readonly width: Percentage;
  readonly weight: Percentage;
  readonly altitude: Percentage;
  readonly flying: boolean;

  constructor(props: BirdProps) {
    super(props);

    this.height = Percentage.new(props.height!, 'height', 0.01);
    this.width = Percentage.new(props.width!, 'width', 0.01);
    this.weight = Percentage.new(props.weight ?? 0.003, 'weight');
    this.altitude = Percentage.new(props.altitude!, 'altitude');
    this.flying = props.flying ?? false;
  }

  startFlying(): Bird {
    return this.clone({ flying: true });
  }

  stopFlying(): Bird {
    return this.clone({ flying: false });
  }

  animate(): Bird {
    const weight = this.flying ? this.weight.value : -this.weight.value;

    const newAltitude = this.altitude.value + weight;

    const altitude = Math.max(Math.min(newAltitude, 1), 0);

    return this.clone({ altitude });
  }
}
