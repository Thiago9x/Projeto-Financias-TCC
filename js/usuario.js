// ABRE A MODAL DE USUARIO
criarModal()
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
                <input id="editarAsInputsUsuario" type="text" class="edit nomeCliente" placeholder="Digite seu nome" > 
            </div>
        
            <div id="conteudoUsuario">
                <h7 class="h7">Email</h7>
                <input id="editarAsInputsUsuario"type="text" class="edit emailUsuario" placeholder="fulano@gmail.com"> 
            </div>
        
            <div id="conteudoUsuario2">
        
                <!-- <h7 class="h7">Segurança</h7> -->
        
                <div class="textH7">Segurança</div>
        
               
                <div class="guardaBotao">
        
                    <input id="buttonSenha" type="button" value="Trocar Senha"> 
                    
                </div>       
            </div>
            <div id="botoesSalvarCancelar">

                <input id="buttonCancelar" class="cancelar" type="button" value="Cancelar">
                <input id="buttonSalvar" type="button" value="Salvar">
            </div>
        </div>
        <div id="caixaLogout">
            <div id="logout">Log-out</div>
        </div>
    </div>`)
abrirModal()
document.querySelector('#logout').addEventListener('click', () => {
    if(confirm("Tem certeza que deseja sair da sua conta ?"))
    {
        window.location.href = "./index.html"
    }
    else{}
})

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
document.querySelector('.cancelar').addEventListener('click', fecharModal);

//CONEXÃO COM A API
console.log(fetch(`${url}/data/perfil?k=${token}`)
    .then((resposta) => resposta.json())
    .then((data) => {
        console.log(data);
        let nomeUsuario = data.nome;
        const emailUsuario = data.email;
        const fotoUsuario = data.foto;
        document.getElementById('nomeUsuario').innerText = nomeUsuario;
        if(fotoUsuario){
            document.querySelector('.usuarioFoto').src = url + '/upload/' + fotoUsuario;
        }else{
            document.querySelector('.usuarioFoto').src ="./img/usuarioPerfil.svg"
        }
        
        document.querySelectorAll('.nomeCliente').forEach((nome) => {
            nome.value = nomeUsuario
            nome.innerText = nomeUsuario
        }) 
        

      

        let email = document.querySelector('.emailUsuario')
        email.value = emailUsuario;
        email.disabled = true;

       
        const enviarUsuario = async () => {
            nomeUsuario = document.querySelector('#editarAsInputsUsuario').value;
            let fotoFinal = document.querySelector('#input-file').files[0]
            let guardarImagens = null;
            
            if(fotoFinal){
                guardarImagens = await fetch(url + '/upload?k=' + token, {method: 'put', body: fotoFinal}).then(r => r.text())
                const perfilFoto = document.getElementById('perfilFoto')
		        perfilFoto.innerHTML=`<img class="fotinha" src="${url}/upload/${guardarImagens}">`
                perfilFoto.style.border = "none";
            }
            else if(fotoUsuario){
                guardarImagens = fotoUsuario
            }
            document.querySelectorAll('.nomeCliente').forEach((nome) => {
                nome.value = nomeUsuario
                nome.innerText = nomeUsuario
            }) 

           fetch(urlData + '/perfil?k=' + token,{method:'POST',body: JSON.stringify({nome: nomeUsuario,duasetapas: false, foto: guardarImagens})}).then(r => r.json()).then(j => console.log(j))
            fecharModal()
        }
        document.getElementById('buttonSalvar').addEventListener('click', enviarUsuario)
    })
);



document.getElementById('buttonSenha').addEventListener('click' ,modalRedefinirSenha); 
document.getElementById('buttonCancelar').addEventListener('click' ,fecharModal);


}

document.getElementById('abrirPerfil').addEventListener('click', abreModalUsuario);

