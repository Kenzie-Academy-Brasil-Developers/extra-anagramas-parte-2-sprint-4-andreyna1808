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

// COMANDO PARA O ANAGRAMA DE 5 OU +
const getSetsOfFiveAnagrams = () => {
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

const containsExactly = (value, reference) => {
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

const lengthValidator =  (value, minLength, maxLength) => {
    return (value.length >= minLength && value.length <= maxLength)
}

// COMANDO PARA O ANAGRAMA DE 2 PALAVRAS
const get2WordsAnagrams = (value) => {
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

// COMANDO PARA O ANAGRAMA DE 3 PALAVRAS
// EM CONSTRUÇÃO! -- DIFICIL PACAS --- RACIOCINIO NAS ULTIMAS LINHAS


// LIMPAR OS TEXTOS
resetButton.addEventListener('click', function () {
    resultsDiv.innerHTML = ""
})

// COMANDO PARA O ANAGRAMA DE 3 PALAVRAS 
// PRECISA MELHORAR O DESEMPENHO PARA RODAR PALAVRAS GRANDES 
const get3WordsAnagrams = (value) => {
    let sortedWords = letras(value);
    let anagramSets = getSetsBySize(2, sortedWords.length -4);
    let anagramsArr = [];
    let usedAnagrams = [];

    for (let key in anagramSets) {

        if (containsExactly(key, sortedWords)){ 
            usedAnagrams.push(key)  
            let usedMiddleAnagram = []
            let firstSplicedWord = splicer(key, sortedWords);

            for (let secondKey in anagramSets) {

                if (secondKey.length <= firstSplicedWord.length - 2 && containsExactly(secondKey,firstSplicedWord) &&  !usedAnagrams.includes(secondKey)){
                    usedMiddleAnagram.push(secondKey)
                    let secondSplicedWord = splicer(secondKey, firstSplicedWord)

                    if (anagramSets[secondSplicedWord] !== undefined && !usedAnagrams.includes(secondSplicedWord) && !usedMiddleAnagram.includes(secondSplicedWord)) {
                        anagramsArr.push(`${anagramSets[key]} + ${anagramSets[secondKey]} + ${anagramSets[secondSplicedWord]}`)
                    };
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

// LIMPAR OS TEXTOS
resetButton.addEventListener('click', function () {
    resultsDiv.innerHTML = ""
})
