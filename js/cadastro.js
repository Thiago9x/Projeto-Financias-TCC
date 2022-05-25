"use strict"

const senhaCadastro = document.querySelector('.senhaCadastro');
const senhaCadastro2 = document.querySelector('.senhaCadastro2');
const btnOlho = document.querySelector('.btnOlho');
const btnOlho2 = document.querySelector('.btnOlho2');
btnOlho.onclick = () => {
    if (senhaCadastro.type === 'text') {
        senhaCadastro.type = 'password'
        btnOlho.src = 'img/Hide.svg'
    } else {
        senhaCadastro.type = 'text'
        btnOlho.src = 'img/MostrarSenha.svg'
    }
}

btnOlho2.onclick = () => {
    if (senhaCadastro2.type === 'text') {
        senhaCadastro2.type = 'password'
        btnOlho2.src = 'img/Hide.svg'
    } else {
        senhaCadastro2.type = 'text'
        btnOlho2.src = 'img/MostrarSenha.svg'
    }
}

// barra de forca da senha

function validarSenhaForca() {
    let senha = document.querySelector('.senhaCadastro').value;
    var forca = 0;
    // document.getElementById('impSenha').innerHTML = "Senha: " + senha;

    if((senha.length >= 4) && (senha.length <= 7)){
        forca += 10;
    }else if(senha.length > 7){
        forca += 25;
    }

    if((senha.length >= 5) && (senha.match(/[a-z]+/))){
        forca += 10;
    }

    if((senha.length >= 6) && (senha.match(/[A-Z]/))){
        forca += 20;
    }

    if((senha.length >=7) && (senha.match(/[@#$%&*!;]/))){
        forca += 25
    }

    if(senha.match(/([1-9]+)\1{1,}/)){
		forca += -25;
	}

     mostrarForca(forca)
     console.log(mostrarForca);

}

function mostrarForca(forca){
    /*imprimir a forca*/
   //document.getElementById("impForcaSenha").innerHTML = "Forca: " + forca;

    if(forca === 0 ){
        document.getElementById("erroSenhaForca").innerHTML = '<div class="progress"><div class="progress-bar bg-light" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div>';
    } else if((forca > 0) && (forca < 40)){
        document.getElementById("erroSenhaForca").innerHTML = '<div class="progress"><div class="progress-bar bg-danger" role="progressbar" style="width: 10%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div></div>';
    } else if ((forca >= 40) && (forca < 70)){
        document.getElementById("erroSenhaForca").innerHTML =  '<div class="progress"><div class="progress-bar bg-warning" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div></div>';
    } else if ((forca >= 70) && (forca < 100)){
        document.getElementById("erroSenhaForca").innerHTML =  '<div class="progress"><div class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div></div>';
    }
}
//CONSUMINDO A API


//FUNÇAO DE VALIDACAO PARA FAZER O POST
const fazerCadastro = () => {

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senhaCadastrovalue = document.querySelector('.senhaCadastro').value;
    const senhaCadastro2value = document.querySelector('.senhaCadastro2').value;

    const confirmacaoCampos = document.getElementById('principal').reportValidity();
    if(confirmacaoCampos == true){
    
        if(senhaCadastrovalue === senhaCadastro2value){
    
    var senhaFinal = senhaCadastrovalue;
    
    
        console.log(fetch(url + '/cadastro', {method: 'POST', headers: {
            'content-type': 'application/json', 
        }, body:JSON.stringify( {email: email,  nome: nome, senha:senhaFinal}),
        })
        .then((resposta) => resposta.json())
        .then((data) => {
            if(data.status === Status.OK){
                window.location.href="../index.html"
            }
            else if(data.status === Status.EMAIL_REPETIDO){
                alert("ERRO:Esse email ja existe")
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
document.getElementById("button").addEventListener("click", fazerCadastro);

