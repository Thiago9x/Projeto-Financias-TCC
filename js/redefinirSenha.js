const modalRedefinirSenha = () => {
	
	conteudoModal(`  
    <link rel="stylesheet" type="text/css" href="../style/redefinirSenha.css">
    

    <div id="tituloSenha">
    <div class="editarTitulo">Redifinir Senha</div>
</div>
<div id="paiDasCaixas">
<div id="caixasSenha">
    <div id="senhaAtual">Senha atual</div>
    <input id="caixaSenhaAtual" placeholder="digite sua senha"></input>
</div>

<div id="caixasSenha">
    <div id="senhaAtual">Nova senha</div>
    <input id="caixaSenhaAtual" placeholder="digite sua senha"></input>
</div>

<div id="caixasSenha">
    <div id="senhaAtual">Confirme sua senha</div>
    <input id="caixaSenhaAtual" placeholder="****************"></input>
</div>
</div>

<div id="editarButton">
<div id="buttonRedefinirSenha" type="button">
<div>Redefinir</div>
</div>
<div class="editarButtonCancelar">
<div id="editarTagA">Cancelar</div>
</div> 
</div>`);

var modal = document.getElementById('modalUsuario');
modal.style.display = 'none';
abrirModal()
}

document.getElementById('buttonSenha').addEventListener('click' ,modalRedefinirSenha); 
