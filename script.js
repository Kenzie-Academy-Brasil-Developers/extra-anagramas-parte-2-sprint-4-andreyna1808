// VARIÁVEIS DO ANAGRAMAS
const resultsDiv = document.getElementById('results');
const anagramas5 = document.getElementById("anagramas5");
const anagramas2 = document.getElementById('anagramas2');
const anagramas3 = document.getElementById('anagramas3');
const resetButton = document.getElementById('limpar')

//Botão de limpar
resetButton.addEventListener('click', function () {
    resultsDiv.innerHTML = ""
})

//Basicão que que vai organizar tudo na função pro anagramas
function alphabetize(a) {
    return a.toLowerCase().split("").sort().join("").trim(); //Minusculo, array, ordena, string, Tespaço.
}

//5 palavras
function FiveAnagram(palavras){
    // A função base está no geral.js

    let resultado = {};

    let anagramasKeys = Object.keys(anagramas); // enumerar o anagramas para poder excluir os menores de 5

    for (let i = 0; i < anagramasKeys.length; i++) {
        if (anagramas[anagramasKeys[i]].length >= 5) {
            resultado[anagramasKeys[i]] = anagramas[anagramasKeys[i]];
        }
    }
    return JSON.stringify(resultado) // retorno em string

}
anagramas5.addEventListener("click", function () {
    resultsDiv.innerHTML = FiveAnagram(palavras)
})


// 2 palavras no anagrama
function TwoAnagram(palavras){
    // A função base está no geral.js

    let anagramasKeys = Object.keys(anagramas); // enumerar o anagramas para poder ir removendo

    // Comando do usuário
    let input = document.getElementById('input').value;
    let entrada = alphabetize(input);

    let breakLoop = true; // para parar de percorrer caso seja falso e assim economiza processamento

    let receber_objetos = [];
    let usedSecondKey = [];

    for (let j = 0; j < anagramasKeys.length - 1; j++) {
        let entradaArray = entrada.split(""); // atribuir minha entra em um Array

        let chave1 = anagramasKeys[j];
        if (chave1.length >= entrada.length -2 || chave1.length < 2) { // vai remover 2 palavras pois é o minimo para a segunda
            continue; // pula para o próximo laço
        }
        if (usedSecondKey.includes(chave1) ){ // Se a minha segunda chave estiver inclusa na 1, pula pro proximo laço
            continue;
        }

        breakLoop = false;  // caso de false ele volta e vai para outra palavra percorrendo novamente.

        //Remove os caracteres das palavras. Aqueles que contem na chave
        for (let i = 0; i < chave1.length; i++) {
            let indexOf = entradaArray.indexOf(chave1[i]); // vai retornar o numero do indice onde ele encontra

            if (indexOf != -1) {
                entradaArray.splice(indexOf, 1); //a partir do indice vai ser removido um elemento
            }
            else {
                breakLoop = true; // caso não seja encerra o laço
                break;
            }
        }

        //Se o infeliz passou até aq é pq pertence ao anagrama agr é fase final
        if (!breakLoop) {
            let secondKey = entradaArray.join('');

        // Verificação se os caracteres q sobraram formam uma chave válida?
            if (anagramas[secondKey] !== undefined) {
                usedSecondKey.push(secondKey);

            //Organização as palavras que serão printadas na tela do maledito usuário
                let textWithTheKeys = anagramas[chave1].join(",") + " + " + anagramas[secondKey].join(",");
            receber_objetos.push(textWithTheKeys);
        }
    }
}
    return JSON.stringify(input) + receber_objetos.join("<br>");  // transformo em string e printo pro usuário o resultado
}
anagramas2.addEventListener("click", function () {
    resultsDiv.innerHTML = TwoAnagram(palavras)
})

// 3 palavras no anagrama
function ThreeAnagram(palavras){

    // A função base está no geral.js

    let anagramasKeys = Object.keys(anagramas); // enumerar o anagramas para poder ir removendo

    // Comando do usuário
    let input = document.getElementById('input').value;
    let entrada = alphabetize(input);

    let breakLoopPrimary = true;
    let breakLoopSecond = true;

    let receber_objetos = [];
    let usedKeys = [];
    let usedthirdKeys = [];

// A chave deve ser menor que todos os caracteres -4 ou -2 e -2 por
// causa que o minimo dos outros caracteres é 2. 
// Exemplo (ab,Ba (tem 2) + ABL,bal,LBA + ou (tem 2)) <=> Foco na explicação Drica

    for (let j = 0; j < anagramasKeys.length - 2; j++) {
        let entradaArray = entrada.split(""); //Guardo em string o meu entradaArray
        let primaryKey = anagramasKeys[j];

        if (primaryKey.length >= entrada.length - 4 || primaryKey.length < 2) { //Explicação na linha 118
            continue;                                                           // Elimina chaves fora desse padrão
        }
        if (usedKeys.includes(primaryKey)) { // Elimina chaves já usadas
            continue;
        }
        breakLoopPrimary = false;

        // remove os carateres da palavra. Aqueles que contem na chave. (cahve == ant)
        for (let i = 0; i < primaryKey.length; i++) {
            let indexOf = entradaArray.indexOf(primaryKey[i]); // retorna o indice da palavra se econtrada

            if (indexOf != -1) {
                entradaArray.splice(indexOf, 1); //a partir do indice vai ser removido um elemento
            }
            else {
                breakLoopPrimary = true; // caso não seja encerra o laço
                break;
            }
        }

        //RESUMINDO ISSO TUDO. -- Vai repetir no mesmo estilo.
        if (!breakLoopPrimary) {// primeira chave passou || HULULLL problema de desempenho tá aq eu acho

            for (let k = j + 1; k < anagramasKeys.length - 1; k++) {

                let restanteEntradaArray = entradaArray.slice(); // subrray
                let secondKey = anagramasKeys[k];

                if (secondKey.length > restanteEntradaArray.length - 2 || secondKey.length < 2) {
                    continue;
                }
                if (usedthirdKeys.includes(primaryKey)) {
                    continue;
                }
                breakLoopSecond = false;

                for (let i = 0; i < secondKey.length; i++) {
                    let indexOf = restanteEntradaArray.indexOf(secondKey[i]); //Vai procurar uma palavra que seja igual e retornar o numero da posição caso encontre

                    if (indexOf != -1) {
                        restanteEntradaArray.splice(indexOf, 1); //Vai removendo as palavras a partir do numero do IndexOf
                    }
                    else {
                        breakLoopSecond = true;
                        break;
                    }
                }
                if (!breakLoopSecond) { // segunda chave passou
                    let thirdKey = restanteEntradaArray.join(''); //transforma em string

                    if (anagramas[thirdKey] !== undefined) { // Os caracteres que sobraram da entrada, fromam uma chave valida?
                        usedKeys.push(secondKey);
                        usedthirdKeys.push(thirdKey);
                        // Ele vai empurrar os resultados da segunda e terceira chave

                        // Em baixo está a organização de como será printado na tela + as chaves dos anagramas... showww
                        let textWithTheKeys = anagramas[primaryKey].join(",") + " + " + anagramas[secondKey].join(",") + " + " + anagramas[thirdKey].join(",");
                        receber_objetos.push(textWithTheKeys);
                    }
                }
            }
        }
    }
    return JSON.stringify(input) + receber_objetos.join("<br>");     
}
anagramas3.addEventListener("click", function () {
    resultsDiv.innerHTML = ThreeAnagram(palavras)
})
