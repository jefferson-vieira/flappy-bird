import { Difficulty, Obstacle } from '../../src';

test('Deve criar um obstaculo', () => {
  const obstaculo = Obstacle.new({
    difficulty: Difficulty.EASY,
    position: 0.5,
  });

  expect(obstaculo.difficulty).toBe(Difficulty.EASY);
});

test('Deve diminuir o vão para os níveis mais difíceis', () => {
  const o1 = Obstacle.new({ difficulty: Difficulty.EASY, position: 0.5 });
  const o2 = Obstacle.new({ difficulty: Difficulty.MEDIUM, position: 0.5 });
  const o3 = Obstacle.new({ difficulty: Difficulty.HARD, position: 0.5 });
  const o4 = Obstacle.new({ difficulty: Difficulty.JEDI, position: 0.5 });

  expect(o1.gap.value).toBeGreaterThan(o2.gap.value);
  expect(o2.gap.value).toBeGreaterThan(o3.gap.value);
  expect(o3.gap.value).toBeGreaterThan(o4.gap.value);
});

test('Deve animar obstaculo diminuindo a posição', () => {
  const o1 = Obstacle.new({ difficulty: Difficulty.EASY, position: 0.5 });
  const o2 = o1.animate();

  expect(o2.position.value).toBeLessThan(o1.position.value);
});

test('Deve gerar erro quando não informar a posição', () => {
  expect(() => Obstacle.new()).toThrow('O valor de position é obrigatório');
});

test('Deve novo erro ao usar dados incompatíveis', () => {
  expect(() =>
    Obstacle.new({
      bottom: 0.1,
      top: 0.1,
      difficulty: Difficulty.JEDI,
      position: 0.5,
      width: 0.1,
    }),
  ).toThrow('O vão entre os obstáculos deve ser de 15%');
});
