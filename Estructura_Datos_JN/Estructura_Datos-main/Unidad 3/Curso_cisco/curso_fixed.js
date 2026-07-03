function print(name, value) {
  console.log(`${name}: ${value} [${typeof value}]`);
}

const b1 = true;
const b2 = Boolean(true);

const n1 = 100;
const n2 = Number(200);

const bi1 = 100n;
const bi2 = BigInt(200);

const s1 = "Hello";
const s2 = String("Hello");

const u1 = undefined;

print('b1', b1);
print('b2', b2);
print('n1', n1);
print('n2', n2);
print('bi1', bi1);
print('bi2', bi2);
print('s1', s1);
print('s2', s2);
print('u1', u1);

const text = "1234";
const number = Number(text);
const bigInt = BigInt(number);
const boolean = Boolean(bigInt);
print('boolean (from BigInt)', boolean);

// Operaciones simples
print('true + false', true + false);
print('100 + 200', 100 + 200);
print('100n + 200n', 100n + 200n);
print('\"He\" + \"llo\"', "He" + "llo");
print('undefined + undefined', undefined + undefined);

// Concatenaciones y coerciones
print('true + 100', true + 100);
print('true + "100"', true + "100");
print('100 + true', 100 + true);
print('100 + "200"', 100 + "200");

print('100n + "200" (BigInt + string -> concatenation)', 100n + "200");
print('\"100\" + 200', "100" + 200);
print('\"100\" + 200n', "100" + 200n);
print('\"100\" + true', "100" + true);

print('\"abc\" + 200', "abc" + 200);
print('\"abc\" + 200n', "abc" + 200n);
print('\"abc\" + true', "abc" + true);

// Mostrar mezcla peligrosa BigInt + Number con manejo
try {
  // Esto lanza TypeError en tiempo de ejecución
  // (descomenta para ver el error sin catch)
  const bad = 100n + 200;
  print('100n + 200', bad);
} catch (e) {
  console.log('Error: mezclar BigInt y Number sin conversión:', e.message);
}

// Soluciones: convertir explícitamente
print('Number(100n) + 200', Number(100n) + 200);
print('100n + BigInt(200)', 100n + BigInt(200));

const result = 42 + +"1"; // el operador + unario convierte "1" a número
print('42 + +"1"', result);

// Helper seguro para sumar BigInt/Number con conversión explícita
function safeAdd(a, b) {
  if (typeof a === 'bigint' && typeof b === 'number') return a + BigInt(b);
  if (typeof a === 'number' && typeof b === 'bigint') return BigInt(a) + b;
  return a + b;
}

print('safeAdd(100n, 200)', safeAdd(100n, 200));
print('safeAdd(100, 200n)', safeAdd(100, 200n));
