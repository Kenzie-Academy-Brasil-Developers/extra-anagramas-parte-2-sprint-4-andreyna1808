# Extra: Anagramas Parte 2

Para começar faça clone deste [repositório](https://classroom.github.com/a/PeKHiS2a)

Lembre-se de que duas palavras são anagramas se elas tiverem as mesmas letras em ordem diferente.

Por exemplo, _"ator"_ e _"tora"_ são anagramas. Você começou a trabalhar com anagramas anteriormente na entrega Anagramas Parte 1. Refresque sua memória ao dar mais uma olhada na tarefa.

Hoje você irá enfrentará um problema mais desafiador envolvendo anagramas. Mais uma vez, você usará o dicionário de palavras disponível em [`palavras.js`](https://files-kenzie-academy-brasil.s3.us-east-1.amazonaws.com/words-pt-br.js) e a seguinte função para ajudá-lo a verificar se as palavras são anagramas:

```js
function alphabetize(a) {
  return a.toLowerCase().split("").sort().join("").trim();
}
```


Implemente uma função chamada `getSetsOfFiveAnagrams()` que **encontre e retorne** todos os conjuntos de 5 ou mais palavras em `palavras.js` que forem anagramas umas das outras, e imprima cada conjunto no DOM. Sua função deve criar um novo elemento, definir seu conteúdo de texto igual ao resultado, e adicionar o novo elemento ao seu html, antes de finalmente retornar um array de arrays aninhados, o que significa que você deve terminar com um grande array que contém arrays menores contendo conjuntos de anagramas. ** É importante seguir as instruções de nome da função para que os testes funcionem**

## Dicas

Precisamos testar se duas strings contém as mesmas letras em ordem diferente.

Lembre-se de como você usou a função `alphabetize()` para ordenar as letras alfabeticamente. Isso coloca as letras na ordem padrão, independentemente de como elas são originalmente ordenadas nas palavras. Você viu que:

`alphabetize("ator")` retorna `"aort"`

`alphabetize("rota")` retorna `"aort"`

`alphabetize("tora")` retorna `"aort"`

`alphabetize("rato")` retorna `"aort"`

`alphabetize("sapo")` retorna `"aops"`

`alphabetize("sopa")` retorna `"aops"`

A forma ordenada alfabeticamente será a mesma para cada palavra em um conjunto de anagramas. Você pode usar a forma alfabética como um identificador único de um conjunto de anagramas. Como um passo intermediário para resolver os problemas acima, tente usar um Objeto para agrupar conjuntos de anagramas mútuos ao criar uma estrutura de dados como esta:

```js
anagramSets = {
   "aort": ["ator", "rota", "rato", "tora"],
   "aops": ["sapo", "sopa", ... ],
   ...
};
```

Então você pode fazer o loop das três entradas de anagramSets e exibir aquelas que tiverem 5 ou mais palavras.

---

## Bônus

Como desafio extra, tente resolver estes problemas mais difíceis:

**Encontrando anagramas de duas palavras:** _Permita que o usuário insira uma palavra ou frase em uma caixa de texto e busque por anagramas de duas palavras (ignorando os espaços)._

```
rato ana
(8 combinações)
ao + antar,tanar
aro,ora + anta,nata
ata + Anor,Arno,Aron,nora
atar,tara + Ano,ano,noa
ator,atro,rato,rota,taro,toar,tora + Ana,ana
na + aorta,Arato
nara,rana + Ato,ato,tao,toa
Roana + At
```

**Encontrando anagramas de três palavras:** _Busque anagramas de três palavras de uma frase fornecida pelo usuário._

```
bau bola
(21 combinações)
ab,Ba + ABL,bal,LBA + ou
ab,Ba + abu,bau,UAB + lo
ab,Ba + ao + Blu,bul
ab,Ba + Blu,bul + ao
	...
```

```
sapo grande
(985 combinações)
ad,da + agenor,enogar,Genaro,gerano,gerona,negroa,onagre,orange,regano + ps,sp
ad,da + agno + REsp
ad,da + angor,argon,gonar,nagor,nargo,ronga + EPS
ad,da + ANP,Pan,pan + regos
ad,da + ANS,nas,SNA + grepo,prego
ad,da + apre,pear,pera,repa + ONGs
   ...
```

```
Davis Peixoto
(3291 combinações)
ad,da + epos,peso,PSOE,sepo,sope + xivito
ad,da + Ex,ex,Xe + positivo
ad,da + exitoso + vip,VPI
ad,da + exotipo,peixoto + SIV,vis
ad,da + exposto + VII
ad,da + optose + XVII
   ...
```

## Critério de aceitação

Caso o resultado não seja exibido em menos de **60 segundos**, sua entrega não será corrigida e a pontuação será zerada.

## Envio

Faça o push do código para o seu repositório GitHub, altere a visibilidade do repositório para internal e implemente-o GitHub pages. No Canvas, por favor, envie sua url do GitHub Pages: (ex:https://nomerandomico.pages.github.io/) e envie o link do seu repositório nos comentários. Atenção, seu repositório deverá ser compartilhado apenas com a organização. (Internal) 

