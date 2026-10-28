const { test } = require('node:test');
const assert = require('node:assert/strict');
// Testamos o código do artefato que será publicado.
const { calcularMedia } = require('../dist/src/calculadora.js');
test('calcula a média aritmética', () => {
  assert.deepEqual(calcularMedia(8, 6), { media: 7, situacao: 'Aprovado' });
});
test('aprova exatamente no limite 7', () => {
  assert.equal(calcularMedia(7, 7).situacao, 'Aprovado');
});
test('reprova abaixo de 7, sem arredondar antes da classificação', () => {
  assert.equal(calcularMedia(6.99, 7).situacao, 'Reprovado');
});
test('aceita vírgula, ponto e espaços nas notas', () => {
  assert.equal(calcularMedia(' 8,5 ', '7.5').media, 8);
});
test('aceita os limites 0 e 10', () => {
  assert.equal(calcularMedia(0, 0).media, 0);
  assert.equal(calcularMedia(10, 10).media, 10);
});
test('rejeita campos vazios, textos e valores fora do intervalo', () => {
  for (const nota of ['', ' ', 'abc', -1, 11, null, undefined, NaN, Infinity, true, '0xA', '1,2,3']) {
    assert.throws(() => calcularMedia(nota, 7));
    assert.throws(() => calcularMedia(7, nota));
  }
});
