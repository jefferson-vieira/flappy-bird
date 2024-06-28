import { Difficulty } from './Difficulty';
import RandomNumber from '../shared/RandomNumber';
import ObjectMapper from '../shared/ObjectMapper';
import Percentage from '../shared/Percentage';

export interface ObstacleProps {
  top?: number;
  bottom?: number;
  width?: number;
  position?: number;
  difficulty?: Difficulty;
}

export default class Obstacle extends ObjectMapper<Obstacle> {
  readonly top: Percentage;
  readonly bottom: Percentage;
  readonly width: Percentage;
  readonly position: Percentage;
  readonly difficulty: Difficulty;

  private constructor(props: ObstacleProps) {
    super(props);

    this.top = Percentage.new(props.top!, 'top');
    this.bottom = Percentage.new(props.bottom!, 'bottom');
    this.width = Percentage.new(props.width!, 'width');
    this.position = Percentage.new(props.position!, 'position', -1, 3);
    this.difficulty = props.difficulty!;

    const obstacleOccupation = this.bottom.value + this.top.value;
    this.checkObstacleOccupation(obstacleOccupation);
  }

  static new(props?: ObstacleProps): Obstacle {
    const difficulty = props?.difficulty ?? Difficulty.MEDIUM;
    const minOccupation = 0.1;
    const maxOccupation = 1 - difficulty - minOccupation;
    const bottom = new RandomNumber(minOccupation, maxOccupation).value;
    const top = Math.round((1 - bottom - difficulty) * 100) / 100;

    return new Obstacle({
      top: props?.top ?? top,
      bottom: props?.bottom ?? bottom,
      width: 0.08,
      position: props?.position!,
      difficulty,
    });
  }

  get gap(): Percentage {
    return Percentage.new(this.difficulty);
  }

  animate(): Obstacle {
    return this.clone({ position: this.position.value - 0.001 });
  }

  private checkObstacleOccupation(obstacleOccupation: number) {
    const expectedObstacleOccupation = 1 - this.difficulty;

    const occupied = Math.round(obstacleOccupation * 100) / 100;
    const expected = Math.round(expectedObstacleOccupation * 100) / 100;

    if (occupied !== expected) {
      throw new Error(
        `O vão entre os obstáculos deve ser de ${Math.round(
          (1 - expectedObstacleOccupation) * 100,
        )}%`,
      );
    }
  }
}
