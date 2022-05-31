const modalRedefinirSenha = () => {
    criarModal();
	
	conteudoModal(`  
    <link rel="stylesheet" type="text/css" href="./style/redefinirSenha.css">
    

    <div id="tituloSenha">
    <div class="editarTitulo">Redifinir Senha</div>
</div>
<div id="paiDasCaixas">
<div id="caixasSenha">
    <div id="senhaAtual">Senha atual</div>

    <div class="paiInput">
    <input type="password" id="caixaSenhaAtual" placeholder="Digite sua senha" class="olhinhoSenha">
    <img src="img/Hide.svg" class="editarIcone btn">
    </div>

    </input>
</div>

<div id="caixasSenha">
    <div id="senhaAtual">Nova senha</div>

    <div class="paiInput">
    <input type="password" id="caixaSenhaAtual" placeholder="Digite sua senha" class="olhinhoSenha2">
    <img src="img/Hide.svg" class="editarIcone btn2">
    </div>

    </input>
</div>

<div id="caixasSenha">
    <div id="senhaAtual">Confirme sua senha</div>

    <div class="paiInput">
    <input type="password" id="caixaSenhaAtual" placeholder="****************" class="olhinhoSenha3">
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

//FECHAR A MODAL
document.querySelector('.Cancelar').addEventListener('click',fecharModal);


var modal = document.getElementById('modalUsuario');
modal.style.display = 'none';
abrirModal()


// Fazendo Script para os olhinhos de senha ( 22/ mar /2022 )

const senhaAtual = document.querySelector('.olhinhoSenha');
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

const novaSenha = document.querySelector('.olhinhoSenha2');
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

const confirmarSenha = document.querySelector('.olhinhoSenha3');
const btn3 = document.querySelector('.btn3');

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

}

document.getElementById('buttonSenha').addEventListener('click' ,modalRedefinirSenha); 
