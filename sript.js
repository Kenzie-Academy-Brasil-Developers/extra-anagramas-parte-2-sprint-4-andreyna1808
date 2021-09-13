// CRONOMETRO --- 
let digitalElement = document.querySelector('.digital');
let sElement = document.querySelector('.p_s');
let mElement = document.querySelector('.p_m');
let hElement = document.querySelector('.p_h');

function updateClock(){
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    digitalElement.innerHTML = `${doiszeros(hour)}:${doiszeros(minute)}:${doiszeros(second)}`;
}

function doiszeros(time){
    if(time < 10){
        return '0' + time;
    }
    else {
        return time;
    }
}
setInterval(updateClock, 1000);
updateClock();


// VARIÁVEIS DO ANAGRAMAS
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

const tamanho = (minSize, maxSize) => {
    const conjutos = getAnagramsSets()
    let filteredSets = {}

    for (let key in conjutos) {

        if (key.length <= maxSize && key.length >= minSize) {
            filteredSets[key] = conjutos[key]
        }
    }
    return filteredSets
}

//LÓGICA
function conteudo_(valor, reference){
    let contain = true;
    let newArray = reference.split('');

    for (let i = 0; i < valor.length; i++) {
        if (newArray.indexOf(valor[i]) === -1){
            contain = false
        };
        newArray.splice(newArray.indexOf(valor[i]), 1);
    };
    return contain;
};

const splicer  = (valor, stringToBeSpliced) => {
    let arrayToBeSpliced = stringToBeSpliced.split('');

    for (let i = 0; i < valor.length; i++) {
        let letter = valor[i];
        let letterIndex = arrayToBeSpliced.indexOf(letter);

        arrayToBeSpliced.splice(letterIndex, 1);
    };

    return arrayToBeSpliced.join('');
};

// COMANDO PARA O ANAGRAMA DE 2 PALAVRAS
function anagramTwo(valor){
    let respost = letras(valor);
    let conjutos = tamanho(2, respost.length - 2);
    let resultsArr = [];
    let usoAnagram = [];

    for (let key in conjutos) { 

        if (conteudo_(key, respost)){ 
            let splicedWord = splicer(key, respost);

            if (conjutos[splicedWord] !== undefined && !usoAnagram.includes(key)) {
                resultsArr.push(`${conjutos[key]} + ${conjutos[splicedWord]}`)
                usoAnagram.push(key);
                usoAnagram.push(splicedWord);
            };
        };  
    };
    return JSON.stringify(resultsArr);
};

anagramas2.addEventListener("click", function () {
    let typedText = document.getElementById("input").value;
    showResults(anagramTwo(typedText));
});

// COMANDO PARA 3 PALAVRAS - COM ATÉ 14 LETRAS
function anagramthree(valor){
    let palavras_ord = letras(valor);
    let conjutos = tamanho(2, palavras_ord.length);
    let Anagramas = [];
    let usoAnagram = [];

    for (let key in conjutos) {

        if (conteudo_(key, palavras_ord)){ 
            usoAnagram.push(key)  
            let usedMiddleAnagram = []
            let letrasSep = splicer(key, palavras_ord);

            for (let secondKey in conjutos) {

                if (secondKey.length <= letrasSep.length - 3 && conteudo_(secondKey,letrasSep)){
                    usedMiddleAnagram.push(secondKey)
                    let secondSplicedWord = splicer(secondKey, letrasSep)
                    Anagramas.push(`${conjutos[key]} + ${conjutos[secondKey]} + ${conjutos[secondSplicedWord]}`)
                    };
                }
        };  
    };
    return JSON.stringify(Anagramas);
};

anagramas3.addEventListener("click", function () {
    let typedText = document.getElementById("input").value;
    showResults(anagramthree(typedText));
});

// COMANDO PARA O ANAGRAMA DE 5 OU +
function anagramFive(){
    let setsOfFive = [];
    let conjutos = getAnagramsSets();

    for (let key in conjutos) {

        if (conjutos[key].length >= 5) {
            setsOfFive.push(conjutos[key]);
        };
    };
    return JSON.stringify(setsOfFive);
};

anagramas5.addEventListener("click", function () {
    showResults(anagramFive());
  });


// LIMPAR OS TEXTOS
resetButton.addEventListener('click', function () {
    resultsDiv.innerHTML = ""
})
