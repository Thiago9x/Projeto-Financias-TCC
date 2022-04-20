let abrirModal;
let selecionarModal;
let conteudoModal;
let fecharModal;

{
    let modal;
    let main;

    selecionarModal = (e) => {
        modal = e;
        main = modal.children[0];
        modal.onclick = ({target}) => {
            if(target === modal){
                fecharModal()
            }
        };
    };
    
    abrirModal = () => {
        modal.style.display = "flex";
    };

    conteudoModal = (html) => {
        main.innerHTML = html;
    }

    fecharModal = () => {
        modal.style.display = "none";
    };
}