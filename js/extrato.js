'use strict'
const monthNow = new Date().getUTCMonth() + 1;
const yearNow = new Date().getUTCFullYear();
const token = Cookies.get('token');
const url = 'http://10.107.144.11:8080/royal/data/' + token + '/extrato-mes?ano=' + yearNow + '&mes=' + monthNow;
const urlCat = 'http://10.107.144.11:8080/royal/data/' + token + '/categorias';
let categoriaDespesa;
let categoriaReceita;
const formatador = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const monthNames = ["Janeiro", "Feevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Stembro", "Outubro", "Novembro", "Dezembro"
];  
const getShortMonthName = function(date) {
    return monthNames[date.getMonth()].substring(0, 3);
}

console.log(fetch(urlCat)
    .then((resposta) => resposta.json())
    .then((data1) => {
        categoriaReceita = data1.receitas;
        categoriaDespesa = data1.despesas;
        fetch(url)
            .then((resposta) => resposta.json())
            .then((data2) => {
                let categoria;
                console.log(data2)
                for (let i = 0; i < data2.length; i++) {
                    let descricao = data2[i].descricao;
                    let idcategoria = data2[i].categoria;
                    let valor = data2[i].valor;
                    let cor;
                    let mesData = getShortMonthName(new Date(data2[i].data)); 
                    let anoData = new Date.getUTCFullYear(data2[i].data);
                    if (valor < 0) {
                        categoria = categoriaDespesa.find(categor => idcategoria == categor.idCategoria);
                        cor = "vermelho";
                    }
                    else if (valor > 0) {
                        categoria = categoriaReceita.find(categor => idcategoria == categor.idCategoria);
                        cor = "verde";
                    }
                    const boxConteudo = document.querySelector('#conteudo');
                    boxConteudo.innerHTML += `
                <div class="caixa1">

                <div class="containerInfo">
                    <div class="containerImagem icons">${categoria.icone}</div>

                    <div class="containerText">
                        <label class="textCategoria">${categoria.nome}</label>
                        <label class="textLugar">${descricao}</label>
                        <label class="textValor ${cor}">${'R$ '+formatador.format(valor)}</label>
                    </div>
                </div>

                <div class="containerInfo">
                    <label class="dataFormatacao"> ${mesData} <br> ${anoData}</label>
                </div>

            </div>`
                }
            })
    })
);


