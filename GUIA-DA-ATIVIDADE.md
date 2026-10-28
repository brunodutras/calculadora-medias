# Guia da atividade e da apresentação

## 1. Conferir a calculadora

Extraia o ZIP e abra `index.html`. Experimente 8 e 6 (média 7, aprovado), 5 e 6 (média 5,5, reprovado), notas com vírgula e entradas inválidas. Teste também Limpar notas.

## 2. Criar o repositório

No GitHub, crie um repositório público chamado `calculadora-medias`, vazio: não marque a criação de README, licença ou .gitignore, pois o projeto já contém seus arquivos.

Antes de enviar, configure **Settings → Pages → Build and deployment → Source → GitHub Actions**. Se essa opção ainda não estiver disponível no repositório vazio, configure depois do primeiro push e execute novamente a pipeline pela aba Actions.

No terminal, entre na pasta extraída. Substitua os exemplos de nome, email e usuário abaixo pelos seus dados. Use seu email GitHub ou email noreply do seu perfil.

```bash
git config --global user.name "Seu Nome"
git config --global user.email "SEU_EMAIL"
git init -b main
git add .
git commit -m "chore: inicia calculadora com pipeline CI/CD"
git remote add origin https://github.com/SEU_USUARIO/calculadora-medias.git
git push -u origin main
git switch -c develop
git push -u origin develop
```

Use a autenticação do GitHub disponibilizada no seu computador, como GitHub CLI ou gerenciador de credenciais. Não coloque senha ou token nos arquivos ou na URL do repositório.

**Atenção:** o workflow fica dentro de `.github/workflows/`. Essa pasta começa com ponto e pode estar oculta. O `git add .` inclui a pasta; não envie somente os arquivos visíveis.

## 3. Conferir a pipeline

Abra **Actions → CI/CD - Calculadora de médias**. Veja os jobs Build, Testes e Deploy no GitHub Pages. Na main, todos devem concluir; na develop, o Deploy aparece ignorado porque só publicamos a main.

Se Pages não estava configurado no primeiro push, configure-o e use **Actions → CI/CD - Calculadora de médias → Run workflow → main**. A execução manual depende de o workflow já existir na branch padrão.

O link do site aparece no ambiente `github-pages`, no job de deploy e em Settings → Pages. Abra o link e teste a calculadora publicada.

Se o deploy falhar, leia o erro do job: confira a origem GitHub Actions em Pages e as permissões/restrições do ambiente `github-pages`. Um problema de configuração de publicação não significa que os testes de cálculo falharam.

## 4. Demonstrar uma feature

Use como funcionalidade nova a exibição de uma mensagem de parabéns para quem passar.

```bash
git switch develop
git pull origin develop
git switch -c feature/mensagem-aprovacao
```

Em `src/app.js`, substitua:

```javascript
situacaoTexto.textContent = situacao;
```

por:

```javascript
situacaoTexto.textContent = situacao === 'Aprovado'
  ? 'Aprovado! Parabéns pelo resultado.'
  : 'Reprovado. Continue estudando!';
```

Confira no navegador e rode os comandos:

```bash
npm run check
npm run build
npm test
git add src/app.js
git commit -m "feat: adiciona mensagem conforme o resultado"
git push -u origin feature/mensagem-aprovacao
```

Abra um Pull Request com **base: develop**, **compare: feature/mensagem-aprovacao**. Mostre a pipeline e faça o merge depois de os checks passarem. Prefira **Create a merge commit**, para preservar o histórico das branches. Em um projeto individual, não dependa de aprovar seu próprio PR como revisor.

## 5. Demonstrar uma release

```bash
git switch develop
git pull origin develop
git switch -c release/1.0.0
```

Acrescente uma seção `## Versão 1.0.0` ao README, informando que é a primeira versão com cálculo, validação e publicação automatizada.

```bash
git add README.md
git commit -m "docs: prepara release 1.0.0"
git push -u origin release/1.0.0
```

Abra PR de `release/1.0.0` para `main`, espere os checks e faça o merge com **Create a merge commit**. Mostre a pipeline publicando o site. Abra também PR da mesma release para `develop`, faça o merge e só então considere remover a branch de release.

Crie a tag na main atualizada:

```bash
git switch main
git pull origin main
git tag -a v1.0.0 -m "Primeira versão da calculadora"
git push origin v1.0.0
```

O push da main dispara a publicação. Este workflow não dispara por tag.

## 6. Demonstrar um hotfix

Simule uma correção urgente de clareza no texto da interface publicada.

```bash
git switch main
git pull origin main
git switch -c hotfix/texto-regra
```

No `index.html`, substitua `De 0 a 10` por `De 0 a 10, inclusive` nos dois campos. Assim, fica explícito que os extremos são válidos.

```bash
git add index.html
git commit -m "fix: esclarece os limites aceitos nas notas"
git push -u origin hotfix/texto-regra
```

Abra PR do hotfix para `main`, aguarde os checks e faça o merge. Depois abra PR do mesmo hotfix para `develop` e faça o merge. Não exclua a branch antes de concluir os dois PRs. Atualize a main local, crie a tag `v1.0.1` e envie-a, como na release anterior.

## 7. Demonstrar um teste falhando

Faça esta demonstração em uma branch separada, sem fazer merge.

```bash
git switch develop
git pull origin develop
git switch -c feature/demo-falha
```

Em `src/calculadora.js`, troque temporariamente `media >= 7` por `media > 7`. Essa mudança incorreta reprova quem tirou exatamente 7.

```bash
git add src/calculadora.js
git commit -m "test: demonstra regressao no limite de aprovacao"
git push -u origin feature/demo-falha
```

Mostre em Actions: Build passa e Testes falha. O job Deploy é ignorado; nesta branch ele também é impedido pela condição de publicar somente a main. Para explicar o bloqueio por testes na main, mostre o `needs: test` no workflow, sem enviar código defeituoso para produção.

Restaure `media >= 7`, faça outro commit e push. Mostre os testes passando novamente. Não faça merge da demonstração.

## 8. Fala sugerida

“Este projeto calcula a média de duas notas. A pipeline prepara o site, executa testes automatizados e publica no GitHub Pages quando a alteração chega à main. As dependências entre os jobs impedem que uma etapa avance após falha na anterior. No Gitflow, uso develop para integrar funcionalidades, feature para mudanças novas, release para preparar versões e hotfix para corrigir a versão publicada.”

Mostre, nesta ordem: aplicação, README, branches e PRs, arquivo da pipeline, execução aprovada, execução com falha e correção. Para mostrar o histórico no terminal:

```bash
git fetch --all
git log --oneline --graph --all --decorate
```

O link a entregar no Blackboard é o do repositório público. O link do site é um complemento para a apresentação.
