//PEGANDO AS INPUTS E AS SELECTS

const rdoGraficoAnual = document.getElementById('graficoAnual')
rdoGraficoAnual.checked = "true"
const rdoGraficoMensal = document.getElementById('graficoMensal')
const selectCategoria = document.getElementById('selectCategoria')
const iptValorMin = document.getElementById('valorMinimo')
const iptValorMax = document.getElementById('valorMaximo')
const chkTransfPadrao = document.getElementById('chkTransfDefault')
chkTransfPadrao.checked = true
const chkTransfFavoritado = document.getElementById('chkTransfFavoritado')
chkTransfFavoritado.checked = true
var atual = document.getElementById("total");
atual.value = new Date().getUTCFullYear();

const urlCat = url + '/data/categorias?k=' + token + '&ano=' + atual.value 
let categoriaDespesa;
let categoriaReceita;
console.log(fetch(urlCat)
    .then((resposta) => resposta.json())
    .then((data1) => {
        console.log(data1);
        categoriaReceita = data1.receitas;
        categoriaDespesa = data1.despesas;
        let validacaoCat = false;
        if (validacaoCat === false) {

            const optionReceita = document.createElement('optgroup')
            optionReceita.label = "Receitas"
            const optionDespesa = document.createElement('optgroup')
            optionDespesa.label = 'Despesas'
            categoriaReceita.forEach(categoria => {
                const option = document.createElement("option");
                option.value = categoria.idCategoria;
                option.innerText = categoria.nome;

                optionReceita.appendChild(option);

            })


            categoriaDespesa.forEach(categoria => {
                const option = document.createElement("option");
                option.value = categoria.idCategoria;
                option.innerText = categoria.nome;

                optionDespesa.appendChild(option);
            })
            selectCategoria.append(optionReceita, optionDespesa);
            validacaoCat = true;
        }
    })
)

//FIM DA PEGADA



//Grafico
const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
	"Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

const ctx = document.getElementById('graficoCanvas').getContext('2d');

const graficoAnual = new Chart(ctx, {
	type: 'bar',
	data: {

		labels: [],
		datasets: [{
			data: [],
			backgroundColor: '#e70000'
		},
		{
			data: [],
			backgroundColor: '#32A40A'
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
		indexAxis: 'x',
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

const grafico = async () =>{
    let labels = monthNames
    let dataGraficoDespesa = await fetch(url + '/grafico/despesa?k='+ token +'&ano='+atual.value+'&modo=lista&periodo=mes-ano').then(r => r.json())
    let dataGraficoReceita =  await fetch(url + '/grafico/receita?k='+ token +'&ano='+atual.value+'&modo=lista&periodo=mes-ano').then(r => r.json())

            graficoAnual.data.labels = labels;
			graficoAnual.data.datasets[0].data = dataGraficoDespesa;
			graficoAnual.data.datasets[1].data = dataGraficoReceita;
			graficoAnual.update()

}
grafico()



// FIM GRAFICO MENSAL

function mais() {
    var novo = atual.value - (-1); //Evitando Concatenacoes
    atual.value = novo;
    grafico()
}

function menos() {
    if (atual.value > 0) { //evita números negativos
        var novo = atual.value - 1;
        atual.value = novo;
        grafico()
    }
}

atual.addEventListener('input', () => {
    atual.value = atual.value.substring(0, 4);
});