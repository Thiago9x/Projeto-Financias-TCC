// Fazendo Script para os olhinhos de senha ( 22/ mar /2022 )

const senha = document.querySelector('.senha');
const btn = document.querySelector('.btn');

btn.onclick = () => 
{
    if(senha.type === 'text')
    {
        senha.type = 'password'
        btn.src = 'img/Hide.svg'
    }
    else
    {
        senha.type = 'text'
        btn.src = 'img/MostrarSenha.svg'
    }
}