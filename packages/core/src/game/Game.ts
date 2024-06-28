import type { ObstaclesProps } from '../obstacle';
import { ObstaclesGap, Difficulty, Obstacles } from '../obstacle';
import ObjectMapper from '../shared/ObjectMapper';
import type { BirdProps } from '../bird';
import Bird from '../bird';
import Score from '../shared/Score';
import CrashSensor, { CrashSensorPayload } from './CrashSensor';

export interface GameProps {
  difficulty?: Difficulty;
  gap?: ObstaclesGap;
  obstacles?: ObstaclesProps;
  bird?: BirdProps;
  inCrash?: boolean;
  score?: number;
  record?: number;
}

export default class Game extends ObjectMapper<Game> {
  readonly obstacles: Obstacles;
  readonly bird: Bird;
  readonly score: Score;
  readonly record: Score;
  readonly inCrash: boolean;

  constructor(props: GameProps) {
    super(props);

    this.obstacles = Obstacles.new(props.obstacles);
    this.bird = new Bird(props.bird!);
    this.score = Score.new(props.score ?? 0, 'pontos');
    this.record = Score.new(props.record!, 'recorde');
    this.inCrash = props.inCrash ?? false;
  }

  static new(props?: GameProps): Game {
    const finalProps: GameProps = {
      ...props,
      record: Math.max(props?.score ?? 0, props?.record ?? 0),
      obstacles: props?.obstacles ?? {
        difficulty: props?.difficulty ?? Difficulty.MEDIUM,
        gap: props?.gap ?? ObstaclesGap.NORMAL,
      },
      bird: props?.bird ?? {
        height: 0.06,
        width: 0.04,
        altitude: 0.5,
        weight: 0.003,
      },
    };

    return new Game(finalProps);
  }

  get difficulty(): Difficulty {
    return this.obstacles.difficulty;
  }

  get gap(): ObstaclesGap {
    return this.obstacles.gap;
  }

  isBirdFlying(flying: boolean): Game {
    const bird = this.bird.clone({ flying }).props;

    return this.clone({ bird });
  }

  animate(): Game {
    if (this.inCrash) return this;

    const obstacles = this.obstacles.animate();
    const bird = this.bird.animate();

    const { CRASH: COLIDIU, PASS: PASSOU } = CrashSensorPayload;

    const sensor = new CrashSensor();

    const sensorPayload = sensor.assert(this.bird, this.obstacles, obstacles);

    const score =
      sensorPayload === PASSOU
        ? this.score.increment().value
        : this.score.value;

    return this.clone({
      bird: bird.props,
      obstacles: obstacles.props,
      inCrash: sensorPayload === COLIDIU,
      score,
      record: Math.max(score, this.record.value),
    });
  }

  restart(props?: ObstaclesProps): Game {
    return Game.new({
      difficulty: props?.difficulty ?? this.difficulty,
      gap: props?.gap ?? this.gap,
      record: this.record.value,
    });
  }

  reset(): Game {
    return Game.new();
  }
}
