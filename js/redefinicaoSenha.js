// Fazendo Script para os olhinhos de senha ( 22/ mar /2022 )

const senha = document.querySelector('.senha');
const senhaOption2 = document.querySelector('.senhaOption2');
const button1 = document.querySelector('.button1');
const button2 = document.querySelector('.button2');
button1.onclick = () => 
{
    if(senha.type === 'text')
    {
        senha.type = 'password'
        button1.src = 'img/Hide.svg'
    }
    else
    {
        senha.type = 'text'
        button1.src = 'img/MostrarSenha.svg'
    }
}

button2.onclick = () => 
{
    if(senhaOption2.type === 'text')
    {
        senhaOption2.type = 'password'
        button2.src = 'img/Hide.svg'
    }
    else
    {
        senhaOption2.type = 'text'
        button2.src = 'img/MostrarSenha.svg'
    }
}