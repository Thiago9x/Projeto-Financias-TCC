
let photo = document.querySelector('.usuarioFoto');
let file = document.getElementById('input-file');




photo.addEventListener('click', () => {
    file.click();
    console.log(photo)
});

file.addEventListener('change', () => {

    if (file.files.length <= 0) {
        return;
    }

    let reader = new FileReader();
    reader.onload = () => {
        photo.src = reader.result;
    }
    console.log(reader);
    reader.readAsDataURL(file.files[0]);
});

document.querySelector('.cancelar').addEventListener('click', () => {
    document.getElementById('modalUsuario').style.display = "none"
});


console.log(fetch(`${url}/data/perfil?k=${token}`)
    .then((resposta) => resposta.json())
    .then((data) => {
        console.log(data);
        const nomeUsuario = data.nome;
        const emailUsuario = data.email;
        const duasEtapas = data.duasetapas;

        document.getElementById('nomeUsuario').innerText = nomeUsuario;

        let nomeCompleto = document.querySelector('.nomeCompleto')
        nomeCompleto.value = nomeUsuario;
        nomeCompleto.disabled = true;

        let email = document.querySelector('.emailUsuario')
        email.value = emailUsuario;
        email.disabled = true;

        document.getElementById('checkbox').checked=duasEtapas;
    })
);
console.log('logo');

// ABRE A MODAL DE USUARIO

document.getElementById('abrirPerfil').addEventListener('click', function () {
    document.getElementById("modalUsuario").style.display = "flex";
});

