'use strict'
//FUNÇAO DE VALIDACAO PARA FAZER O POST
const enviarCodigo = () => {
    const email = new URLSearchParams(window.location.search).get('email');
    let codigo = '';
    console.log(document.querySelectorAll(".quadradinhos > *").forEach((t) => codigo += t.value))

    const confirmacaoCampos = document.getElementById('main').reportValidity();
    if(confirmacaoCampos == true){
    
    
    let url = 'http://10.107.144.22:8080/royal/resetar';

    console.log(fetch(url, {method: 'POST', headers: {
        // 'content-type': 'application/json', 
    }, body:JSON.stringify( {email: email,  codigo: codigo, tipo: 'USAR'}),
    })
    .then((resposta) => resposta.json())
    .then((data) => { if(data.status === Status.OK){
        if(data.reset == true){
            window.location.href = "../redefinicaoSenha.html?email="+email;
        }
        else{
            alert("O código inserido é invalido ")
        }
    }
    else{
        alert('ERRO:Aconteceu algum erro')
    }
    })
    ); 
}

else{
    alert('OS CAMPOS NÃO FORAM PREENCHIDOS CORRETAMENTE');
}
}

document.querySelector(".botao").addEventListener("click", enviarCodigo);

