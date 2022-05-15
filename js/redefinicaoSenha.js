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

const resetarSenha = () => {
    const email = new URLSearchParams(window.location.search).get('email');
    const senhaValor = document.querySelector('.senha').value;
    const senhaValor2 = document.querySelector('.senhaOption2').value;

    const confirmacaoCampos = document.getElementById('Principal').reportValidity();
    if(confirmacaoCampos == true){
        if(senhaValor === senhaValor2){


            console.log(fetch(url + "/resetar", {method: 'POST', headers: {
                // 'content-type': 'application/json', 
            }, body:JSON.stringify( {email: email, senha:senhaValor, tipo: "MUDAR"}),
            })
            .then((resposta) => resposta.json())
            .then((data) => {
                if(data.status === Status.OK){
                   window.location.href = './senhaConfirmada.html';
                }
                else{
                    alert('ERRO:Aconteceu algum erro')
                }
            })
            ); 
        }
        else{
            alert('AS SENHAS NÃO ESTÃO IGUAIS')
        }
    }
    else{
        alert('OS CAMPOS NÃO FORAM PREENCHIDOS CORRETAMENTE');
    }

}

document.getElementById("botao").addEventListener("click", resetarSenha);