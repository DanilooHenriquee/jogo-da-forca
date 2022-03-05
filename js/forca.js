const palavras = [
    palavra1 = {
        nome: 'cachorro',
        dica: 'Animal de Estimação'
    },
    palavra2 = {
        nome: 'gato',
        dica: 'Animal de Estimação'
    },
    palavra3 = {
        nome: 'peixe',
        dica: 'Animal de Estimação'
    },
    palavra4 = {
        nome: 'lobo',
        dica: 'Animal Selvagem'
    },
    palavra5 = {
        nome: 'leao',
        dica: 'Animal Selvagem'
    },
    palavra6 = {
        nome: 'crocodilo',
        dica: 'Animal Selvagem'
    },
    palavra7 = {
        nome: 'jabuticaba',
        dica: 'Fruta'
    },
    palavra8 = {
        nome: 'abacaxi',
        dica: 'Fruta'
    },
    palavra9 = {
        nome: 'melancia',
        dica: 'Fruta'
    },
    palavra10 = {
        nome: 'cerveja',
        dica: 'Bebida'
    },
    palavra11 = {
        nome: 'agua',
        dica: 'Bebida'
    },
    palavra12 = {
        nome: 'leite',
        dica: 'Bebida'
    }
];

let palavraSorteada = "";
let dicaSorteada = "";
let numTentativas = 8;
let numAcertos = 0;
let posicaoLetrasChutadas = [];
let letrasErradas = [];

function sortearPalavra() {
    let indexArray = parseInt(Math.random() * palavras.length);

    palavraSorteada = palavras[indexArray].nome.toUpperCase();
    dicaSorteada = palavras[indexArray].dica;
}

sortearPalavra();

function mostrarDica() {
    let dica = document.getElementById('dica');
    dica.textContent = 'Dica: ' + dicaSorteada;
}

mostrarDica();

let palavra = document.getElementById('palavra');
let arrayLetrasPalavraSorteada = palavraSorteada.split('');

function mostrarPalavraSorteada() {
    let numLetras = palavraSorteada.length;

    for (i = 0; i < numLetras; i++) {
        palavra.innerHTML = palavra.innerHTML + `<div class="underline" > <p id="letra${i}" class="ocultar-letra"> ${arrayLetrasPalavraSorteada[i]} </p> </div>`;
    }
}

mostrarPalavraSorteada();

function verificaChute(letra) {
    document.getElementById('letra-' + letra).disabled = true;

    if (numTentativas > 0) {
        comparaChuteComPalavraSorteada(letra);
    } else {
        document.getElementById('palavra').disabled = true;
    }
}

let mensagemResultado;
let resultado;

function comparaChuteComPalavraSorteada(letra) {
    let btnStyle;
    let index = arrayLetrasPalavraSorteada.indexOf(letra);

    if (index != -1) {
        numAcertos++;

        while (index != -1) {
            posicaoLetrasChutadas.push(index);
            index = arrayLetrasPalavraSorteada.indexOf(letra, index + 1);
        }

        let arrayOcorrenciasUnicas = [... new Set(arrayLetrasPalavraSorteada)];

        if (numAcertos == arrayOcorrenciasUnicas.length) {
            mensagemResultado = "Parabéns! você ganhou!";
            resultado = true;
            mostrarMensagem(mensagemResultado, resultado);
            desativarBotoesAlfabeto();
            desativarBotao('mudar-palavra');
            removeDisplayNone('recomecar');
        }

        mostraLetraPalavraSorteada(posicaoLetrasChutadas);
        btnStyle = 'btn-acerto';

    } else {
        numTentativas--;

        if (numTentativas == 0) {
            mensagemResultado = "Que pena! você perdeu!";
            resultado = false;
            mostrarMensagem(mensagemResultado, resultado);
            desativarBotoesAlfabeto();
            desativarBotao('mudar-palavra');
            mostraPalavraQuandoErra();
            removeDisplayNone('recomecar');
        }

        letrasErradas.push(letra);
        btnStyle = 'btn-erro';
    }

    let numLetrasErradas = letrasErradas.length;
    alterarForca(numLetrasErradas);
    alterarStyleBotao(letra, btnStyle);
}

function mostraLetraPalavraSorteada(index) {

    for (i = 0; i < index.length; i++) {
        let letraPalavraSorteada = document.getElementById('letra' + index[i]);

        letraPalavraSorteada.classList.remove('ocultar-letra');
        letraPalavraSorteada.classList.add('revelar-letra');
    }
}

function mostraPalavraQuandoErra() {

    for (i = 0; i < arrayLetrasPalavraSorteada.length; i++) {
        let letrasarrayLetrasPalavraSorteada = document.getElementById('letra' + i);
        
        letrasarrayLetrasPalavraSorteada.classList.remove('ocultar-letra');
        letrasarrayLetrasPalavraSorteada.classList.add('revelar-letra', 'palavra-errada');
    }
}

function alterarStyleBotao(letra, btnStyle) {
    document.getElementById('letra-' + letra).classList.add(btnStyle);
}

function desativarBotoesAlfabeto() {
    let alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    for (i = 0; i < alfabeto.length; i++) {
        document.getElementById('letra-' + alfabeto[i]).disabled = true;
    }
}

function desativarBotao(id) {
    let btnDesativado = document.getElementById(id);
    btnDesativado.disabled = true;
    btnDesativado.classList.add('btn-desativado');
}

function removeDisplayNone(id) {
    document.getElementById(id).classList.remove('display-none');
}

function alterarForca(numErros) {
    let imgForca = document.getElementById('img-forca');

    imgForca.setAttribute('src', `image/forca${numErros}.jpg`);
}

async function mostrarMensagem(mensagem, resultado) {
    await aguardar(500);
    let style = resultado ? 'msg-acerto' : 'msg-erro';

    let msgResultado = document.getElementById('mensagem');
    msgResultado.innerHTML = mensagem;
    msgResultado.classList.add(style);
}

function aguardar(segundos) {
    return new Promise(resolve => setTimeout(resolve, segundos));
}

let btnRecomecar = document.getElementById('recomecar');
btnRecomecar.addEventListener('click', atualizarPagina);

let btnVerPalavra = document.getElementById('ver-palavra');
btnVerPalavra.addEventListener('click', () => {
    alert(`A Palavra Sorteada é: ${palavraSorteada}`);
});

let btnMudarPalavra = document.getElementById('mudar-palavra');
btnMudarPalavra.addEventListener('click', atualizarPagina);

function atualizarPagina() {
    location.reload();
}