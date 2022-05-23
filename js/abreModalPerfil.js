
const abreModal = () =>{
    conteudoModal(`
    
    <link rel="stylesheet" href="./style/usuario.css">

    <div id="usuario">

    <div class="containers">
         <img src="./img/usuarioPerfil.svg" class="usuarioFoto" width="90px" height="90px">
    </div>
    <div class="containers1">

        <h4>Usuário</h4>

        <div class='input-wrapper'>

            <label for='input-file'>
               
                <h4 class="h4">
                    Selecione uma foto
                </h4> 
            </label>

            <input id='file-input' type='file' value='' />
            <span id='file-name'></span>
                
        </div>

    </div>

   </div>
    <div id="conteudo">
        <h7 class="h7">Nome Completo</h7>
        <input type="text" class="edit" placeholder="digite seu nome"> 
    </div>

    <div id="conteudo">
        <h7 class="h7">Email</h7>
        <input type="text" class="edit" placeholder="fulano@gmail.com"> 
    </div>

    <div id="conteudo2">

        <!-- <h7 class="h7">Segurança</h7> -->

        <div class="h7">Segurança</div>

        <div class="organize">
            
            <label>
                <input type="checkbox" id="checkbox"/>
                <span class="checkbox"></span>
            </label>
            
            <div class="edith4"> <h4>Verificação de duas etapas</h4> </div>

        </div>  
        <div class="t1">

            <input id="buttonSenha" type="button" value="Trocar Senha"> 
            
        </div>       
    </div>
    <div id="conteudo3">

        <img src="./img/usuario2.svg" alt class="usuarioImg">

        <input id="button1" type="button" value="Cancelar">
        <input id="button2" type="button" value="Salvar">
    </div>`)

    abrirModal()
}
document.getElementById('abrirPerfil').addEventListener('click',abreModal);

