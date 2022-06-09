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

const formatador = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const tituloLista = document.querySelector('.titulo')
const imagemLista = document.querySelector('.imagem')
const nomeCatLista = document.querySelector('.nomeCatLista')
const valorLista = document.querySelector('.valorTransf')
const lista = document.querySelector("#lista")

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
	type: 'doughnut',
	data: {

		labels: [],
		datasets: [{
			labels: [],
			data: [],
			backgroundColor: []
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
		
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
				position: 'right',
			},
			title:{
				display: true,
				text: "",
				font:{
					size: "24px",
					
				},
				color: "#000000"
			},
		}
	},
});

const grafico = async () =>{
    let labels = []
	let urlTipoTransf = url + '/grafico/' +  selectTipoTransf.value + '?k='+ token +'&ano='+atual.value+'&mes=' + selectMes.value + '&modo=categoria'
    let corGrafico = [];
	let dataGrafico = [];
	if(selectCat.value){
		urlTipoTransf = urlTipoTransf + '&cat=' + selectCat.value;
	}
	
    let dataGraficoTipoTransf =  await fetch(urlTipoTransf).then(r => r.json())

            lista.innerHTML = ""
			Object.entries(dataGraficoTipoTransf).forEach((categorias) => {
				let idCategorias = categorias[0];
				console.log(idCategorias)
				const criarDiv = document.createElement("div")
				lista.appendChild(criarDiv)
				if (selectTipoTransf.value === 'despesa') {
					const categoriaDespesas = categoriaDespesa.find(categoria => categoria.idCategoria == idCategorias);
					labels.push(categoriaDespesas.nome)
					dataGrafico.push(categorias[1])
					corGrafico.push('#' + categoriaDespesas.cor)
					
					criarDiv.outerHTML = `<div class="agregaValores">

					<div class="teste">
						<div class="info">
							<div class="imagem icons">${categoriaDespesas.icone}</div>
							<p class="p nomeCatLista">${categoriaDespesas.nome}</p>
						</div>
					</div>

					<div class="teste">
						<div class="info">
							<h4 class="valorTransf">${"R$ " + formatador.format(categorias[1]).replace("NaN", "R$ " + categorias[1] + ",00")}</h4>
						</div>
					</div>
				</div>`
					

				} else if (selectTipoTransf.value === 'receita') {
					const categoriaReceitas = categoriaReceita.find(categoria => categoria.idCategoria == idCategorias);
					labels.push(categoriaReceitas.nome)
					dataGrafico.push(categorias[1])
					corGrafico.push('#' + categoriaReceitas.cor)
	
					criarDiv.outerHTML = `<div class="agregaValores">

					<div class="teste">
						<div class="info">
							<div class="imagem icons">${categoriaReceitas.icone}</div>
							<p class="p nomeCatLista">${categoriaReceitas.nome}</p>
						</div>
					</div>

					<div class="teste">
						<div class="info">
							<h4 class="valorTransf">${"R$ " + formatador.format(categorias[1]).replace("NaN", "R$ " + categorias[1] + ",00")}</h4>
						</div>
					</div>
				</div>`

					
				}

			});

			graficoMensal.data.labels = labels;
			graficoMensal.data.datasets[0].data = dataGrafico;
            console.log(graficoMensal.data)
		    graficoMensal.data.datasets[0].backgroundColor = corGrafico;
			graficoMensal.options.plugins.title.text = "Grafico de " + selectTipoTransf.value + "s",
			
			
			tituloLista.innerText = 'Lista de ' + selectTipoTransf.value + "s"
			
			graficoMensal.update()
}
grafico()

selectTipoTransf.addEventListener('change',grafico)
selectCat.addEventListener('change',grafico)
selectMes.addEventListener('change',grafico)

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





//listagem

