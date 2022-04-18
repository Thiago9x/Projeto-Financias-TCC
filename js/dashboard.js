'use strict';
// GRAFICO PINCIPAL DE BARRA

                            const ctx = document.getElementById('graficoPuro').getContext('2d');
                            const data = {
                                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                                datasets: [{

                                    data: [9, 19, 3, 5, 2, 3],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                    ],
                                    borderWidth: 1
                                }]
                            };
                            const myChart = new Chart(ctx, {
                                type: 'bar',
                                data: data,
                                options: {scales: {
                                    x: {
                                        grid: {
                                            display:false
                                        }
                                    },
                                    y: {
                                        grid: {
                                            display:false
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
                                    }
                                    }
                                },
                                });
                            
// CONSUMIR A API DA DASHBOARD

let url = 'http://10.107.144.11:8080/royal/dashboard?k=';

        console.log(fetch(url)
        .then((resposta) => resposta.json())
        .then((data) => {
            if(data.status === Status.OK){
                alert("Cadastro efetuado com sucesso")
            }
            else if(data.status === Status.EMAIL_REPETIDO){
                alert("ERRO:Esse email ja existe")
            }
            else{
                alert('ERRO:Aconteceu algum erro')
            }
        })
        ); 