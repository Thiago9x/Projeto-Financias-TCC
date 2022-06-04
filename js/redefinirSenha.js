
const modalRedefinirSenha = () => {
	conteudoModal(`  
    <link rel="stylesheet" type="text/css" href="./style/redefinirSenha.css">
    

    <div id="tituloSenha">
    <div class="editarTitulo">Redifinir Senha</div>
</div>
<div id="paiDasCaixas">
<div id="caixasSenha">
    <div id="senhaAtual">Senha atual</div>

    <div class="paiInput">
    <input type="password" class="caixaSenhaAtual" id="senha1" placeholder="Digite sua senha atual" class="olhinhoSenha">
    <img src="img/Hide.svg" class="editarIcone btn">
    </div>

    </input>
</div>

<div id="caixasSenha">
    <div id="senhaAtual">Nova senha</div>

    <div class="paiInput">
    <input type="password" class="caixaSenhaAtual" id="senha2" placeholder="Digite sua nova senha" class="olhinhoSenha2">
    <img src="img/Hide.svg" class="editarIcone btn2">
    </div>

    </input>
</div>

<div id="caixasSenha">
    <div id="senhaAtual">Confirme sua senha</div>

    <div class="paiInput">
    <input type="password" class="caixaSenhaAtual" id="senha3" placeholder="Confirme sua senha" class="olhinhoSenha3">
    <img src="img/Hide.svg" class="editarIcone btn3">
    </div>

    </input>
</div>
</div>

<div id="editarButton">
<div id="buttonRedefinirSenha" type="button">
<div>Redefinir</div>
</div>
<div class="editarButtonCancelar">
<div id="editarTagA" class="Cancelar">Cancelar</div>
</div> 
</div>`);

abrirModal()
//FECHAR A MODAL
document.querySelector('.Cancelar').addEventListener('click',fecharModal);



// Fazendo Script para os olhinhos de senha ( 22/ mar /2022 )

const senhaAtual = document.querySelector('#senha1');
const btn = document.querySelector('.btn');

btn.onclick = () => {
    if (senhaAtual.type === 'text') {
        senhaAtual.type = 'password'
        btn.src = 'img/Hide.svg'
    }
    else {
        senhaAtual.type = 'text'
        btn.src = 'img/MostrarSenha.svg'
    }
}

const novaSenha = document.querySelector('#senha2');
const btn2 = document.querySelector('.btn2');

btn2.onclick = () => {
    if (novaSenha.type === 'text') {
        novaSenha.type = 'password'
        btn2.src = 'img/Hide.svg'
    }
    else {
        novaSenha.type = 'text'
        btn2.src = 'img/MostrarSenha.svg'
    }
}

const confirmarSenha = document.querySelector('#senha3');
const btn3 = document.querySelector('.btn3');


confirmarSenha.onkeypress = (e) => {if(e.key === 'Enter'){document.getElementById('buttonRedefinirSenha').click()}}

btn3.onclick = () => {
    if (confirmarSenha.type === 'text') {
        confirmarSenha.type = 'password'
        btn3.src = 'img/Hide.svg'
    }
    else {
        confirmarSenha.type = 'text'
        btn3.src = 'img/MostrarSenha.svg'
    }
}
const confirmarEnviarSenha = () => {
    const senha1 = document.getElementById('senha1')
    const senha2 = document.getElementById('senha2')
    const senha3 = document.getElementById('senha3')
if(senha2.value === senha3.value){
    fetch(urlData + '/senha?k=' + token,{method:'POST',body: JSON.stringify({antiga: senha1.value, nova: senha3.value})})
    .then(r => r.json()).
    then(j => {if(j.status === 17){
        alert("Sua senha atual está incorreta!!!")
    }
    else{
        fecharModal()
        alert('Sua senha foi alterada com sucesso!!!')
    }}) 
}

else{alert('As senhas não estão iguais!!!')
senha3.focus()}
}
document.getElementById('buttonRedefinirSenha').addEventListener('click',confirmarEnviarSenha)
}
