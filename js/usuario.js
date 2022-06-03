// ABRE A MODAL DE USUARIO
const abreModalUsuario = () => {
    
    conteudoModal(`
    <div class="modalUsuarioBranco">
        
        <div id="usuario">

            <div class="Container">
                 <img src="./img/usuarioPerfil.svg" class="usuarioFoto" width="90px" height="90px">
            </div>
            <div class="containersUsuario1">

                <h4 id="nomeUsuario"></h4>
        
                <div class='input-wrapper'>
        
                    <label for='input-file'>
                       
                        <div class="h4">
                            Selecione uma foto
                        </div> 
                    </label>
        
                    <input id='input-file' type='file' value='' />
                    <span id='file-name'></span>
                        
                </div>
        
            </div>
        
        </div>
        <div id="centralizarConteudoUsuario">
            <div id="conteudoUsuario">
                <div class="h7">Nome Completo</div>
                <input id="editarAsInputsUsuario" type="text" class="edit nomeCompleto" placeholder="Digite seu nome" > 
            </div>
        
            <div id="conteudoUsuario">
                <h7 class="h7">Email</h7>
                <input id="editarAsInputsUsuario"type="text" class="edit emailUsuario" placeholder="fulano@gmail.com"> 
            </div>
        
            <div id="conteudoUsuario2">
        
                <!-- <h7 class="h7">Segurança</h7> -->
        
                <div class="textH7">Segurança</div>
        
                <div class="organize">
                    
                    <label id="Tcheckbox">
                        <input type="checkbox" id="checkbox"/>
                        <label for="checkbox" class="checkbox"></label>
                    </label>
                    
                    <div class="edith4"> <h4>Verificação de duas etapas</h4> </div>
        
                </div>  
                <div class="guardaBotao">
        
                    <input id="buttonSenha" type="button" value="Trocar Senha"> 
                    
                </div>       
            </div>
            <div id="botoesSalvarCancelar">
        
                <img src="./img/usuario2.svg" alt class="usuarioImg">
        
                <input id="buttonCancelar" class="cancelar" type="button" value="Cancelar">
                <input id="buttonSalvar" type="button" value="Salvar">
            </div>
        </div>
    </div>`)
abrirModal()
let photo = document.querySelector('.usuarioFoto');
let file = document.getElementById('input-file');


photo.addEventListener('click', () => {
    file.click();
    console.log(photo)
});

file.addEventListener('change', () => {

    if (file.files.length <= 0) {
        return;
    }

    let reader = new FileReader();
    reader.onload = () => {
        photo.src = reader.result;
    }
    console.log(reader);
    reader.readAsDataURL(file.files[0]);
});

//FECHAR A MODAL
document.querySelector('.cancelar').addEventListener('click', () => {
    document.getElementById('modalUsuario').style.display = "none"
});

//CONEXÃO COM A API
console.log(fetch(`${url}/data/perfil?k=${token}`)
    .then((resposta) => resposta.json())
    .then((data) => {
        console.log(data);
        let nomeUsuario = data.nome;
        const emailUsuario = data.email;
        const duasEtapas = data.duasetapas;
        const fotoUsuario = data.foto;
        document.getElementById('nomeUsuario').innerText = nomeUsuario;
        if(fotoUsuario){
            document.querySelector('.usuarioFoto').src = url + '/upload/' + fotoUsuario;
        }else{
            document.querySelector('.usuarioFoto').src ="./img/usuarioPerfil.svg"
        }
        let nomeCompleto = document.querySelector('.nomeCompleto')
        nomeCompleto.value = nomeUsuario;

        let email = document.querySelector('.emailUsuario')
        email.value = emailUsuario;
        email.disabled = true;

        document.querySelector('#checkbox').checked = duasEtapas

        document.getElementById('checkbox').checked=duasEtapas;
        const enviarUsuario = async () => {
            nomeUsuario = nomeCompleto.value;
            let fotoFinal = document.querySelector('#input-file').files[0]
            let duasEtapasFinal = document.querySelector('#checkbox').checked
            let guardarImagens = null;
            
            if(fotoFinal){
                guardarImagens = await fetch(url + '/upload?k=' + token, {method: 'put', body: fotoFinal}).then(r => r.text())
            }


            console.log('corno' + JSON.stringify({nome: nomeUsuario,duasetapas: duasEtapasFinal, foto: guardarImagens}))
            fetch(urlData + '/perfil?k=' + token,{method:'POST',body: JSON.stringify({nome: nomeUsuario,duasetapas: duasEtapasFinal, foto: guardarImagens})}).then(r => r.json()).then(j => console.log(j))
        }
        document.getElementById('buttonSalvar').addEventListener('click', enviarUsuario)
    })
);
console.log('logo');
document.getElementById('buttonSenha').addEventListener('click' ,modalRedefinirSenha); 
document.getElementById('buttonCancelar').addEventListener('click' ,fecharModal); 

}

document.getElementById('abrirPerfil').addEventListener('click', abreModalUsuario);

// var modal = document.getElementById('modalUsuario');
//     modal.addEventListener('click', function(e) {
//     if (e.target == this) fecha();
//     });

//     function abre() {
//     modal.style.display = 'flex';
//     }

//     function fecha() {
//     modal.style.display = 'none';
//     }
//     abre();
