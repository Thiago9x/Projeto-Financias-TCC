'use strict'
//FUNÇAO DE VALIDACAO PARA FAZER O POST
const pesquisarEmail = () => {

	const email = document.getElementById('email').value;

	const confirmacaoCampos = document.getElementById('principal').reportValidity();
	if (confirmacaoCampos === true) {


		fetch(url + '/resetar', {method: 'POST', headers: {
				// 'content-type': 'application/json', 
			}, body: JSON.stringify({email: email, tipo: 'PEDIR'}),
		}).then(response => response.json())
				.then(() => {
					window.location.href = "./codigo.html?email=" + email;
				});

	} else {
		alert('OS CAMPOS NÃO FORAM PREENCHIDOS CORRETAMENTE');
	}
}

document.getElementById("button").addEventListener("click", pesquisarEmail);

