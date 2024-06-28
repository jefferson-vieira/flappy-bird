import { Obstacle, Obstacles } from '../obstacle';
import Bird from '../bird';

export enum CrashSensorPayload {
  CRASH,
  NOTHING,
  PASS,
}

export default class CrashSensor {
  assert(
    bird: Bird,
    previousObstacles: Obstacles,
    obstacles: Obstacles,
  ): CrashSensorPayload {
    const previousObstacle = this.getObstacle(bird, previousObstacles);

    const obstacle = this.getObstacle(bird, obstacles);

    const hasCrash = this.getCrashed(bird, obstacles);

    if (hasCrash) {
      return CrashSensorPayload.CRASH;
    }

    if (previousObstacle && !obstacle) {
      return CrashSensorPayload.PASS;
    }

    return CrashSensorPayload.NOTHING;
  }

  private getCrashed(bird: Bird, obstacles: Obstacles) {
    return (
      this.getCrashedX(bird, obstacles) && this.getCrashedY(bird, obstacles)
    );
  }

  private getCrashedX(bird: Bird, obstacles: Obstacles): boolean {
    const birdOffsetLeft = 0.5;
    const birdOffsetRight = 0.5 + bird.width.value;

    return obstacles.obstacles.some((obstacle) => {
      return (
        obstacle.position.value <= birdOffsetRight &&
        obstacle.position.value + obstacle.width.value >= birdOffsetLeft
      );
    });
  }

  private getCrashedY(bird: Bird, obstacles: Obstacles): boolean {
    const birdOffsetBottom = bird.altitude.value;
    const birdOffsetTop = bird.altitude.value + bird.height.value;

    const obstacle = this.getObstacle(bird, obstacles)!;
    const obstacleOffsetBottom = obstacle.bottom.value;
    const obstacleOffsetTop = obstacle.bottom.value + obstacle.gap.value;

    return (
      birdOffsetBottom <= obstacleOffsetBottom ||
      birdOffsetTop >= obstacleOffsetTop
    );
  }

  private getObstacle(bird: Bird, obstacles: Obstacles) {
    return obstacles.obstacles.find((obstacle) => {
      const start = obstacle.position.value;

      const end = obstacle.position.value + obstacle.width.value;

      return start <= 0.5 + bird.width.value && end >= 0.5;
    });
  }
}
