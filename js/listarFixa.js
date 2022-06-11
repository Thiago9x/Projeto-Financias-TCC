const urlListaFixa = urlData + "/fixa?k=" + token
const divPai = document.getElementById('fixaConteudo')
fetch(urlListaFixa)
	.then((resposta) => resposta.json())
	.then((data) => {
		data.forEach((Fixa) =>{
			const criarDiv = document.createElement("div")
				divPai.appendChild(criarDiv)
				let idcategoria = Fixa.categoria;
				let categoria;
				if (Fixa.valor < 0) {
					categoria = categoriaDespesa.find(categor => idcategoria == categor.idCategoria);
				}
				else if (Fixa.valor > 0) {
					categoria = categoriaReceita.find(categor => idcategoria == categor.idCategoria);
				}
				criarDiv.className = "despesaPendente"
				criarDiv.innerHTML = `



				<div class="icone">
					<div class="icons iconsFixa" title="Icone categoria">
						${categoria.icone}
					</div>
				</div>

				<div class="principalMeio">
					<div id="parteCima">
						<div class="t1 descFixa" title="Descrição da transferência">
							${Fixa.descricao}
						</div>

						<div class="t1 parcFixa" title="Quantidade de parcelas">
							${"Parcelas: " + Fixa.parcelas}
						</div>
					</div>
					<div id="parteBaixa">
						<div class="valorPendente baseFixa" title="Valor da parcela">
							${"R$ " + formatador.format(Fixa.valor)}
						</div>
						<div class="valorPendente totalFixa" title="Valor total">
							${"R$ " + formatador.format(Fixa.valor * Fixa.parcelas)}
						</div>
					</div>
				</div>
				<img src="./img/excluir.svg" class="formatarImgExcluir">
			`

			const excluirFixa = () =>{
				if(confirm("Você deseja desfixar essa transferência ?")){
					fetch(urlData + "/desfixar?k=" + token, {method: 'post', body: JSON.stringify({id: Fixa.id})}).then((resposta) => resposta.json()).then(data)
						criarDiv.remove()
				}
				else{}
			}
			console.log(criarDiv);
			criarDiv.querySelector('img').addEventListener('click' , excluirFixa)
		})
	});