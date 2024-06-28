import Score from '../../src/shared/Score';

test('Deve criar pontuação maior que zero', () => {
  const p = Score.new(2);

  expect(p.value).toBe(2);
  expect(p.attr).toBe('pontuação');
});

test('Deve criar pontuação zero', () => {
  const p = Score.new(0);

  expect(p.value).toBe(0);
});

test('Deve incrementar a pontuação', () => {
  const p1 = Score.new(0);
  const p2 = p1.increment();

  expect(p1.value).toBe(0);
  expect(p2.value).toBe(1);
});

test('Deve lançar erro ao criar pontuação nula', () => {
  expect(() => new Score({})).toThrow('O valor de pontuação é obrigatório');
});

test('Deve lançar erro ao criar pontuação negativa', () => {
  expect(() => Score.new(-1)).toThrow(
    'O valor de pontuação não pode ser negativo',
  );
});
