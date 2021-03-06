// Fazendo Script para os olhinhos de senha ( 22/ mar /2022 )

const senha = document.querySelector('.senha');
const btn = document.querySelector('.btn');

btn.onclick = () => {
    if (senha.type === 'text') {
        senha.type = 'password'
        btn.src = 'img/Hide.svg'
    }
    else {
        senha.type = 'text'
        btn.src = 'img/MostrarSenha.svg'
    }
}

//FUNÇAO DE VALIDACAO PARA FAZER O POST
const Login = () => {

    const manterLogin = document.getElementById('chxInput').checked;
    const email = document.getElementById('email').value;
    const senha = document.querySelector('.senha').value;

    const confirmacaoCampos = document.getElementById('principal').reportValidity();
    if (confirmacaoCampos == true) {

        console.log(fetch(url + '/contas', { // '/data/perfil' {nome: nome, foto: null, duasetapas: duasetapas}
            method: 'POST', headers: {
                // 'content-type': 'application/json', 
            }, body: JSON.stringify({ email: email, senha: senha, manter: manterLogin }),
        })
            .then((resposta) => resposta.json())
            .then((data) => {
                if (data.status === Status.OK) {
                    if(data.found === true){
                        Cookies.set('token', data.token);
                        window.location.href='./dashboard.html';

                    }
                    else{
                        alert('Email ou senha incorretos !!!')
                    }
                }
                else {
                    alert('ERRO:Aconteceu algum erro')
                }
            })
        );
    }
    else {
        alert('OS CAMPOS NÃO FORAM PREENCHIDOS');
    }


}

document.querySelector('.senha').onkeypress = (e) => {if(e.key === 'Enter'){document.getElementById('button').click()}}
document.querySelector('#email').onkeypress = (e) => {if(e.key === 'Enter'){document.getElementById('button').click()}}
document.getElementById("button").addEventListener("click", Login);
