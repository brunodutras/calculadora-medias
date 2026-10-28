const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const mensagem = document.querySelector('#mensagem');
const mediaTexto = document.querySelector('#media');
const situacaoTexto = document.querySelector('#situacao');

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  mensagem.textContent = '';
  try {
    const { media, situacao } = Calculadora.calcularMedia(
      formulario.elements.nota1.value, formulario.elements.nota2.value
    );
    mediaTexto.textContent = media.toLocaleString('pt-BR', { maximumFractionDigits: 10 });
    situacaoTexto.textContent = situacao === 'Aprovado'
      ? 'Aprovado! Parabéns pelo resultado.'
      : 'Reprovado. Continue estudando!';
    resultado.dataset.situacao = situacao;
    resultado.hidden = false;
  } catch (erro) {
    resultado.hidden = true;
    mensagem.textContent = erro.message;
  }
});
formulario.addEventListener('reset', () => {
  resultado.hidden = true;
  mensagem.textContent = '';
});
formulario.addEventListener('input', () => {
  resultado.hidden = true;
  mensagem.textContent = '';
});
