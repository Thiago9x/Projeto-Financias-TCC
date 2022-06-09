const urlListaFixa = urlData + "/fixa?k=" + token

fetch(urlListaFixa)
	.then((resposta) => resposta.json())
	.then((data) => {
		console.log(data);

	});