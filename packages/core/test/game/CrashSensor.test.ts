import { ObstaclesGap, Difficulty, Obstacles, Bird } from '../../src';
import CrashSensor, { CrashSensorPayload } from '../../src/game/CrashSensor';

function buildObstaclesProps(position: number) {
  return {
    difficulty: Difficulty.EASY,
    gap: ObstaclesGap.NORMAL,
    obstacles: [
      {
        position,
        difficulty: Difficulty.EASY,
        bottom: 0.3,
        top: 0.3,
        width: 0.1,
      },
    ],
  };
}

const bird = new Bird({
  altitude: 0.6,
  width: 0.04,
  height: 0.06,
});

test('Deve responder NOTHING ao aferir os dados pelo sensor', () => {
  const sensor = new CrashSensor();
  const payload = sensor.assert(
    bird,
    Obstacles.new(buildObstaclesProps(0.45)),
    Obstacles.new(buildObstaclesProps(0.44)),
  );

  expect(payload).toBe(CrashSensorPayload.NOTHING);
});

test('Deve responder NOTHING quando não tiver obstáculo no centro', () => {
  const sensor = new CrashSensor();
  const payload = sensor.assert(
    bird,
    Obstacles.new(buildObstaclesProps(0.2)),
    Obstacles.new(buildObstaclesProps(0.19)),
  );

  expect(payload).toBe(CrashSensorPayload.NOTHING);
});

test('Deve responder PASS ao aferir os dados pelo sensor', () => {
  const sensor = new CrashSensor();
  const payload = sensor.assert(
    bird,
    Obstacles.new(buildObstaclesProps(0.45)),
    Obstacles.new(buildObstaclesProps(0.3)),
  );

  expect(payload).toBe(CrashSensorPayload.PASS);
});

test('Deve responder CRASH ao aferir os dados pelo sensor', () => {
  const sensor = new CrashSensor();
  const payload = sensor.assert(
    new Bird({ ...bird.props, altitude: 0.3 }),
    Obstacles.new(buildObstaclesProps(0.45)),
    Obstacles.new(buildObstaclesProps(0.44)),
  );

  expect(payload).toBe(CrashSensorPayload.CRASH);
});
