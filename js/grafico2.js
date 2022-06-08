var atual = document.getElementById("total");
atual.value = new Date().getFullYear();
const mudarGraficoAnual = () =>{
    window.location.href="./graficos.html"
}
document.getElementById("graficoAnual").addEventListener("change", mudarGraficoAnual)
const monthNow = new Date().getMonth() + 1;
const selectMes = document.getElementById('selectMes');
document.querySelector('#selectMes > option[value="' + (monthNow) + '"]').selected = true;
const selectCat = document.getElementById('selectCat');
const selectTipoTransf = document.getElementById('tipoTransf')
const urlCat = url + '/data/categorias?k=' + token + '&ano=' + atual.value 
let categoriaDespesa;
let categoriaReceita;
const categorias = () =>{
    selectCat.innerHTML = '<option selected disabled value="">Categorias</option>';
    if(selectTipoTransf.value === "receita"){
    categoriaReceita.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria.idCategoria;
        option.innerText = categoria.nome;

        selectCat.appendChild(option);

    })}

    else if(selectTipoTransf.value === "despesa"){
    categoriaDespesa.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria.idCategoria;
        option.innerText = categoria.nome;

        selectCat.appendChild(option);
    })

}
}
console.log(fetch(urlCat)
    .then((resposta) => resposta.json())
    .then((data1) => {
        categoriaReceita = data1.receitas;
        categoriaDespesa = data1.despesas;

    categorias()
})) 
selectTipoTransf.addEventListener('change', categorias)

const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
	"Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

const ctx = document.getElementById('graficoMensalCanvas').getContext('2d');

const graficoMensal = new Chart(ctx, {
	type: 'pie',
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
                    display: false,
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
                    display: false,
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
    let labels = []
	let urlTipoTransf = url + '/grafico/' +  selectTipoTransf.value + '?k='+ token +'&ano='+atual.value+'&mes=' + selectMes.value + '&modo=categoria'
    let corGrafico = [];
	if(selectCat.value){
		urlTipoTransf = urlTipoTransf + '&cat=' + selectCat.value;
	}
	
    let dataGraficoTipoTransf =  await fetch(urlTipoTransf).then(r => r.json())

            graficoMensal.data.labels = labels;
			graficoMensal.data.datasets[0].data = dataGraficoTipoTransf;
            console.log(graficoMensal.data)
			graficoMensal.update()
           
    graficoMensal.data.datasets[0].backgroundColor = corGrafico;


}
grafico()


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