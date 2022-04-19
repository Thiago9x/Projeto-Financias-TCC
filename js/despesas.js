
const opcao1 = () => {
    document.getElementById('repeticao').classList.add('aparecer')
}
document.getElementById('repetir-button').addEventListener('click', opcao1) 

const opcao2 = () => {
    document.getElementById('observacao').classList.add('aparecer')
}
document.getElementById('observacao-button').addEventListener('click', opcao2) 

const opcao3 = () => {
    document.getElementById('anexo').classList.add('aparecer')
}
document.getElementById('anexo-button').addEventListener('click', opcao3) 

// menssagem após confirmar a repetição de despesas
// var img1 = 'img/repetir.svg'.src;
// var img1_1 = 'img/repetirr.svg'.src;
// const trocarimg1 = (img1, img1_1) => {
//     if(img1 == true){
//         return img1_1;
//     }
// }
// document.getElementById('repetir-button').addEventListener('click', trocarimg1)


"use scrict"

const trocaimg1 = document.getElementById('repetir-button');
const btnImg1 = document.querySelector('.btnImg1');

const trocaimg2 = document.getElementById('observacao-button');
const btnImg2 = document.querySelector('.btnImg2');

const trocaimg3 = document.getElementById('anexo-button');
const btnImg3 = document.querySelector('.btnImg3');

const trocaimg4 = document.getElementById('anexo-button');
const btnImg4 = document.querySelector('.btnImg4');


btnImg1.onclick = () => {
    if (trocaimg1.type === 'onclick') {
        btnImg1.src = 'img/repetir.svg'
    } else {
        trocaimg1.type = 'text'
        btnImg1.src = 'img/repetirr.svg'
    }
}

btnImg2.onclick = () => {
    if (trocaimg2.type === 'onclick') {
        btnImg2.src = 'img/observacao.svg'
    } else {
        trocaimg2.type = 'text'
        btnImg2.src = 'img/observacaoo.svg'
    }
}

btnImg3.onclick = () => {
    if (trocaimg3.type === 'onclick') {
        btnImg3.src = 'img/anexo.svg'
    } else {
        trocaimg3.type = 'text'
        btnImg3.src = 'img/anexoo.svg'
    }
}

btnImg4.onclick = () => {
    if (trocaimg4.type === 'onclick') {
        btnImg4.src = 'img/favorito.svg'
    } else {
        trocaimg4.type = 'text'
        btnImg4.src = 'img/favoritoo.svg'
    }
}

// JS de inserão de anexo de imagens


const token = new URLSearchParams(window.location.search).get('token');
let url = 'http://10.107.144.11:8080/royal/dashboard?k=' + token;
const ws = new WebSocket('ws://10.107.144.11:8080/royal/dashboard/' + token);

ws.onmessage = ({data}) => {
    console.log(data);
}