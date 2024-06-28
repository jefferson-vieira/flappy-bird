import type { ObstacleProps } from './Obstacle';
import Obstacle from './Obstacle';
import { Difficulty } from './Difficulty';
import ObjectMapper from '../shared/ObjectMapper';
import { ObstaclesGap } from './ObstaclesGap';

export interface ObstaclesProps {
  difficulty?: Difficulty;
  gap?: ObstaclesGap;
  obstacles?: ObstacleProps[];
}

export default class Obstacles extends ObjectMapper<Obstacles> {
  readonly difficulty: Difficulty;
  readonly gap: ObstaclesGap;
  readonly obstacles: Obstacle[];

  private constructor(props: ObstaclesProps) {
    super(props);

    this.difficulty = props.difficulty!;
    this.gap = props.gap!;
    this.obstacles = props.obstacles!.map((i) => Obstacle.new(i))!;
  }

  static new(props?: ObstaclesProps) {
    const difficulty = props?.difficulty ?? Difficulty.MEDIUM;

    const gap = props?.gap ?? ObstaclesGap.NORMAL;

    const obstacles =
      props?.obstacles ??
      Array.from(
        { length: 5 },
        (_, i) => Obstacle.new({ difficulty, position: 1 + gap * i }).props,
      );

    return new Obstacles({
      difficulty,
      gap,
      obstacles,
    });
  }

  animate(): Obstacles {
    const newObstacles = this.obstacles.map((obstacle) => obstacle.animate());

    const highestPosition = Math.max(
      ...newObstacles.map((obstacle) => obstacle.position.value),
    );

    const lowestPosition = Math.min(
      ...newObstacles.map((item) => item.position.value),
    );

    const obstacles = newObstacles.map((obstacle) => {
      const isInLowestPosition = obstacle.position.value === lowestPosition;

      const outOfScreen = lowestPosition < -obstacle.width.value;

      return isInLowestPosition && outOfScreen
        ? Obstacle.new({
            difficulty: this.difficulty,
            position: highestPosition + this.gap,
          })
        : obstacle;
    });

    return this.clone({
      obstacles: obstacles.map((obstacle) => obstacle.props),
    });
  }
}
