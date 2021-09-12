// CRONOMETRO --- Decidi não continuar, pois quando aperta na função o cronometro para;
let mm = 0;
let ss = 0;

let tempo = 1000;
let cron;

//Inicia o cronometro
function start() {
    cron = setInterval(() => { timer(); }, tempo);
}
//Para o cronometro 
function pause() {
    clearInterval(cron);
}
//Para o cronometro e limpa as variáveis
function stop() {
    clearInterval(cron);
    mm = 0;
    ss = 0;

document.getElementById('counter').innerText = '00:00';
}

//Faz a contagem do tempo e exibição
function timer() {
    ss++; 

    if (ss == 59) { ss = 0; mm++;}

    //Cria uma variável com o valor tratado HH:MM:SS
    let format = (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
    
    //Insere o valor tratado no elemento counter
    document.getElementById('counter').innerText = format;

    //Retorna o valor tratado
    return format;
}


// VARIÁVEIS 
const resultsDiv = document.getElementById('results');
const anagramas5 = document.getElementById("anagramas5");
const anagramas2 = document.getElementById('anagramas2');
const anagramas3 = document.getElementById('anagramas3');
const resetButton = document.getElementById('limpar')

const letras = (print) => {
return print.toLowerCase().split("").sort().join("").trim();
};

// TELA
const showResults = (resposta) => {
    const div = document.createElement('div');
    div.className = 'resultado';

    const anagrams = document.createElement('p');
    anagrams.innerText = resposta;

    div.appendChild(anagrams);
    resultsDiv.appendChild(div);
};

const getAnagramsSets = () => {
    let anagrama = {};

    for (let i = 0; i < palavras.length; i++) {
        let word = palavras[i];
        let respost = letras(word);

        if (anagrama[respost] === undefined) {
            anagrama[respost] = [word];
        }
        else {
            anagrama[respost].push(word);
        }
    };
   return anagrama;
};

const getSetsBySize = (minSize, maxSize) => {
    const anagramSets = getAnagramsSets()
    let filteredSets = {}

    for (let key in anagramSets) {

        if (key.length <= maxSize && key.length >= minSize) {
            filteredSets[key] = anagramSets[key]
        }
    }
    return filteredSets
}



// COMANDO PARA O ANAGRAMA DE 3 PALAVRAS 
// PRECISA MELHORAR O DESEMPENHO PARA RODAR PALAVRAS GRANDES 
// COMANDO PARA O ANAGRAMA DE 5 OU +
function getSetsOfFiveAnagrams(){
    let setsOfFive = [];
    let anagramSets = getAnagramsSets();

    for (let key in anagramSets) {

        if (anagramSets[key].length >= 5) {
            setsOfFive.push(anagramSets[key]);
        };
    };
    return JSON.stringify(setsOfFive);
};

anagramas5.addEventListener("click", function () {
    showResults(getSetsOfFiveAnagrams());
  });


//LÓGICA PARA 2 PALAVRAS
function containsExactly(value, reference){
    let contain = true;
    let newArray = reference.split('');

    for (let i = 0; i < value.length; i++) {
        if (newArray.indexOf(value[i]) === -1){
            contain = false
        };
        newArray.splice(newArray.indexOf(value[i]), 1);
    };
    return contain;
};

const splicer  = (value, stringToBeSpliced) => {
    let arrayToBeSpliced = stringToBeSpliced.split('');

    for (let index = 0; index < value.length; index++) {
        let letter = value[index];
        let letterIndex = arrayToBeSpliced.indexOf(letter);

        arrayToBeSpliced.splice(letterIndex, 1);
    };

    return arrayToBeSpliced.join('');
};

// COMANDO PARA O ANAGRAMA DE 2 PALAVRAS
function get2WordsAnagrams(value){
    let respost = letras(value);
    let anagramSets = getSetsBySize(2, respost.length - 2);
    let resultsArr = [];
    let usedAnagrams = [];

    for (let key in anagramSets) { 

        if (containsExactly(key, respost)){ 
            let splicedWord = splicer(key, respost);

            if (anagramSets[splicedWord] !== undefined && !usedAnagrams.includes(key)) {
                resultsArr.push(`${anagramSets[key]} + ${anagramSets[splicedWord]}`)
                usedAnagrams.push(key);
                usedAnagrams.push(splicedWord);
            };
        };  
    };
    return JSON.stringify(resultsArr);
};

anagramas2.addEventListener("click", function () {
    let typedText = document.getElementById("input").value;
    showResults(get2WordsAnagrams(typedText));
});

// LIMPAR OS TEXTOS
resetButton.addEventListener('click', function () {
    resultsDiv.innerHTML = ""
})

function get3WordsAnagrams(value){
    let sortedWords = letras(value);
    let anagramSets = getSetsBySize(2, sortedWords.length);
    let anagramsArr = [];
    let usedAnagrams = [];

    for (let key in anagramSets) {

        if (containsExactly(key, sortedWords)){ 
            usedAnagrams.push(key)  
            let letrasSep = splicer(key, sortedWords);

            for (let secondKey in anagramSets) {

                if (secondKey.length <= letrasSep.length - 2 && containsExactly(secondKey,letrasSep)){
                    let secondSplicedWord = splicer(secondKey, letrasSep)
                    anagramsArr.push(`${anagramSets[key]} + ${anagramSets[secondKey]} + ${anagramSets[secondSplicedWord]}`)
                }
            } 
        };  
    };
    return JSON.stringify(anagramsArr);
};

anagramas3.addEventListener("click", function () {
    let typedText = document.getElementById("input").value;
    showResults(get3WordsAnagrams(typedText));
});