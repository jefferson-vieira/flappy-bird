import { ObstaclesGap, Game, Difficulty } from '../../src';

test('Deve criar um jogo', () => {
  const game = Game.new();

  expect(game.difficulty).toBe(Difficulty.MEDIUM);
  expect(game.score.value).toBe(0);
  expect(game.record.value).toBe(0);
  expect(game.inCrash).toBe(false);
  expect(game.gap).toBe(ObstaclesGap.NORMAL);
});

test('Deve animar jogo e pássaro vai colidir no chão', () => {
  const g1 = Game.new();

  const g2: Game = Array(1100)
    .fill(0)
    .reduce((acc) => acc.animate(), g1);

  expect(g2.inCrash).toBe(true);
});

test('Deve animar jogo e pássaro vai colidir no teto', () => {
  const g1 = Game.new().isBirdFlying(true);
  const g2: Game = Array(1100)
    .fill(0)
    .reduce((acc) => acc.animate(), g1);

  expect(g2.inCrash).toBe(true);
});

test('Deve reiniciar jogo', () => {
  const g1 = Game.new({ score: 10, record: 20 });
  const g2: Game = Array(1100)
    .fill(0)
    .reduce((acc) => acc.animate(), g1);

  expect(g2.inCrash).toBe(true);

  const g3 = g2.restart();

  expect(g3.inCrash).toBe(false);
  expect(g3.score.value).toBe(0);
  expect(g3.record.value).toBe(20);
});

test('Deve zerar jogo', () => {
  const g1 = Game.new({ score: 10, record: 20 });
  const g2 = g1.reset();

  expect(g2.inCrash).toBe(false);
  expect(g2.score.value).toBe(0);
  expect(g2.record.value).toBe(0);
});

test('Deve incrementar um ponto ao cruzar um obstáculo', () => {
  const g1 = Game.new({
    difficulty: Difficulty.EASY,
    bird: { altitude: 0.6, width: 0.04, height: 0.06 },
    obstacles: {
      difficulty: Difficulty.EASY,
      gap: ObstaclesGap.NORMAL,
      obstacles: [
        {
          difficulty: Difficulty.EASY,
          position: 0.5,
          bottom: 0.3,
          top: 0.3,
          width: 0.1,
        },
      ],
    },
  });

  expect(g1.score.value).toBe(0);

  const g2: Game = Array(1000)
    .fill(0)
    .reduce((acc) => acc.animate(), g1);

  expect(g2.inCrash).toBe(false);
  expect(g2.score.value).toBe(1);
});
