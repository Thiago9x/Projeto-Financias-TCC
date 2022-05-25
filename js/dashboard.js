'use strict';
// CONSUMIR A API DA DASHBOARD
const monthNow = new Date().getUTCMonth() + 1;
const yearNow = new Date().getUTCFullYear();
let selectTransferencia = document.getElementById('selectTrans')
const selectMes = document.getElementById('selectMes');
document.querySelector('#selectMes > option[value="' + (monthNow) + '"]').selected = true;
const ws = new WebSocket(wsUrl + '/dashboard/' + token);
const urlData = url + "/data";

let categoriaReceita;
let categoriaDespesa;
const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
	"Julho", "Agosto", "Stembro", "Outubro", "Novembro", "Dezembro"
];
const getNameMonth = function (date) {
	return monthNames[date.getMonth()];
}
const getShortMonthName = function (date) {
	return monthNames[date.getMonth()].substring(0, 3);
}
const formatador = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

//FECHAR MODAIS E ENVIAR INFORMACOES PARA A DASHBOARD
ws.onmessage = ({ data }) => {

	const json = JSON.parse(data);

	console.log(json);

	switch (json.metodo) {
		case 'despesa':
			{
				switch (json.arg) {
					case 'remover':
						{
							atualizarSaldo();
							break;
						}
				}
				break;
			}
	}
	switch (json.metodo) {
		case 'receita':
			{
				switch (json.arg) {
					case 'adicionar':
						{
							atualizarSaldo();
							break;
						}
				}
				break;
			}
	}
}

const atualizarSaldo = () =>
fetch(`${urlData}/saldo?k=${token}`)
	.then((resposta) => resposta.json())
	.then((data) => {

		let saldo = data.saldo;
		let receita = data.receita;
		let despesa = data.despesa;
		document.getElementById('saldoGeral').innerText = `R$ ${formatador.format(saldo)}`;
		document.getElementById('receita').innerText = `R$ ${formatador.format(receita)}`;
		document.getElementById('despesa').innerText = `R$ ${formatador.format(despesa)}`;

		updateChart();

	});

selecionarModal(document.getElementById('modalGigante'))
//MODAL DE TRANSFERENCIA

const modalTransferencia = (transferencia, descricao, valor, date, categoria, anexo, fixa, nomeFrequencia, observacao, parcelada, parcelas, favoritos) => {

	conteudoModal(` 

    <link rel="stylesheet" type="text/css" href="./style/despesas.css">
    <div id='main'>
   
    <div id="borda"> 
    <div id="text"> 
        <h3>Nova ${transferencia}</h3>
        </div>
        <img src="./img/x.svg" alt="" class="fotoX">  
    </div>
    <form id='requires'> 
        <!-- conteudo da nova despesa --> 
    <div id="conteudo">
            <label>Descrição</label>
            <input type="text" value="${descricao}" placeholder="" maxlength="500" class="descricao estilizacao" required>
        <div id="valorData">
            <div class="caixa2">
            <label>Valor</label>
            <input type="text" value="${valor}" maxlength="500" class="valor estilizacao" required>
            </div>
            <div class="caixa2">
            <label>Data</label>
            <input type="date" placeholder="" value="${date}" maxlength="500" class="date estilizacao" required>
            </div>
        </div>
            <label >Categoria</label>
        <select id='selectCat'>
        <option value="" selected="" disabled="">Escolha uma opcao</option>
        </select>
       </div>
       
       <!-- Div dos Botões -->
   
       <div id="botao">
            <div id="bolinhas">
                <img src="./img/repetir.svg" alt="" class="repetir btnImg1" id="repetir-button">
                <p>Repetir</p>
            </div>
            <div id="bolinhas">
                 <img src="./img/observacao.svg" alt=""  class="repetir btnImg2" id="observacao-button">
                 <p id="obsp"> Observação</p>
            </div>
            <div id="bolinhas">
                 <img src="./img/anexo.svg" alt class="repetir btnImg3" id="anexo-button">    
                 <p>Anexo</p>
            </div>
            <div id="bolinhas">
                <img src="./img/favorito.svg" alt="" class="repetir btnImg4" id="favorito-button">  
                <p>Favoritos</p>
            </div>
       </div>
     <div>
    </div>

        <!-- Inicio dos conteudos dos botões -->

        <!-- conteudo de repetição -->
    <div class="repeticao" id="repeticao"> 
           <div id="conteudo2">
                <h4>Repetição</h4>
            <div class="caixa1">
                <label >Frequencia de repetição</label>
                <select id='selectFR' class="estilizacao">
                <option value="" selected disabled="">Escolha uma opcao</option>
                    <option value='DIAS'>Dias</option>
                    <option value='SEMANAS'>Semanas</option>
                    <option value='QUINZENAS'>Quinzenas</option>
                    <option value='MESES'>Meses</option>
                    <option value='BIMESTRES'>Bimestres</option>
                    <option value='TRIMESTRES'>Trimestres</option>
                    <option value='SEMESTRES'>Semestres</option>
                    <option value='ANOS'>Anos</option>
                </select>
            </div>
            <div id="duracaoData">
                <div class="caixa3">
                <label>Parcelas</label>
                <input type="text" placeholder="" maxlength="500" value='${parcelas}' maxlength='3' class="duracao estilizacao">
                </div>
                <div class="caixa3">
                <label>Data Fim</label>
                <input type="date" placeholder="" maxlength="500" class="dateFim estilizacao">
                </div>
            </div>
            <div id="fixa">
                <div id="baseline">
                    <input type="checkbox" id="transFixa" ${fixa !== true ? "" : "checked"}><label>Transferência fixa</label>
                </div>
                <p id="descricaoFixa">Quando você desejar cancelar a despesa fixa, vá na tela conta e remova a transferência</p>
            </div>
           
        </div>
     </div>

        <!-- conteudo de observação -->
     <div class="observacao" id="observacao"> 
          <div  id="conteudo3">
            
                <h4>Observação</h4>
                <textarea placeholder="" maxlength="500" class="obs estilizacao">${observacao}</textarea>
                </div>
          
     </div>
        <!-- conteudo do anexo -->
     <div class="anexo" id="anexo">
        <div  id="conteudo4">
            <h4>Anexo</h4>
            
                 <input type="file" name="image" id="format anexos" accept='.jpg,.jpeg,.png,.svg'>
           
        </div>
   </div>

        <!-- botão de confirmacão -->
    <div id="confirmar">
        <img src="./img/concluir.svg" alt="" class="concluir">  
     </div>
     </form>
</div>
`)
	abrirModal()

	//DATA ATUAL
	let data = document.querySelector('.date');
	data.valueAsDate = new Date();

	//PARTE DE REPETICAO
	let dataFR = document.getElementById('selectFR');
	let dataInicio = document.querySelector('.date');
	let dataFim = document.querySelector('.dateFim');
	let duracao = document.querySelector('.duracao');

	//SELECIONAR CATEGORIA TRANSFERENCIA
	const selectCat = document.getElementById("selectCat");
	if (transferencia === 'receita') {
		categoriaReceita.forEach(categoria => {
			const option = document.createElement("option");
			option.value = categoria.idCategoria;
			option.innerText = categoria.nome;

			selectCat.appendChild(option);

		});
	} else if (transferencia === 'despesa') {
		categoriaDespesa.forEach(categoria => {
			const option = document.createElement("option");
			option.value = categoria.idCategoria;
			option.innerText = categoria.nome;

			selectCat.appendChild(option);
		});
	}
	document.querySelector('#selectCat > option[value="' + (categoria) + '"]').selected = true;

	//PARTES DAS BOLINHAS BOTOES

	const btnImg1 = document.querySelector('.btnImg1');

	const btnImg2 = document.querySelector('.btnImg2');

	const btnImg3 = document.querySelector('.btnImg3');

	const btnImg4 = document.querySelector('.btnImg4');


	let repetido = !parcelada;
	let observado = !observacao;
	let anexado = false;
	let favoritado = !favoritos;



	btnImg1.onclick = () => {
		if (repetido) {
			repetido = false;
			btnImg1.src = './img/repetir.svg'
			document.getElementById('repeticao').style.display = 'none';
		} else {
			repetido = true;
			btnImg1.src = './img/repetirr.svg'
			document.querySelector('#selectFR > option[value="' + (nomeFrequencia) + '"]').selected = true;
			document.getElementById('repeticao').style.display = 'block';


			dataInicio.onchange = e => {


				switch (dataFR.value) {
					case 'DIAS':
						{
							let dataObjeto = dataInicio.valueAsDate;

							dataObjeto.setUTCDate(parseInt(duracao.value - 1) + dataObjeto.getUTCDate());

							dataFim.valueAsDate = dataObjeto;
							break;
						}
					case 'SEMANAS':
						{
							let dataObjeto = dataInicio.valueAsDate;

							dataObjeto.setUTCDate(7 * parseInt(duracao.value - 1) + dataObjeto.getUTCDate());

							dataFim.valueAsDate = dataObjeto;
							break;
						}
					case 'QUINZENAS':
						{
							let dataObjeto = dataInicio.valueAsDate;

							dataObjeto.setUTCDate(15 * parseInt(duracao.value - 1) + dataObjeto.getUTCDate());

							dataFim.valueAsDate = dataObjeto;
							break;
						} case 'MESES':
						{
							let dataObjeto = dataInicio.valueAsDate;

							dataObjeto.setUTCMonth(parseInt(duracao.value - 1) + dataObjeto.getUTCMonth());

							dataFim.valueAsDate = dataObjeto;
							break;
						} case 'BIMESTRES':
						{
							let dataObjeto = dataInicio.valueAsDate;

							dataObjeto.setUTCMonth(2 * parseInt(duracao.value - 1) + dataObjeto.getUTCMonth());

							dataFim.valueAsDate = dataObjeto;
							break;
						} case 'TRIMESTRES':
						{
							let dataObjeto = dataInicio.valueAsDate;

							dataObjeto.setUTCMonth(3 * parseInt(duracao.value - 1) + dataObjeto.getUTCMonth());

							dataFim.valueAsDate = dataObjeto;
							break;
						}
					case 'SEMESTRES':
						{
							let dataObjeto = dataInicio.valueAsDate;

							dataObjeto.setUTCMonth(6 * parseInt(duracao.value - 1) + dataObjeto.getUTCMonth());

							dataFim.valueAsDate = dataObjeto;
							break;
						}
					case 'ANOS':
						{
							let dataObjeto = dataInicio.valueAsDate;

							dataObjeto.setUTCFullYear(parseInt(duracao.value - 1) + dataObjeto.getUTCFullYear());

							dataFim.valueAsDate = dataObjeto;
							break;
						}
				}
			}

			dataFR.onchange = () => dataInicio.onchange();
			duracao.oninput = () => dataInicio.onchange();

			dataInicio.onchange();

			const DIA = 1000 * 60 * 60 * 24;

			dataFim.onchange = () => {
				switch (dataFR.value) {
					case 'DIAS':
						{
							if (dataFim.valueAsNumber >= dataInicio.valueAsNumber) {
								duracao.value = Math.floor((dataFim.valueAsDate - dataInicio.valueAsDate) / DIA) + 1;
							} else {
								duracao.value = 0;
							}
							break;
						}
					case 'SEMANAS':
						{
							if (dataFim.valueAsNumber >= dataInicio.valueAsNumber) {
								duracao.value = Math.floor((dataFim.valueAsDate - dataInicio.valueAsDate) / DIA / 7) + 1;
							} else {
								duracao.value = 0;
							}
							break;
						}
					case 'QUINZENAS':
						{
							if (dataFim.valueAsNumber >= dataInicio.valueAsNumber) {
								duracao.value = Math.floor((dataFim.valueAsDate - dataInicio.valueAsDate) / DIA / 15) + 1;
							} else {
								duracao.value = 0;
							}
							break;
						}
					case 'MESES':
						{
							if (dataFim.valueAsNumber >= dataInicio.valueAsNumber) {
								const data = new Date(dataFim.valueAsDate - dataInicio.valueAsDate);
								duracao.value = ((data.getUTCFullYear() - 1970) * 12) + data.getUTCMonth() + 1;
							} else {
								duracao.value = 0;
							}
							break;
						}
					case 'BIMESTRES':
						{
							if (dataFim.valueAsNumber >= dataInicio.valueAsNumber) {
								const data = new Date(dataFim.valueAsDate - dataInicio.valueAsDate);
								duracao.value = (((data.getUTCFullYear() - 1970) * 12) + data.getUTCMonth()) / 2 + 1;
							} else {
								duracao.value = 0;
							}
							break;
						}
					case 'TRIMESTRES':
						{
							if (dataFim.valueAsNumber >= dataInicio.valueAsNumber) {
								const data = new Date(dataFim.valueAsDate - dataInicio.valueAsDate);
								duracao.value = (((data.getUTCFullYear() - 1970) * 12) + data.getUTCMonth()) / 3 + 1;
							} else {
								duracao.value = 0;
							}
							break;
						}
					case 'SEMESTRES':
						{
							if (dataFim.valueAsNumber >= dataInicio.valueAsNumber) {
								const data = new Date(dataFim.valueAsDate - dataInicio.valueAsDate);
								duracao.value = (((data.getUTCFullYear() - 1970) * 12) + data.getUTCMonth()) / 6 + 1;
							} else {
								duracao.value = 0;
							}
							break;
						}
					case 'ANOS':
						{
							if (dataFim.valueAsNumber >= dataInicio.valueAsNumber) {
								const data = new Date(dataFim.valueAsDate - dataInicio.valueAsDate);
								duracao.value = data.getUTCFullYear() - 1970 + 1;
							} else {
								duracao.value = 0;
							}
							break;
						}

				}
			}
		}
	}
	btnImg1.onclick();
	btnImg2.onclick = () => {
		if (observado) {
			observado = false;
			btnImg2.src = 'img/observacao.svg'
			document.getElementById('observacao').style.display = 'none';
		} else {
			observado = true;
			btnImg2.src = 'img/observacaoo.svg'
			document.getElementById('observacao').style.display = 'block';
		}
	}
	btnImg2.onclick();

	btnImg3.onclick = () => {
		if (anexado) {
			anexado = false;
			btnImg3.src = 'img/anexo.svg'
			document.getElementById('anexo').style.display = 'none';
		} else {
			anexado = true;
			btnImg3.src = 'img/anexoo.svg'
			document.getElementById('anexo').style.display = 'block';
		}
	}

	btnImg4.onclick = () => {
		if (favoritado) {
			favoritado = false;
			btnImg4.src = 'img/favorito.svg'

		} else {
			favoritado = true;
			btnImg4.src = 'img/favoritoo.svg'

		}
	}

	btnImg4.onclick();

	const opcao1 = () => {
		document.getElementById('repeticao').classList.add('aparecer')
	}
	document.getElementById('repetir-button').addEventListener('click', opcao1)

	const opcao2 = () => {
		document.getElementById('observacao').classList.add('aparecer')
	}
	document.getElementById('observacao-button').addEventListener('click', opcao2)

	const opcao3 = () => {
		document.getElementById('anexo').classList.add('aparecer')
	}
	document.getElementById('anexo-button').addEventListener('click', opcao3)

	//FIM DOS BOTOES
	//TRANSFERENCIA FIXA
	let transFixa = document.getElementById('transFixa');
	const desabilitaCaixa = () => {
		const duracao = document.querySelector(".duracao");
		const datefim = document.querySelector(".dateFim");
		if (transFixa.checked) {
			duracao.disabled = true;
			datefim.disabled = true;
		} else {
			duracao.disabled = false;
			datefim.disabled = false;
		}
	}
	transFixa.addEventListener('change', desabilitaCaixa);


	//FIM TRANSFERENCIA FIXA
	//FORMATACAO DO VALOR
	const format = (e) => {
		console.log(e)

		let value = e.target.value;
		value = value.replace('.', '').replace(',', '').replace(/\D/g, '')

		const result = formatador.format(
			parseFloat(value) / 100
		)



		e.target.value = 'R$ ' + result.replace('NaN', '0,00');
	}
	//FIM DA FORMATACAO

	//CONFIRMAR A RECEITA
	const enviar = () => {
		let valorEnviar = parseFloat(document.querySelector('.valor').value.replaceAll('R$ ', '').replaceAll('.', '').replaceAll(',', '.'))
		let descricaoEnviar = document.querySelector('.descricao').value
		let idCategoria = parseInt(document.querySelector('#selectCat').value)
		let observacaoEnviar = document.querySelector('.obs').value
		let parcelaFixa = document.getElementById('transFixa').checked
		// let anexo = document.getElementById('anexos').value

		const confirmacaoCampos = document.getElementById('requires').reportValidity();
		if (confirmacaoCampos == true && !isNaN(idCategoria)) {

			ws.send(JSON.stringify({
				metodo: transferencia, arg: 'inserir', valor: valorEnviar, data: data.value, descricao: descricaoEnviar, favorito: favoritado, fixa: parcelaFixa,
				totalParcelas: (repetido && duracao.value ? parseInt(duracao.value) : null),
				frequencia: dataFR.value !== '' ? dataFR.value : null, observacao: observacaoEnviar, idCategoria: idCategoria, parcelada: repetido
			}));

			fecharModal();

		}
	}

	document.querySelector('.fotoX').addEventListener('click', fecharModal);



	document.querySelector('.valor').addEventListener('input', format);

	document.querySelector('.concluir').addEventListener('click', enviar);

}
//FIM DA CONFIRMACAO TRANSFERENCIA
document.getElementById('receitaCont').addEventListener('click', () => modalTransferencia('receita', '', 'R$ 0,00', '', '', '', false, '', '', false, 1, false))
document.getElementById('despesaCont').addEventListener('click', () => modalTransferencia('despesa', '', 'R$ 0,00', '', '', '', false, '', '', false, 1, false))

console.log(fetch(`${urlData}/saldo/categorias/perfil?k=${token}`)
	.then((resposta) => resposta.json())
	.then((data) => {

		let saldo = data[0].saldo;
		let receita = data[0].receita;
		let despesa = data[0].despesa;
		categoriaReceita = data[1].receitas;
		categoriaDespesa = data[1].despesas;
		let nomeUsuario = data[2].nome;
		document.getElementById('nomeCliente').innerText = nomeUsuario;
		document.getElementById('saldoGeral').innerText = `R$ ${formatador.format(saldo)}`;
		document.getElementById('receita').innerText = `R$ ${formatador.format(receita)}`;
		document.getElementById('despesa').innerText = `R$ ${formatador.format(despesa)}`;

		updateChart();

	})
);

// GRAFICO PINCIPAL DE BARRA
const nomeGrafico = () => {
	let nome = document.getElementById('tituloInfor');
	nome.innerText = 'Lista de maiores ' + selectTransferencia.value + 's'
}
document.getElementById('selectTrans').addEventListener('change', nomeGrafico)



const ctx = document.getElementById('graficoPuro').getContext('2d');

const myChart = new Chart(ctx, {
	plugins: [ChartDataLabels],
	type: 'bar',
	data: {

		labels: [],
		datasets: [{
			data: [],
			backgroundColor: []
		}]
	},
	options: {
		scales: {
			x: {
				grid: {
					display: false
				}
			},
			y: {
				grid: {
					display: false
				}
			}
		},
		indexAxis: 'y',
		elements: {
			bar: {
				borderWidth: 2,
			}
		},
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
				position: 'right',
			},
			datalabels: {
				display: false,
				color: '#000',
				anchor: 'end',

				align: 'end',
				offset: 24,
				font: {
					size: '20px',
					weight: 'bold'
				}
			}
		}
	},
});

const updateChart = () => {
	fetch(url + '/grafico/' + selectTransferencia.value + '?ano=' + yearNow + '&mes=' + selectMes.value + '&k=' + token)
		.then((resposta) => resposta.json())
		.then((data) => {
			let labels = [];
			let dataGrafico = [];
			let corGrafico = [];

			Object.entries(data).forEach((categorias) => {
				let idCategorias = categorias[0];
				console.log(idCategorias)
				if (selectTransferencia.value === 'despesa') {
					const categoriaDespesas = categoriaDespesa.find(categoria => categoria.idCategoria == idCategorias);
					labels.push(categoriaDespesas.nome)
					dataGrafico.push(categorias[1])
					corGrafico.push('#' + categoriaDespesas.cor)
				} else if (selectTransferencia.value === 'receita') {
					const categoriaReceitas = categoriaReceita.find(categoria => categoria.idCategoria == idCategorias);
					labels.push(categoriaReceitas.nome)
					dataGrafico.push(categorias[1])
					corGrafico.push('#' + categoriaReceitas.cor)
				}

			});


			myChart.data.labels = labels;
			myChart.data.datasets[0].data = dataGrafico;
			myChart.data.datasets[0].backgroundColor = corGrafico;

			myChart.update()


		});
};

selectTransferencia.addEventListener('change', updateChart)

selectMes.addEventListener('change', updateChart)
// FIM GRAFICO MENSAL

// GRAFICO SECUNDARIO
const myChartSecundario = new Chart(document.querySelector('.card').getContext('2d'), {
	plugins: [ChartDataLabels],
	type: 'bar',
	data: {
		labels: ['Receitas', 'Despesas'],
		datasets: [{
			hoverBorderWidth: 1,
			data: [0, 0],
			backgroundColor: [
				'#32A40A',
				'#E70000'
			]
		}]
	},
	options: {
		scales: {
			x: {
				grid: {
					display: false
				},
				ticks: {
					display: false
				}
			},
			y: {
				grid: {
					display: false
				}
			}
		},
		indexAxis: 'y',
		// Elements options apply to all of the options unless overridden in a dataset
		// In this case, we are setting the border of each horizontal bar to be 2px wide
		elements: {
			bar: {
				borderWidth: 2,
			}
		},
		responsive: true,
		maintainAspectRatio: false,

		plugins: {
			legend: {
				display: false,
				position: 'right',
			},
			title: {
				display: true,
				text: 'Grafico de Despesa e Receita do mês de ' + getNameMonth((new Date())),
				font: { weight: 'bold', size: '16em' },
				align: 'start',
				color: 'black',
				padding: '10'
			},
			datalabels: {
				display: false,
				color: '#000000',
				anchor: 'end',
				formatter: function (value) {
					return "R$ " + formatador.format(value);
				},
				align: 'end',
				offset: 24,
				font: {
					size: '16px',
					weight: 'bold'
				}
			}
		}
	}
});



const urlSec = urlData + '/saldo?k=' + token + '&ano=' + yearNow + '&mes=' + (monthNow);
const updateSecundario = () => {
	fetch(urlSec)
	.then((resposta) => resposta.json())
	.then((data) => {
		const saldoMensal = document.getElementById('saldoMesValor');
		saldoMensal.innerText = 'R$ ' + formatador.format(data.saldo);
		const saldoMensalTXT = document.getElementById('saldo-mensal');
		saldoMensalTXT.innerText = 'Saldo Mensal';
		myChartSecundario.data.datasets[0].data = [data.receita, data.despesa];
		myChartSecundario.update();

	});
}
updateSecundario();
// FIM GRAFICO SECUNDARIO


//MODAL FAVORITOS
const modalFavoritos = () => {
	const urlFavoritos = urlData + '/favorito?k=' + token;

	fetch(urlFavoritos)
		.then((resposta) => resposta.json())
		.then((data) => {
			console.log(data);
			conteudoModal(`
			<link rel="stylesheet" type="text/css" href="./style/favoritos.css">
			<link rel="stylesheet" type="text/css" href="./style/style.css">
			<link rel="stylesheet" type="text/css" href="./font/icon.css">
			<div id="mainfavorito">

     
            <div id="containerFavorito">

                <div class="botaoReceita" id="receitaFavorito">

                    <div class="im">
                        <img src="img/maisVerde.png" class="editarIcone">
                    </div>
                    
                    <p>Adicionar<br>Receita</p>

                </div>

                <div class="tituloFavorito">

                    <img src="./img/estrelaExtrato.svg" class="estrela">
                    <h3>Transações Favoritas</h3>

                </div>
                <div class="botaoReceita" id='despesaFavorito'>

                    <div class="im">
                        <img src="img/menos.png" class="editarIcone">
                    </div>
                    <p>Adicionar<br>Despesa</p>

                </div>
            </div>


            <div id="caixas">
            </div>

            <div class="botao">
                <input id="button1" class="voltarDash" type="button" value="Voltar">
            </div>
         

        </div>         `
			)
			const adicionarReceitaFavoritos = () => {
				modalTransferencia('receita', '', 'R$ 0,00', '', '', '', false, '', '', false, 1, true);
			}
			const adicionarDespesaFavoritos = () => {
				modalTransferencia('despesa', '', 'R$ 0,00', '', '', '', false, '', '', false, 1, true);
			}
			
			const adicionarDespesa = document.getElementById('despesaFavorito');
			const adicionarReceita = document.getElementById('receitaFavorito');
			adicionarDespesa.addEventListener('click', adicionarDespesaFavoritos);
			adicionarReceita.addEventListener('click', adicionarReceitaFavoritos);



			const boxConteudo = document.getElementById('caixas');



			for (let i = 0; i < data.length; i++) {
				let valor = data[i].valor;
				let anexo = data[i].anexo;
				let transferencia;
				let fixa = data[i].fixa;
				let nomeFrequencia = data[i].nomeFrequencia;
				let observacao = data[i].observacao;
				let parcelada = data[i].parcelada;
				let parcelas = data[i].parcelas;
				let descricao = data[i].descricao;
				let cor;
				let date = data[i].data;

				console.log(data, valor);
				let categoria = data[i].categoria;
				if (valor > 0) {
					categoria = categoriaReceita.find(categor => categoria == categor.idCategoria);
					cor = "verde";
					transferencia = "receita";
				}
				else if (valor < 0) {
					categoria = categoriaDespesa.find(categor => categoria == categor.idCategoria);
					cor = "vermelho";
					transferencia = "despesa"
				}


				const caixa1 = document.createElement('div');

				caixa1.classList.add('caixa1');
				caixa1.innerHTML = `<div class="containerInfo">

				<div class="containerImagem icons">
					${categoria.icone}
				</div>

				<div class="containerText">
					<label class="textCategoria">${categoria.nome}</label>
					<label class="textLugar">${descricao}</label>
					<label class="textValor ${cor}" > ${'R$ ' + formatador.format(valor)} </label>
				</div>

			</div>

			<div class="containerInfoData">
				<label class="dataFormatacao"> ${getShortMonthName(new Date(date))} <br> ${new Date(date).getUTCFullYear()}</label>
			</div>`;

				const editImgExcluir = document.createElement('div');
				
				editImgExcluir.classList.add('editImgExcluir');

				editImgExcluir.innerHTML = ` 
                    <img src="./img/excluir.svg">
                 `;

				const abrirTransfInformada = () => {
					console.log(parcelada, parcelas, nomeFrequencia)
					modalTransferencia(transferencia, descricao, 'R$ ' + formatador.format(valor), date, categoria.idCategoria, anexo, fixa, nomeFrequencia, observacao, parcelada, parcelas, false)

				}
				caixa1.addEventListener('click', abrirTransfInformada)

				boxConteudo.append(caixa1, editImgExcluir);
				
			}
			document.querySelector('.voltarDash').addEventListener('click',fecharModal);
		})
	abrirModal();
	

}

document.getElementById('favoritosCont').addEventListener('click', modalFavoritos)
document.getElementById('extratoCont').addEventListener('click', () => {
	window.location.href = "./extrato.html"
})


