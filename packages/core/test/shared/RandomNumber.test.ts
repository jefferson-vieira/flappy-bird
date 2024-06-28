import RandomNumber from '../../src/shared/RandomNumber';

test('Deve gerar um número aleatório', () => {
  const num = new RandomNumber(0.25, 0.75);

  expect(num.value).toBeGreaterThanOrEqual(0.25);
  expect(num.value).toBeLessThanOrEqual(0.75);
});

test('Deve gerar erro se min for maior que max', () => {
  expect(() => new RandomNumber(1, 0)).toThrow(
    'O valor mínimo deve ser menor que o valor máximo',
  );
});
