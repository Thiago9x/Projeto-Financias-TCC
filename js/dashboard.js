'use strict';
// CONSUMIR A API DA DASHBOARD
const token = new URLSearchParams(window.location.search).get('token');
let url = 'http://10.107.144.11:8080/royal/dashboard?k=' + token;
const ws = new WebSocket('ws://10.107.144.11:8080/royal/dashboard/' + token);

ws.onmessage = ({ data }) => {
    console.log(data);
}

console.log(fetch(url)
    .then((resposta) => resposta.json())
    .then((data) => {

        const saldo = data.saldo;
        const receita = data.saldo;
        const despesa = data.saldo;

        document.getElementById('saldoGeral').innerText = `R$ ${saldo.toFixed(2)}`;
        document.getElementById('receita').innerText = `R$ ${receita.toFixed(2)}`;
        document.getElementById('despesa').innerText = `R$ ${despesa.toFixed(2)}`;
    })
);

// GRAFICO PINCIPAL DE BARRA

const ctx = document.getElementById('graficoPuro').getContext('2d');
const data = {

    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Orange', 'Orange', 'Orange', 'Orange'],
    datasets: [{

        data: [9, 19, 3, 5, 2, 3, 7, 8, 9, 10],
        backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ]
    }]
};
const myChart = new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'bar',
    data: data,
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

// grafico inferior de barra 

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




selecionarModal(document.getElementById('modalGigante'))
// MODAL DE DESESAS
const modalDespesa = () => {
    conteudoModal(` 

    <link rel="stylesheet" type="text/css" href="./style/despesas.css">
    <div id='main'>
    <div id="borda"> 
        <img src="./img/x.svg" alt="" class="fotoX">  
    </div>
        <div id="text"> 
           
        <h3>Nova despesa</h3>
        </div>
    <input id="pendente" type="button" value="Pendente">
    <input id="pago" type="button" value="Pago">

        <!-- conteudo da nova despesa -->
    <div id="conteudo">
            <label>Descrição</label>
            <input type="text" placeholder="" maxlength="500" class="descricao">
        <div id="valorData">
            <div class="caixa2">
            <label>Valor</label>
            <input type="text" placeholder="" maxlength="500" class="valor">
            </div>
            <div class="caixa2">
            <label>Data</label>
            <input type="date" placeholder="" maxlength="500" class="date">
            </div>
        </div>
            <label >Categoria</label>
        <select id='select'>
          <option></option>
          <option>teste</option>
          <option>teste</option>
          <option>teste</option>
          <option>teste</option>
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
            <label>Data de Inicio</label>
            <input type="date" placeholder="" maxlength="500" class="dateInicio" >
            </div>
            <div class="caixa1">
                <label >Frequencia de repetição</label>
                <select id='select'>
                  <option></option>
                  <option>teste</option>
                  <option>teste</option>
                  <option>teste</option>
                  <option>teste</option>
                </select>
            </div>
            <div id="duracaoData">
                <div class="caixa3">
                <label>Duração</label>
                <input type="text" placeholder="" maxlength="500" class="duracao">
                </div>
                <div class="caixa3">
                <label>data</label>
                <input type="date" placeholder="" maxlength="500" class="date">
                </div>
            </div>
           </div>
     </div>

        <!-- conteudo de observação -->
     <div class="observacao" id="observacao"> 
          <div  id="conteudo3">
            <div>
                <h4>Observação</h4>
                <input type="text" placeholder="" maxlength="500" class="obs" size="20">
                </div>
          </div>
     </div>
        <!-- conteudo do anexo -->
     <div class="anexo" id="anexo">
        <div  id="conteudo4">
            <h4>Anexo</h4>
            <form> 
                 <input type="file" name="image" id="format">
            </form>
        </div>
   </div>

        <!-- botão de confirmacão -->
    <div id="confirmar">
        <img src="./img/concluir.svg" alt="" class="concluir">  
     </div>
</main>
`)
    abrirModal()

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


    let pendente = false;
const btnPendente = () => {
    
    if(pendente){
    pendente= false;
    console.log('pendente')}
    else{
        pendente = true; 
        console.log('pago')
    }

}
document.getElementById('pendente').addEventListener('click', btnPendente);
}
document.getElementById('despesaCont').addEventListener('click', modalDespesa)











document.getElementById('receitaCont').addEventListener('click', () => { window.location.href = "./receitas.html?k=" + token })
document.getElementById('favoritosCont').addEventListener('click', () => { window.location.href = "./favoritos.html?k=" + token })
document.getElementById('extratoCont').addEventListener('click', () => { window.location.href = "./extrato.html?k=" + token })
