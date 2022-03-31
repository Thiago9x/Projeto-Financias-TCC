// Fazendo Script para os olhinhos de senha ( 22/ mar /2022 )

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
    
    let url = 'http://10.107.144.12:8080/royal/cadastro';

        console.log(fetch(url, {method: 'POST', headers: {
            // 'content-type': 'application/json', 
        }, body:JSON.stringify( {email: email,  nome: nome, senha:senhaFinal}),
        })
        .then((resposta) => resposta.json())
        .then((data) => {
            if(data.status === Status.OK){
                alert("Cadastro efetuado com sucesso")
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

