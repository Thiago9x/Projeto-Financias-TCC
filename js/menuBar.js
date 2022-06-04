document.getElementById('menuDash').addEventListener('click', () => { window.location.href = '../dashboard.html' });

document.getElementById('menuExtratos').addEventListener('click', () => { window.location.href = '../extrato.html' });


document.getElementById('menuGraficos').addEventListener('click', () => { window.location.href = '../graficos.html' });


console.log(fetch(`${url}/data/perfil?k=${token}`)
    .then((resposta) => resposta.json())
    .then((data) => {

        const nomeUsuario = data.nome;
        document.getElementById('branco').innerText = nomeUsuario;
        const fotoUsuario = data.foto;
        
        if (fotoUsuario) {
        const perfilFoto = document.getElementById('perfilFoto')
		perfilFoto.innerHTML=`<img class="fotinha" src="${url}/upload/${fotoUsuario}">`
        perfilFoto.style.border = "none";
        } else {
            document.getElementById("perfilFoto").innerHTML = '<img id="fotoDoUsuario" src="../img/usuarioPerfil.svg">'
        }
    })
);