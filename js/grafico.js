//PEGANDO AS INPUTS E AS SELECTS

const rdoGraficoAnual = document.getElementById('graficoAnual')
// rdoGraficoAnual.checked = "true"
const rdoGraficoMensal = document.getElementById('graficoMensal')
const selectCategoriaReceita = document.getElementById('selectCategoriaReceita')
const selectCategoriaDespesa = document.getElementById('selectCategoriaDespesa')
const iptValorMin = document.getElementById('valorMinimo')
const iptValorMax = document.getElementById('valorMaximo')

var atual = document.getElementById("total");
atual.value = new Date().getFullYear();

document.getElementById('graficoMensal').addEventListener('change',()=>{
	window.location.href = "./grafico2.html";
})

const urlCat = url + '/data/categorias?k=' + token + '&ano=' + atual.value 
let categoriaDespesa;
let categoriaReceita;
console.log(fetch(urlCat)
    .then((resposta) => resposta.json())
    .then((data1) => {
        console.log(data1);
        categoriaReceita = data1.receitas;
        categoriaDespesa = data1.despesas;

            categoriaReceita.forEach(categoria => {
                const option = document.createElement("option");
                option.value = categoria.idCategoria;
                option.innerText = categoria.nome;

                selectCategoriaReceita.appendChild(option);

            })


            categoriaDespesa.forEach(categoria => {
                const option = document.createElement("option");
                option.value = categoria.idCategoria;
                option.innerText = categoria.nome;

                selectCategoriaDespesa.appendChild(option);
            })

            
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
				},
				ticks: {
					font:{
						size: 20,
						weight: "bold",
					}
				},
			},
			y: {
				grid: {
					display: false
				},
				ticks: {
					font:{
						size: 20,
					}
				},
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
	let urlDespesa = url + '/grafico/despesa?k='+ token +'&ano='+atual.value+'&modo=lista&periodo=mes-ano'
	let urlReceita = url + '/grafico/receita?k='+ token +'&ano='+atual.value+'&modo=lista&periodo=mes-ano'
    
	if(selectCategoriaDespesa.value){
		urlDespesa = urlDespesa + '&cat=' + selectCategoriaDespesa.value;
	}
	if(selectCategoriaReceita.value){
		urlReceita = urlReceita + '&cat=' + selectCategoriaReceita.value;
	}

	let dataGraficoDespesa = await fetch(urlDespesa).then(r => r.json())
    let dataGraficoReceita =  await fetch(urlReceita).then(r => r.json())
	

            graficoAnual.data.labels = labels;
			graficoAnual.data.datasets[0].data = dataGraficoDespesa;
			graficoAnual.data.datasets[1].data = dataGraficoReceita;
			graficoAnual.update()

}
grafico()
selectCategoriaDespesa.addEventListener('change', grafico)
selectCategoriaReceita.addEventListener('change', grafico)

// FIM GRAFICO MENSAL

function mais() {
    var novo = atual.value - (-1); //Evitando Concatenacoes
    atual.value = novo;
    grafico()
}

function menos() {
    if (atual.value > 0) { //evita n??meros negativos
        var novo = atual.value - 1;
        atual.value = novo;
        grafico()
    }
}

atual.addEventListener('input', () => {
    atual.value = atual.value.substring(0, 4);
});