'use strict'
const monthNow = new Date().getUTCMonth() + 1;
const yearNow = new Date().getUTCFullYear();
const selectMes = document.getElementById('selectMes');
document.querySelector('#selectMes > option[value="' + (monthNow) + '"]').selected = true;
var atual = document.getElementById("total");
atual.value = new Date().getUTCFullYear();
const token = Cookies.get('token');
let backup;

const urlCat = url + '/data/categorias/extrato-mes?k=' + token + '&ano=' + atual.value + '&mes=' + selectMes.value;
let categoriaDespesa;
let categoriaReceita;
console.log(fetch(urlCat)
    .then((resposta) => resposta.json())
    .then((data1) => {
        categoriaReceita = data1[0].receitas;
        categoriaDespesa = data1[0].despesas;
        let validacaoCat = false;
        if (validacaoCat === false) {

            const selectCat = document.getElementById("selectCat");
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
            selectCat.append(optionReceita, optionDespesa);
            validacaoCat = true;
        }
		
	backup = data1[1];
	criadorConteudo(data1[1])
    })
)
const formatador = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Stembro", "Outubro", "Novembro", "Dezembro"
];
const getShortMonthName = function (date) {
    return monthNames[date.getMonth()].substring(0, 3);
}
const extratos = () => {
    let url2 = url + '/data/extrato-mes?k=' + token + '&ano=' + atual.value + '&mes=' + selectMes.value ;
    if(selectCat.value){
        url2 = url2 + '&cat=' + selectCat.value;
    }
    

    fetch(url2)
        .then((resposta) => resposta.json())
        .then((data2) => {
			backup = data2;
			criadorConteudo(data2);

        })
};

selectMes.addEventListener('change', extratos);
atual.addEventListener('input', extratos);
selectCat.addEventListener('change', ({target}) => {
	criadorConteudo(target.value ? backup.filter(transferencia => transferencia.categoria == target.value) : backup);
});

// menos e mais da input ano 

const criadorConteudo = data2 => {
	
				const boxConteudo = document.querySelector('#conteudo');
				boxConteudo.innerHTML = '';
            for (let i = 0; i < data2.length; i++) {
                let descricao = data2[i].descricao;
                let idcategoria = data2[i].categoria;
                let valor = data2[i].valor;
                let cor;
				let categoria;
                let mesData = getShortMonthName(new Date(data2[i].data));

                if (valor < 0) {
                    categoria = categoriaDespesa.find(categor => idcategoria == categor.idCategoria);
                    cor = "vermelho";
                }
                else if (valor > 0) {
                    categoria = categoriaReceita.find(categor => idcategoria == categor.idCategoria);
                    cor = "verde";
                }

                boxConteudo.innerHTML += `
                <div class="caixa1">

                <div class="containerInfo">
                    <div class="containerImagem icons">${categoria.icone}</div>

                    <div class="containerText">
                        <label class="textCategoria">${categoria.nome}</label>
                        <label class="textLugar">${descricao}</label>
                        <label class="textValor ${cor}">${'R$ ' + formatador.format(valor)}</label>
                    </div>
                </div>

                <div class="containerInfo">
                    <label class="dataFormatacao"> ${mesData} <br> ${atual.value}</label>
                </div>

            </div>`
            }
};

function mais() {
    var novo = atual.value - (-1); //Evitando Concatenacoes
    atual.value = novo;
    extratos()
}

function menos() {
    if (atual.value > 0) { //evita números negativos
        var novo = atual.value - 1;
        atual.value = novo;
        extratos()
    }
}

atual.addEventListener('input', () => {
    atual.value = atual.value.substring(0, 4);
});


