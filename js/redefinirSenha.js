const modalRedefinirSenha = () => {
	
	conteudoModal(`  
    <link rel="stylesheet" type="text/css" href="../style/redefinirSenha.css">
    <div id="tituloSenha">
    <div class="editarTitulo">Redifinir Senha</div>
</div>
<div id="paiDasCaixas">
<div id="caixasSenha">
    <div id="senhaAtual">Senha atual</div>
    <div id="caixaSenhaAtual">digite sua senha</div>
</div>

<div id="caixasSenha">
    <div id="senhaAtual">Nova senha</div>
    <div id="caixaSenhaAtual">digite sua senha</div>
</div>

<div id="caixasSenha">
    <div id="senhaAtual">Confirme sua senha</div>
    <div id="caixaSenhaAtual">****************</div>
</div>
</div>

<div id="buttonRedefinirSenha">
<div>Redefinir</div>
</div>
<div class="editarButtonCancelar">
<div id="editarTagA">Cancelar</div>
</div> `);

var modal = document.getElementById('modalUsuario');
modal.style.display = 'none';
abrirModal()
}

document.getElementById('buttonSenha').addEventListener('click' ,modalRedefinirSenha); 
