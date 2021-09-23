// todas terão esse exemplo é o principal == 
let anagramas = {};

    for (let j = 0; j < palavras.length; j++) {
        let originalName = palavras[j];
        let alphabetizeName = alphabetize(originalName);

// Dar exemplos como o aort, rato, tora e anta
        if (anagramas[alphabetizeName] === undefined) {
            anagramas[alphabetizeName] = [originalName];
        }
        else {
            anagramas[alphabetizeName].push(originalName);
        }
    }