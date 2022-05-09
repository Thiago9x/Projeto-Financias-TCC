'use strict'
const monthNow = new Date().getUTCMonth() + 1;
const yearNow = new Date().getUTCFullYear();
const token = Cookies.get('token');
const url = 'http://10.107.144.11:8080/royal/data/' + token + '/extrato-mes?ano=' + yearNow + '&mes=' + monthNow;

console.log(fetch(url)
    .then((resposta) => resposta.json())
    .then((data) => {
        console.log(data)
        for (let i = 0; i <= data.length(); i++) {
            const boxConteudo = document.querySelector('.caixa1');
            boxConteudo.innerHTML = `
                <link rel="stylesheet" type="text/css" href="./style/extrato.css">
                <div class="caixa1">

                    <div class="containerInfo">
                        <div class="containerImagem">
                            <img src="img/iconeCateAlimen.svg" width="50px" height="40px"> 
                        </div>

                        <div class="containerText">
                            <label class="textCategoria">Restaurante</label>
                            <label class="textLugar">Cantina zero</label>
                            <label class="textValor">- R$ 48,00</label>
                        </div>
                    </div>

                    <div class="containerInfo">
                        <label class="dataFormatacao">JAN <br> 2022</label>
                    </div>

                </div>`
        }
    })
);
