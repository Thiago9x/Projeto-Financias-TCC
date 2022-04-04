
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

// menssagem após confirmar a repetição de despesas
