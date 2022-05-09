'use strict'
//FUNÇAO DE VALIDACAO PARA FAZER O POST
const pesquisarEmail = () => {

    const email = document.getElementById('email').value;

    const confirmacaoCampos = document.getElementById('principal').reportValidity();
    if(confirmacaoCampos == true){
    
    
    let url = 'http://10.107.144.11:8080/royal/resetar';

        console.log(fetch(url, {method: 'POST', headers: {
            // 'content-type': 'application/json', 
        }, body:JSON.stringify( {email: email, tipo: 'PEDIR'}),
        })
        );
        
        window.location.href = "../codigo.html?email="+email;
    }

else{
    alert('OS CAMPOS NÃO FORAM PREENCHIDOS CORRETAMENTE');
}
}

document.getElementById("button").addEventListener("click", pesquisarEmail);

