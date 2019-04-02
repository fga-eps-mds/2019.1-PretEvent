# Contribuindo com o projeto

Coisas nas quais você pode ajudar:
 - [Documentação](#documentacao)
 - [Criação de novas features](#novas-features)
 - [Issues](#issues)
     - [Bugs](#bugs)
     - [Sugestões de melhoria](#sugestoes-de-melhoria)

## Fluxo de trabalho

Todos os contribuidores do projeto devem seguir os seguintes passos:

 1. Puxe uma *branch* com base na *branch* *development*
 2. Nomeie a *branch* conforme as [políticas de branches](#politicas-de-branches)
 3. Trabalhe nas suas mudanças nesta branch
 4. Crie um pull request para o repositório
 5. A integração contínua irá verificar as suas alterações
 6. Um mantenedor do projeto irá avaliar e realizar o merge da sua contribuição

## Desenvolvendo

  1. Clone o repositório
  ```bash
  git clone https://github.com/fga-eps-mds/2019.1-Eventte.git
  ```
  2. Abra o projeto [2019.1-Eventte](https://github.com/fga-eps-mds/2019.1-Eventte) no editor de texto de sua preferência
  3. Faça as suas contribuições

## Politicas de Branches
As *branches* devem ser nomeadas conforme o que será desenvolvido:
* Para novas ***features***, a *branch* deverá ser nomeada seguindo o seguinte padrão:
```
feature/usx
```
em que 'X' é a US da *issue*.

* Para **correção de *bugs***, a *branch* deverá ser nomeada seguindo o seguinte padrão: 
```
bug/id
```
em que 'id' é o número que identifica a *issue* no GitHub.

* Para **pequenas correções**, a *branch* deverá ser nomeada seguindo o seguinte padrão:
```
hotfix/id
```
em que 'id' é o número que identifica a *issue* no GitHub.

* Para **envio de documentação**, a *branch* deverá ser nomeada seguindo o seguinte padrão:
```
docs/nome
```
em que 'nome' é o nome do artefato.

## Políticas de *Commits*
Os *commits* devem ser atômicos e a mensagem do *commit* deve ser clara e objetiva e no idioma português.
## Documentação

Mais documentação é algo que você pode contribuir de forma simples:

  1. Clone o repositório
  ```bash
  git clone https://github.com/fga-eps-mds/2019.1-Eventte.git
  ```  
  2. Acesse a pasta docs
  ```bash
  cd 2019.1-Grupo-9
  ```
  3. Edite ou crie novas documentações e salve-as na pasta correspondente

## Criação de novas features

Para a criação de novas features, siga os seguintes passos:

  1. Crie uma issue com o template de *feature*
  2. Insira *labels* que estejam relacionados com a *issue* criada
  3. Aguarde o feedback de algum mantenedor que irá validar a *feature* sugerida
  4. Caso o *feedback* for positivo, dê *assign* da *issue* para você mesmo
  5. Inicie o desenvolvimento
  6. No pull request, faça o *link* do *pull request* com a *issue* criada previamente
  7. Aguarde a resposta do *pull request*

## Issues

Você pode contribuir criando novas *issues* ou corrigindo *issues* existentes

#### *Bugs*
Caso encontre algum bug no projeto, sinta-se à vontade para criar uma *issue* nos reportando:

  1. Crie a *issue* seguindo o template de **Reportar *Bugs***
  2. Insira _labels_ que estejam relacionados com a *issue* criada
  3. Aguarde *feedback* de um mantenedor

#### Sugestões de melhoria
Caso tenha alguma sugestão de melhoria ou *feature* siga os seguintes passos:

  1. Crie a *issue* seguindo um dos templates disponíveis no campo de criação da *issue*
  2. Insira _labels_ que estejam relacionados com a *issue* criada
  3. Aguarde *feedback* de um mantenedor
  4. Caso queira contribuir com a implementação, verifique os passos para a [criação de novas features](#criacao-de-novas-features)

## Atribuição

Este documento é uma adaptação do artefato do projeto [opsdroid](https://github.com/opsdroid/opsdroid), acessado em 19 de março de 2019.
