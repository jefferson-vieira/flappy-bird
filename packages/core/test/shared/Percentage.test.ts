import Percentage from '../../src/shared/Percentage';

test('Deve criar um percentual entre 0 e 1', () => {
  const p = Percentage.new(0.25);
  expect(p.value).toBe(0.25);
});

test('Deve criar um percentual entre 0 e 2', () => {
  const p = Percentage.new(1.25, 'percentual', 0, 2);
  expect(p.value).toBe(1.25);
});

test('Deve clonar percentual', () => {
  const p1 = Percentage.new(1.25, 'percentual', 0, 2);
  const p2 = p1.clone({ attr: 'valor', max: 3 });
  expect(p2.value).toBe(1.25);
  expect(p2.attr).toBe('valor');
  expect(p2.min).toBe(0);
  expect(p2.max).toBe(3);
});

test('Deve lançar erro ao criar percentual maior que 1', () => {
  expect(() => Percentage.new(1.1)).toThrow(
    'O valor de percentual deve ser entre 0 e 1',
  );
});

test('Deve lançar erro ao criar percentual menor que 0', () => {
  expect(() => Percentage.new(-0.1)).toThrow(
    'O valor de percentual deve ser entre 0 e 1',
  );
});

test('Deve lançar erro ao criar percentual com valor nul', () => {
  expect(() => Percentage.new(null as any, 'valor')).toThrow(
    'O valor de valor é obrigatório',
  );
});
