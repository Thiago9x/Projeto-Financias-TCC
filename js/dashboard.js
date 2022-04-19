'use strict';
// CONSUMIR A API DA DASHBOARD
const token = new URLSearchParams(window.location.search).get('token');
let url = 'http://10.107.144.11:8080/royal/dashboard?k=' + token;
const ws = new WebSocket('ws://10.107.144.11:8080/royal/dashboard/' + token);

ws.onmessage = ({data}) => {
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
    
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Orange', 'Orange', 'Orange', 'Orange' ],
    datasets: [{

        data: [9, 19, 3, 5, 2, 3,7,8,9,10],
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

document.getElementById('receitaCont').addEventListener('click', () => {window.location.href="./receitas.html?k=" + token})
document.getElementById('despesaCont').addEventListener('click', () => {window.location.href="./despesas.html?k=" + token})
document.getElementById('favoritosCont').addEventListener('click', () => {window.location.href="./favoritos.html?k=" + token})
document.getElementById('extratoCont').addEventListener('click', () => {window.location.href="./extrato.html?k=" + token})