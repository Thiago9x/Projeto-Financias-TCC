// Fazendo Script para os olhinhos de senha ( 22/ mar /2022 )

const senhaCadastro = document.querySelector('.senhaCadastro');
const btnOlho = document.querySelector('.btnOlho');

btnOlho.onclick = () => 
{
    if(senhaCadastro.type === 'password')
    {
        senhaCadastro.type = 'text'
        btnOlho.src = 'img/Hide.svg'
    }
    else
    {
        senhaCadastro.type = 'password'
        btnOlho.src = 'img/MostrarSenha.svg'
    }
}