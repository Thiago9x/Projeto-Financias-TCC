
const modalRedefinirSenha = () => {
	
	conteudoModal(`  <div id="tituloSenha">
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

abrirModal()
}

document.getElementById('buttonSenha').addEventListener('click' ,modalRedefinirSenha); 
