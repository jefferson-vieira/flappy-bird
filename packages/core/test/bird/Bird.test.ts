import { Bird } from '../../src';

const props = {
  height: 0.05,
  width: 0.05,
  altitude: 0.5,
  weight: 0.002,
};

test('Deve criar um pássaro', () => {
  const p = new Bird(props);

  expect(p.height.value).toBe(0.05);
  expect(p.width.value).toBe(0.05);
  expect(p.altitude.value).toBe(0.5);
  expect(p.weight.value).toBe(0.002);
  expect(p.flying).toBe(false);
});

test('Deve alterar pássaro para voar', () => {
  const p1 = new Bird({ ...props, weight: undefined });
  const p2 = p1.startFlying();

  expect(p1.flying).toBe(false);
  expect(p2.flying).toBe(true);
});

test('Deve alterar pássaro para parar de voar', () => {
  const p1 = new Bird({ ...props, flying: true });
  const p2 = p1.stopFlying();

  expect(p1.flying).toBe(true);
  expect(p2.flying).toBe(false);
});

test('Deve animar pássaro diminuindo a altitude', () => {
  const p1 = new Bird(props);
  const p2 = p1.animate();

  expect(p2.altitude.value).toBeLessThan(p1.altitude.value);
});

test('Deve animar pássaro aumentando a altitude', () => {
  const p1 = new Bird({ ...props, flying: true });
  const p2 = p1.animate();

  expect(p2.altitude.value).toBeGreaterThan(p1.altitude.value);
});

test('Deve gerar erro se altitude maior que 1', () => {
  expect(() => new Bird({ ...props, altitude: 1.1 })).toThrow(
    'O valor de altitude deve ser entre 0 e 1',
  );
});

test('Deve gerar erro se altura maior que 1', () => {
  expect(() => new Bird({ ...props, height: 1.1 })).toThrow(
    'O valor de height deve ser entre 0.01 e 1',
  );
});

test('Deve gerar erro se altura zerada', () => {
  expect(() => new Bird({ ...props, height: 0 })).toThrow(
    'O valor de height deve ser entre 0.01 e 1',
  );
});
