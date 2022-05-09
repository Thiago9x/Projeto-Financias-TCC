'use strict';
// CONSUMIR A API DA DASHBOARD
const token = Cookies.get('token');
let url = 'http://10.107.144.11:8080/royal/data/' + token;
const monthNow = new Date().getUTCMonth();
const yearNow = new Date().getUTCFullYear();
let selectTransferencia = document.getElementById('selectTrans')
const selectMes = document.getElementById('selectMes');
document.querySelector('#selectMes > option[value="' + (monthNow + 1) + '"]').selected = true;
const ws = new WebSocket('ws://10.107.144.11:8080/royal/dashboard/' + token);
let categoriaReceita;
let categoriaDespesa;

const formatador = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

//FECHAR MODAIS E ENVIAR INFORMACOES PARA A DASHBOARD
ws.onmessage = ({ data }) => {

    //toda vez que vc receber aquela mensagem do log, melhor n, ja te explico, vo fazer essa parte ou quer fazer?

    const json = JSON.parse(data);

    console.log(json);

    switch (json.metodo) {
        case 'despesa': {
            switch (json.arg) {
                case 'remover': {
                    const saldoGeral = document.getElementById('saldoGeral');
                    const despesaGeral = document.getElementById('despesa');

                    const valorSaldo = parseFloat(saldoGeral.innerText.trim().replaceAll('R$ ', '').replaceAll(',', '.'));
                    const valorDespesa = parseFloat(despesaGeral.innerText.trim().replaceAll('R$ ', '').replaceAll(',', '.'));

                    saldoGeral.innerText = 'R$ ' + (valorSaldo - json.valor).toFixed(2).replace('.', ',');
                    despesaGeral.innerText = 'R$ ' + (valorDespesa + json.valor).toFixed(2).replace('.', ',');



                    break;
                }
            }
            break;
        }
    }
    switch (json.metodo) {
        case 'receita': {
            switch (json.arg) {
                case 'adicionar': {
                    const saldoGeral = document.getElementById('saldoGeral');
                    const receitaGeral = document.getElementById('receita');

                    const valorSaldo = parseFloat(saldoGeral.innerText.trim().replaceAll('R$ ', '').replaceAll(',', '.'));
                    const valorReceita = parseFloat(receitaGeral.innerText.trim().replaceAll('R$ ', '').replaceAll(',', '.'));

                    saldoGeral.innerText = 'R$ ' + (valorSaldo + json.valor).toFixed(2).replace('.', ',');
                    receitaGeral.innerText = 'R$ ' + (valorReceita + json.valor).toFixed(2).replace('.', ',');



                    break;
                }
            }
            break;
        }
    }
}

selecionarModal(document.getElementById('modalGigante'))
//MODAL DE TRANSFERENCIA
const modalTransferencia = (transferencia) => {
    conteudoModal(` 

    <link rel="stylesheet" type="text/css" href="./style/despesas.css">
    <div id='main'>
    <form id='requires'> 
    <div id="borda"> 
        <img src="./img/x.svg" alt="" class="fotoX">  
    </div>
        <div id="text"> 
           
        <h3>Nova ${transferencia}</h3>
        </div>
        <div id='pendente'>
        <h3 id='verde'>Pago</h3>
        <!-- Rounded switch -->
        <label class="switch">
          <input id='pendencia' type="checkbox">
          <span class="slider round"></span>
        </label>
        <h3 id='vermelho'>Pendente</h3>
        </div>
        <!-- conteudo da nova despesa -->
    <div id="conteudo">
            <label>Descrição</label>
            <input type="text" placeholder="" maxlength="500" class="descricao estilizacao" required>
        <div id="valorData">
            <div class="caixa2">
            <label>Valor</label>
            <input type="text" value="R$ 0,00" maxlength="500" class="valor estilizacao" required>
            </div>
            <div class="caixa2">
            <label>Data</label>
            <input type="date" placeholder="" maxlength="500" class="date estilizacao" required>
            </div>
        </div>
            <label >Categoria</label>
        <select id='selectCat'>
        <option value="" selected="" disabled="">Escolha uma opcao</option>
        </select>
        <div id='pendenciaNone'>
       <label>Data Final da Pendencia</label>
       <input type="date" placeholder="Até qual o ultimo dia que você quer pagar?" maxlength="500" class="date estilizacao" id='dataPendente'>
       </div>
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
            <label>Data de Inicio</label>
            <input type="date" placeholder="" maxlength="500" class="dateInicio estilizacao" >
            </div>
            <div class="caixa1">
                <label >Frequencia de repetição</label>
                <select id='selectFR'>
                <option value="" selected="" disabled="">Escolha uma opcao</option>
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
                <label>Duração</label>
                <input type="text" placeholder="" maxlength="500" class="duracao estilizacao">
                </div>
                <div class="caixa3">
                <label>Data Fim</label>
                <input type="date" placeholder="" maxlength="500" class="dateFim estilizacao">
                </div>
            </div>
           </div>
     </div>

        <!-- conteudo de observação -->
     <div class="observacao" id="observacao"> 
          <div  id="conteudo3">
            <div>
                <h4>Observação</h4>
                <textarea placeholder="" maxlength="500" class="obs estilizacao"></textarea>
                </div>
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
    //PARTE DE REPETICAO
    let dataFR = document.getElementById('selectFR');
    let dataInicio = document.querySelector('.dateInicio');
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
    }
    else if (transferencia === 'despesa') {
        categoriaDespesa.forEach(categoria => {
            const option = document.createElement("option");
            option.value = categoria.idCategoria;
            option.innerText = categoria.nome;

            selectCat.appendChild(option);
        });
    }
    //PARTES DAS BOLINHAS BOTOES

    const btnImg1 = document.querySelector('.btnImg1');

    const btnImg2 = document.querySelector('.btnImg2');

    const btnImg3 = document.querySelector('.btnImg3');

    const btnImg4 = document.querySelector('.btnImg4');

    let repetido = false;
    let observado = false;
    let anexado = false;
    let favoritado = false;

    btnImg1.onclick = () => {
        if (repetido) {
            repetido = false;
            btnImg1.src = './img/repetir.svg'
            document.getElementById('repeticao').style.display = 'none';
        } else {
            repetido = true;
            btnImg1.src = './img/repetirr.svg'
            document.getElementById('repeticao').style.display = 'block';


            dataInicio.onchange = e => {
                console.log('teste')

                switch (dataFR.value) {
                    case 'DIAS': {
                        let dataObjeto = dataInicio.valueAsDate;

                        dataObjeto.setUTCDate(parseInt(duracao.value) + dataObjeto.getUTCDate());

                        dataFim.valueAsDate = dataObjeto;
                        break;
                    }
                    case 'SEMANAS': {
                        let dataObjeto = dataInicio.valueAsDate;

                        dataObjeto.setUTCDate(7 * parseInt(duracao.value) + dataObjeto.getUTCDate());

                        dataFim.valueAsDate = dataObjeto;
                        break;
                    }
                    case 'QUINZENAS': {
                        let dataObjeto = dataInicio.valueAsDate;

                        dataObjeto.setUTCDate(15 * parseInt(duracao.value) + dataObjeto.getUTCDate());

                        dataFim.valueAsDate = dataObjeto;
                        break;
                    } case 'MESES': {
                        let dataObjeto = dataInicio.valueAsDate;

                        dataObjeto.setUTCMonth(parseInt(duracao.value) + dataObjeto.getUTCMonth());

                        dataFim.valueAsDate = dataObjeto;
                        break;
                    } case 'BIMESTRES': {
                        let dataObjeto = dataInicio.valueAsDate;

                        dataObjeto.setUTCMonth(2 * parseInt(duracao.value) + dataObjeto.getUTCMonth());

                        dataFim.valueAsDate = dataObjeto;
                        break;
                    } case 'TRIMESTRES': {
                        let dataObjeto = dataInicio.valueAsDate;

                        dataObjeto.setUTCMonth(3 * parseInt(duracao.value) + dataObjeto.getUTCMonth());

                        dataFim.valueAsDate = dataObjeto;
                        break;
                    }
                    case 'SEMESTRES': {
                        let dataObjeto = dataInicio.valueAsDate;

                        dataObjeto.setUTCMonth(6 * parseInt(duracao.value) + dataObjeto.getUTCMonth());

                        dataFim.valueAsDate = dataObjeto;
                        break;
                    }
                    case 'ANOS': {
                        let dataObjeto = dataInicio.valueAsDate;

                        dataObjeto.setUTCFullYear(parseInt(duracao.value) + dataObjeto.getUTCFullYear());

                        dataFim.valueAsDate = dataObjeto;
                        break;
                    }
                }
            }

            dataFR.onchange = () => dataInicio.onchange();
            duracao.oninput = () => dataInicio.onchange();

            const DIA = 1000 * 60 * 60 * 24;

            dataFim.onchange = () => {
                switch (dataFR.value) {
                    case 'DIAS': {
                        if (dataFim.valueAsNumber >= dataInicio.valueAsNumber) {
                            duracao.value = Math.floor((dataFim.valueAsDate - dataInicio.valueAsDate) / DIA);
                        } else {
                            duracao.value = 0;
                        }
                        break;
                    }
                    case 'SEMANAS': {
                        if (dataFim.valueAsNumber >= dataInicio.valueAsNumber) {
                            duracao.value = Math.floor((dataFim.valueAsDate - dataInicio.valueAsDate) / DIA / 7);
                        } else {
                            duracao.value = 0;
                        }
                        break;
                    }
                    case 'QUINZENAS': {
                        if (dataFim.valueAsNumber >= dataInicio.valueAsNumber) {
                            duracao.value = Math.floor((dataFim.valueAsDate - dataInicio.valueAsDate) / DIA / 15);
                        } else {
                            duracao.value = 0;
                        }
                        break;
                    }
                    case 'MESES': {
                        if (dataFim.valueAsNumber >= dataInicio.valueAsNumber) {
                            const data = new Date(dataFim.valueAsDate - dataInicio.valueAsDate);
                            duracao.value = ((data.getUTCFullYear() - 1970) * 12) + data.getUTCMonth();
                        } else {
                            duracao.value = 0;
                        }
                        break;
                    }
                    case 'BIMESTRES': {
                        if (dataFim.valueAsNumber >= dataInicio.valueAsNumber) {
                            const data = new Date(dataFim.valueAsDate - dataInicio.valueAsDate);
                            duracao.value = (((data.getUTCFullYear() - 1970) * 12) + data.getUTCMonth()) / 2;
                        } else {
                            duracao.value = 0;
                        }
                        break;
                    }
                    case 'TRIMESTRES': {
                        if (dataFim.valueAsNumber >= dataInicio.valueAsNumber) {
                            const data = new Date(dataFim.valueAsDate - dataInicio.valueAsDate);
                            duracao.value = (((data.getUTCFullYear() - 1970) * 12) + data.getUTCMonth()) / 3;
                        } else {
                            duracao.value = 0;
                        }
                        break;
                    }
                    case 'SEMESTRES': {
                        if (dataFim.valueAsNumber >= dataInicio.valueAsNumber) {
                            const data = new Date(dataFim.valueAsDate - dataInicio.valueAsDate);
                            duracao.value = (((data.getUTCFullYear() - 1970) * 12) + data.getUTCMonth()) / 6;
                        } else {
                            duracao.value = 0;
                        }
                        break;
                    }
                    case 'ANOS': {
                        if (dataFim.valueAsNumber >= dataInicio.valueAsNumber) {
                            const data = new Date(dataFim.valueAsDate - dataInicio.valueAsDate);
                            duracao.value = data.getUTCFullYear() - 1970;
                        } else {
                            duracao.value = 0;
                        }
                        break;
                    }

                }
            }
        }
    }

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

    //PENDENTE E PAGO
    const pendencia = (event) => {
        const pagoTxt = document.getElementById('verde')
        const pendenteTxt = document.getElementById('vermelho')


        if (event.currentTarget.checked) {
            pagoTxt.style.color = '#c4c4c4'
            pendenteTxt.style.color = '#e70000'
            document.getElementById('pendenciaNone').style.display = 'block'
        }
        else if (!event.currentTarget.checked) {
            pendenteTxt.style.color = '#c4c4c4'
            pagoTxt.style.color = '#32a40a'
            document.getElementById('pendenciaNone').style.display = 'none'
        }


    }
    //FIM PENDENTE PAGO

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
        let valor = parseFloat(document.querySelector('.valor').value.replaceAll('R$ ', '').replaceAll('.', '').replaceAll(',', '.'))
        let data = document.querySelector('.date').value
        let pendente = document.getElementById('dataPendente').value
        let descricao = document.querySelector('.descricao').value
        let idCategoria = parseInt(document.querySelector('#selectCat').value)
        let observacao = document.querySelector('.obs').value
        // let anexo = document.getElementById('anexos').value

        const confirmacaoCampos = document.getElementById('requires').reportValidity();
        if (confirmacaoCampos == true && !isNaN(idCategoria)) {

            ws.send(JSON.stringify({
                metodo: transferencia, arg: 'inserir', valor: valor, data: data, pendente: pendente !== '' ? pendente : null, descricao: descricao, favorito: favoritado,
                inicioRepeticao: dataInicio.value !== '' ? dataInicio.value : null, totalParcelas: parseInt(duracao.value !== '' ? duracao : 0),
                nomeFrequencia: dataFR.value !== '' ? dataFR.value : null, observacao: observacao, idCategoria: idCategoria
            }));
            fecharModal();
        }
    }

    document.querySelector('.fotoX').addEventListener('click', fecharModal);

    document.getElementById('pendencia').addEventListener('change', pendencia);

    document.querySelector('.valor').addEventListener('input', format);

    document.querySelector('.concluir').addEventListener('click', enviar);

}
//FIM DA CONFIRMACAO TRANSFERENCIA
document.getElementById('receitaCont').addEventListener('click', () => modalTransferencia('receita'))
document.getElementById('despesaCont').addEventListener('click', () => modalTransferencia('despesa'))

console.log(fetch(url)
    .then((resposta) => resposta.json())
    .then((data) => {

        const saldo = data.saldo;
        const receita = data.receita;
        const despesa = data.despesa;
        categoriaReceita = data.categorias.receitas;
        categoriaDespesa = data.categorias.despesas;

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
            datalabels: {
                color: '#ffffff',
                anchor: 'end',
                formatter: function (value) {
                    return "R$ " + formatador.format(value);
                },
                align: 'start',
                offset: 24,
                font: {
                    size: '24px',
                    weight: 'bold'
                }
            }
        }
    },
});

const updateChart = () => {
    fetch('http://10.107.144.11:8080/royal/grafico/' + token + '/' + selectTransferencia.value + '/' + yearNow + '/' + selectMes.value)
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
                }
                else if (selectTransferencia.value === 'receita') {
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

            console.log(labels, dataGrafico, corGrafico)
        });
};

selectTransferencia.addEventListener('change', updateChart)

selectMes.addEventListener('change', updateChart)
// FIM GRAFICO MENSAL

// GRAFICO SECUNDARIO

const ctxSecundario = document.querySelector('.card').getContext('2d');
const dataSecundario = {
    labels: ['Green', 'Red'],
    datasets: [{
        hoverBorderWidth: 1,
        data: [9, 19],
        backgroundColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)'
        ]
    }]
};
const myChartSecundario = new Chart(ctxSecundario, {
    plugins: [ChartDataLabels],
    type: 'bar',
    data: dataSecundario,
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
                text: 'Grafico de Despesa e Receita do mês atual',
                font: { weight: 'bold', size: '16em' },
                align: 'start',
                color: 'black',
                padding: '10'
            },
            datalabels: {
                color: '#ffffff',
                anchor: 'end',
                align: 'start',
                offset: 14,
                font: {
                    size: '16px',
                    weight: 'bold'
                }
            }
        }
    },
});

// FIM GRAFICO SECUNDARIO


//MODAL FAVORITOS
const modalFavoritos = () => {
    conteudoModal(` 
    <link rel="stylesheet" type="text/css" href="./style/favoritos.css">
    <div id='mainfavorito'>
        <div id="conteudoModal">
            <img src="./img/estrelaExtrato.svg" alt class="estrela">
            <h3>Transações Favoritas</h3>
        </div>
            <div id="formatAdd">
                <input type="image" src="img/mais.svg" class="editarIcone">
                <p>Adicionar</p>
                <p class="edit">Favorito</p>
            </div>
        <div id="caixas">
             <div class="caixa1"></div>
             <div id="editImgExcluir"><img src="./img/excluir.svg" alt class="excluir"></div>  
             
             <div class="caixa1"></div>
             <div id="editImgExcluir"><img src="./img/excluir.svg" alt class="excluir"></div>  
             
             <div class="caixa1"></div>
             <div id="editImgExcluir"><img src="./img/excluir.svg" alt class="excluir"></div>
             
             <div class="caixa1"></div>
             <div id="editImgExcluir"><img src="./img/excluir.svg" alt class="excluir"></div> 
               
             <div class="caixa1"></div>
             <div id="editImgExcluir"><img src="./img/excluir.svg" alt class="excluir"></div>  
             
        </div>
            <input id="button1" type="button" value="Voltar" class="voltar">
            <input id="button2" type="button" value="Confirmar" class="confirmar">
    </div>
    `)
    abrirModal()
}

document.getElementById('favoritosCont').addEventListener('click', modalFavoritos)
document.getElementById('extratoCont').addEventListener('click', () => { window.location.href = "./extrato.html"})
