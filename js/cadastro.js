// Fazendo Script para os olhinhos de senha ( 22/ mar /2022 )

const senhaCadastro = document.querySelector('.senhaCadastro');
const senhaCadastro2 = document.querySelector('.senhaCadastro2');
const btnOlho = document.querySelector('.btnOlho');
const btnOlho2 = document.querySelector('.btnOlho2');
btnOlho.onclick = () => {
    if (senhaCadastro.type === 'text') {
        senhaCadastro.type = 'password'
        btnOlho.src = 'img/Hide.svg'
    } else {
        senhaCadastro.type = 'text'
        btnOlho.src = 'img/MostrarSenha.svg'
    }
}

btnOlho2.onclick = () => {
    if (senhaCadastro2.type === 'text') {
        senhaCadastro2.type = 'password'
        btnOlho2.src = 'img/Hide.svg'
    } else {
        senhaCadastro2.type = 'text'
        btnOlho2.src = 'img/MostrarSenha.svg'
    }
}