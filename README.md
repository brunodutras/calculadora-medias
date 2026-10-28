# Calculadora de médias

Projeto acadêmico para demonstrar Gitflow e uma pipeline CI/CD no GitHub Actions.
Calcula a média de duas notas entre 0 e 10. Aprova com média maior ou igual a 7; abaixo disso, reprova. Essa é uma regra didática do projeto, não uma regra oficial da instituição.

## Versão 1.0.0

Primeira versão com cálculo da média de duas notas, validação das entradas e publicação automatizada no GitHub Pages.

- **Cálculo:** média aritmética de duas notas entre 0 e 10, com aprovação a partir de 7, antes de arredondamentos.
- **Validação:** aceita vírgula ou ponto decimal e rejeita campos vazios, textos e valores fora do intervalo.
- **Mensagens de resultado:** exibe “Aprovado! Parabéns pelo resultado.” ou “Reprovado. Continue estudando!”, conforme a média.
- **Pipeline:** o GitHub Actions verifica a sintaxe, prepara o site e executa os testes sobre o artefato gerado. A publicação ocorre somente na `main`, após os testes passarem e fora de Pull Requests.

## Executar

Para usar a calculadora, abra `index.html` no navegador. Não precisa instalar dependências.

Para verificar o projeto, instale Node.js 22 ou superior e execute na pasta do projeto:

```bash
npm run check
npm run build
npm test
```

Os testes dependem do build e validam o JavaScript de `dist/`, o mesmo artefato publicado. O build de um site estático prepara os arquivos de publicação; não há compilação de HTML/CSS.

## Exemplos

| Nota 1 | Nota 2 | Média | Situação |
|---|---|---|---|
| 8 | 6 | 7 | Aprovado |
| 5 | 6 | 5,5 | Reprovado |
| 8,5 | 7,5 | 8 | Aprovado |

São aceitas notas com vírgula ou ponto. Campos vazios, textos e notas fora de 0 a 10 exibem uma mensagem de erro. A classificação usa a média antes de arredondamentos.

## Estrutura

- `index.html` e `style.css`: interface.
- `src/calculadora.js`: cálculo e validação.
- `src/app.js`: interação com o formulário.
- `tests/calculadora.test.cjs`: seis testes automatizados.
- `scripts/build.cjs`: preparação de `dist/`.
- `.github/workflows/pipeline.yml`: pipeline.
- `GUIA-DA-ATIVIDADE.md`: configuração do GitHub e roteiro da apresentação.

## Pipeline

A cada push nas branches previstas ou Pull Request para `main`/`develop`:

1. **Build:** verifica a sintaxe, prepara os arquivos e salva o artefato.
2. **Testes:** baixa e testa o artefato produzido pelo build.
3. **Deploy:** publica no GitHub Pages somente na `main`, após os testes passarem, fora de eventos de Pull Request.

Os jobs usam `needs` para execução sequencial. Se Build falhar, Testes e Deploy são ignorados; se Testes falhar, Deploy é ignorado. Em outras branches, Deploy é ignorado por condição, mesmo com testes aprovados.

Para publicar, configure **Settings → Pages → Source → GitHub Actions** antes do primeiro push. Se o ambiente `github-pages` tiver restrições de branch, permita a `main`.

## Gitflow

`main` mantém a versão publicada; `develop` integra o desenvolvimento. Features partem de `develop` e voltam para ela. Releases partem de `develop` e são integradas em `main` e `develop`. Hotfixes partem de `main` e são integrados em `main` e `develop`.

O commit inicial cria a base; depois disso, as mudanças entram por branches e Pull Requests. Não é necessário instalar uma extensão `git-flow` para praticar esse fluxo.

## Limites da verificação

Os testes automatizados verificam a regra de negócio e as entradas. Não são testes completos de navegador. O workflow foi preparado para GitHub Actions; sua execução remota e publicação precisam ser conferidas na aba Actions após enviar o repositório.
