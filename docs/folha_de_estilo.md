[1. Formatação](#1-formatação)<br />
[2. Variáveis e Funções](#2-variável-e-função)<br />
[3. Comentários](#3-comentários)<br />
[4. Classe](#4-classe)<br />
[5. Interface](#5-interface)<br />
[6. Namespace](#6-namespace)<br />
[7. Enum](#7-enum)<br />
[8. `null` vs. `undefined`](#8-null-vs-undefined)<br />
[9. Array](#9-array)<br />
[10. Parenteses](#10-parenteses)<br />
[11. Chaves](#11-chaves)<br />
[12. Operações](#12-operações-matemáticas)<br />

## 1. Formatação
 1.1. O código deve ser indentado com tabs, utilizando um tab (tamanho 2) para cada nível de indentação ou 2 espaços. <br/>
 1.2. O espaço entre dois blocos de código deve ser de apenas uma linha em branco (um enter). <br />
 1.3. É importante que a indentação dentro das chaves seja correta<br/>

1.3.1. Exemplo:<br />
**Não recomendado**
```ts
function algumaFuncao(a, b) {
var c = 1;
return inner;
}
```

**Recomendado**
```ts
function algumaFuncao(a, b) {
    var c = 1,
        d = 2,
        inner;
    if (a > b) {
        inner = function() {
        return {
            r: c - d
        };
    };
    } else {
        inner = function () {
            return {
                r: c + d
            };
        };
    }
    return inner;
}
```
1.4. O construtor deve estar formatado desta forma:
```ts
 constructor(
    private router: Router,
    private requester: RequestsService,
    private cookieService: CookieService,
    private token: TokenService,
    private validator: InputValidatorService
  ) { }
```

## 2. Variável e Função
* Use `camelCase` para nome de funçoẽs e variáveis.

**Não recomendado**
```ts
var FooVar;
function BarFunc() { }
```
**Recomendado**
```ts
var fooVar;
function barFunc() { }
```

* Use uma única declaração para cada variável quando inicializar a mesma. 

**Não recomendado**
```ts
var x = 1; var y = 2
```
**Recomendado**
```ts
var x = 1, y = 2;
```
## 3. Comentários
* Os comentários em blocos: `Classes` e `Métodos`, devem ser feitos da seguinte forma:

**Recomendado**
```ts
/**
  *  Comentários
  *  aqui dentro.
  */
```

**Não recomendado**
```ts
  //  Comentários
  //  aqui dentro.
```

* Os comentários simples, devem ser feitos da seguinte forma:

**Recomendado**
```ts
/* Comentário aqui dentro. */
```

**Não recomendado**
```ts
  //  Comentário aqui dentro.
```

## 4. Classe
* Use `PascalCase` para nome de classes.

**Não recomendado**
```ts
class foo { }
```
**Recomendado**
```ts
class Foo { }
```
* Use `camelCase` para 'class member' e métodos.

**Não recomendado**
```ts
class Foo {
    Bar: number;
    Baz() { }
}
```
**Recomendado**
```ts
class Foo {
    bar: number;
    baz() { }
}
```
## 5. Interface

* Use `PascalCase` para nomes.


* **Não** use `I` no começo do nome.


**Não recomendado**
```ts
interface IFoo {
}
```
**Recomendado**
```ts
interface Foo {
}
```

## 6. Namespace

* Use `PascalCase` para nomes.

**Não recomendado**
```ts
namespace foo {
}
```
**Recomendado**
```ts
namespace Foo {
}
```

## 7. Enum

* Use `PascalCase` para nomes em enums.

**Não recomendado**
```ts
enum color {
}
```
**Recomendado**
```ts
enum Color {
}
```

* Use `PascalCase` para enum member

**Não recomendado**
```ts
enum Color {
    red
}
```
**Recomendado**
```ts
enum Color {
    Red
}
```

## 8. Null vs. Undefined

* De preferência não use nenhum dos dois.

**Não recomendado**
```ts
let foo = {x:123,y:undefined};
```
**Recomendado**
```ts
let foo:{x:number,y?:number} = {x:123};
```

* Use checagem *truthy* para **objetos** que possam ser `null` or `undefined`

**Não recomendado**
```ts
if (error === null)
```
**Recomendado**
```ts
if (error)
```

* Use `== undefined` / `!= undefined` (e não `===` / `!==`) para checar estados `null` / `undefined`. Nunca use outros valores para verificar (exemplo: `''`,`0`,`false`) e.g.

**Não recomendado**
```ts
if (error !== null)
```
**Recomendado**
```ts
if (error != undefined)
```

## 9. Array

* Para arrays faça `foos:Foo[]` em vez de `foos:Array<Foo>`.

## 10. Parenteses

* Não deixe espaços na parte de dentro do parenteses.

**Não recomendado**
```ts
if ( x < 10 ) 
```
**Recomendado**
```ts
if (x < 10) 
```

## 11. Chaves

* Após o uso das estruturas condicionais e metodos, deve se aplicar espaço antes de abrir chaves(ex: {}).
* A primeira chave deve permanecer na mesma linha do operador.
* 'else' deve estar entre chaves, e com espaço separando.

**Não recomendado**
```ts
if(variavel = 0)
{  
   // código
}
else
{
   // código 
}
```
**Recomendado**
```ts
if(variavel = 0) {  
   // código
} else {
   // código 
}
```
* Quando dentro de colchetes, cada bloco deve ser separado com um enter, deixando as chaves em cada linha

**Não recomendado**
```ts
datasets: [{
   label: a,
   data: b,},
   { label: c,
   data d,}
]
```

**Recomendado**
```ts
datasets: [
    {
        label: a,
        data: b,
    },
    {
        label: c,
        data: d,
    }
]
```

## 12. Operações Matemáticas

* Deve-se colocar espaço entre operadores.

**Não recomendado**
```ts
variavel=(1+2)*3;
```
**Recomendado**
```ts
variavel = (1 + 2) * 3;
```