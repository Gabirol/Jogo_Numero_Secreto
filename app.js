let listaDeNumerosSorteados = []; // Criação de uma lista, sem nem um valor inicialmente.
let chute; // Irá receber o chute do usuário.
let tentativa = 1; // Contador de tentativas, começando com 1.
let palavraTentativa; // Palavra no plural ou singular.
let numeroMaximo = 10; // Configurar o intervalo de números que podemos chutar.
let numeroSecreto = gerarNumero(); // Irá gerar o numero secreto.

// Função para configurar a narração caso ativada
function configurarNarracao() {
    let resposta = confirm("Deseja ativar a narração por voz durante o jogo?");
    narracaoAtivada = resposta; // true se clicar em "OK", false se clicar em "Cancelar"
}
configurarNarracao();

/* 
let titulo = document.querySelector('h1');
titulo.innerHTML = 'Jogo do numero secreto';
let paragrafo = document.querySelector('p');
paragrafo.innerHTML = `Escolha um numero de 1 a ${numeroMaximo}`;
*/

// Estou criando uma função para simplificar a criação de textos dentro do nosso código.
if (narracaoAtivada == true) {
    function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // Criei uma condicional para que o usuário confirme se quer ou não texto narrado.
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
        }

    }
    console.log("Texto narrado ativado");
} else {
    function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}
    console.log("Texto narrado desativado");
}

// Nesta função, estou usando a "exibirTexto" para criarmos a mensagem inicial da página.
function mensagemInicial() {
    exibirTexto('h1', 'Jogo do número secreto');
    exibirTexto('p', `Escolha um numero de 1 a ${numeroMaximo}`);
}

// Estou chamando a função para que seja executada na pagina.
mensagemInicial();

// Indiquei o elemento "input" e configurei ele para coletar o chute, adicionei dentro do arquivo index essa função para o botão "Chutar" e ativamos um contador de tentativas.
function verificarChute() {
    chute = document.querySelector('input').value;
    // Criei uma variavel "palavraTentativa" para deixar o codigo de uma maneira mais dinamica.
    if (chute == numeroSecreto) {
        exibirTexto('h1', 'Acertou!');
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Parabens, você descobriu o numero secreto com ${tentativa}ª ${palavraTentativa}!.`;
        exibirTexto('p', mensagemTentativas);
        // Assim que acertar o numero, o botão "Novo Jogo" sera habilitado, indicamos ele com a ajuda do seu ID.
        document.getElementById('reiniciar').removeAttribute('disabled');
        // Condicional simples onde se o numero for menor que o chute retornara uma mensagem, caso contrario.
    } else {
        if (chute > numeroSecreto) {
            exibirTexto('p', 'O numero secreto é menor.');
        } else {
            exibirTexto('p', 'O numero secreto é maior');
        }
        limparChute();
        tentativa++;
    }
}

// Está função é responsavel por gerar o numero secreto, com a ajuda do "parseInt(Math.random())" que gerar valores aletorios.
function gerarNumero() {
    let numerosSorteado = parseInt(Math.random() * numeroMaximo + 1);

    // Criei uma variavel para auxiliar na lista, para assim que a quantidade de numeros da lista foi atingida, ele reseta-la, evitando bugs,
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if(quantidadeDeElementosNaLista == numeroMaximo) {
        listaDeNumerosSorteados = [];
    }
    // Criei uma condição para que cada vez que acertamos um numero ele seja adicionada á lista, onde será validado se ele não se repete, assim sempre gerando um número diferente dentro do intervalo definido.
    if(listaDeNumerosSorteados.includes(numerosSorteado)) {
        return gerarNumero();
    } else {
        listaDeNumerosSorteados.push(numerosSorteado);
        return numerosSorteado;
    }
}

// Essa função foi criada para limpar o conteúdo do "input" assim que o chute for realizado.
function limparChute() {
    chute = document.querySelector('input');
    chute.value = '';
}

// Essa é a função responsável por reiniciar o jogo, trazendo a mensagem inicial, limpando o chute, gerando o nuvo numero e desabilitando o botão "Novo Jogo" com o ".set...".
function reiniciarJogo() {
    mensagemInicial();
    limparChute();
    numeroSecreto = gerarNumero();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    tentativa = 1;

}