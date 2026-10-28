// Regra didática: duas notas de 0 a 10, com aprovação a partir de 7.
(function (root) {
  function converterNota(valor) {
    if (typeof valor !== 'number' && typeof valor !== 'string') {
      throw new Error('Informe uma nota válida.');
    }
    const texto = String(valor).trim().replace(',', '.');
    if (!/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(texto)) {
      throw new Error('Preencha as duas notas com números de 0 a 10.');
    }
    const nota = Number(texto);
    if (!Number.isFinite(nota) || nota < 0 || nota > 10) {
      throw new Error('As notas devem estar entre 0 e 10.');
    }
    return nota;
  }

  function calcularMedia(primeiraNota, segundaNota) {
    const media = (converterNota(primeiraNota) + converterNota(segundaNota)) / 2;
    // A classificação usa a média real, antes de arredondar a exibição.
    return { media, situacao: media >= 7 ? 'Aprovado' : 'Reprovado' };
  }

  const api = { converterNota, calcularMedia };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Calculadora = api;
})(globalThis);
