import { ObstaclesGap, Difficulty, Obstacles } from '../../src';

test('Deve criar obstaculos', () => {
  const obstacles = Obstacles.new();

  expect(obstacles.obstacles.length).toBe(5);
  expect(obstacles.difficulty).toBe(Difficulty.MEDIUM);
  expect(obstacles.gap).toBe(ObstaclesGap.NORMAL);
});

test('Deve animar os obstáculos diminuindo as posições', () => {
  const o1 = Obstacles.new();
  const o2 = o1.animate();

  expect(o2.obstacles[0]!.position.value).toBeLessThan(
    o1.obstacles[0]!.position.value,
  );
  expect(o2.obstacles[1]!.position.value).toBeLessThan(
    o1.obstacles[1]!.position.value,
  );
  expect(o2.obstacles[2]!.position.value).toBeLessThan(
    o1.obstacles[2]!.position.value,
  );
  expect(o2.obstacles[3]!.position.value).toBeLessThan(
    o1.obstacles[3]!.position.value,
  );
  expect(o2.obstacles[4]!.position.value).toBeLessThan(
    o1.obstacles[4]!.position.value,
  );
});

test('Deve animar os obstáculos até primeiro mudar para última posição', () => {
  const o1 = Obstacles.new();
  const o2 = Array(1100)
    .fill(0)
    .reduce((acc) => acc.animate(), o1);

  const highestPosition = Math.max(
    ...o2.obstacles.map((i: any) => i.position.value),
  );

  expect(o2.obstacles[0]!.position.value).toBe(highestPosition);
});
