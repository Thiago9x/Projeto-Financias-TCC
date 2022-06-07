var atual = document.getElementById("total");
atual.value = new Date().getUTCFullYear();

const mudarGraficoAnual = () =>{
    window.location.href="./graficos.html"
}

document.getElementById("graficoAnual").addEventListener("change", mudarGraficoAnual)






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