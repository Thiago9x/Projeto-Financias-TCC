document.getElementById('menuDash').addEventListener('click', () => { window.location.href = '../dashboard.html' });

document.getElementById('menuExtratos').addEventListener('click', () => { window.location.href = '../extrato.html' });

document.getElementById('menuMetas').addEventListener('click', () => { window.location.href = '../dashboardMeta.html' });

document.getElementById('menuGraficos').addEventListener('click', () => { window.location.href = '../graficos.html' });

document.getElementById('menuGrupos').addEventListener('click', () => { window.location.href = '../grupo.html' });

const token = Cookies.get('token');

let urlData = url + "/data";

console.log(fetch(`${urlData}/perfil?k=${token}`)
    .then((resposta) => resposta.json())
    .then((data) => {

        const nomeUsuario = data.nome;
        document.getElementById('branco').innerText = nomeUsuario;
        const fotoUsuario = data.foto;
        if (fotoUsuario) {

        } else {
            document.getElementById("perfilFoto").innerHTML = '<img id="fotoDoUsuario" src="../img/usuarioPerfil.svg">'
        }
    })
);