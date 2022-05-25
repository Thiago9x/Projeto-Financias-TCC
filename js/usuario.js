
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

    document.querySelector('.cancelar').addEventListener('click',() => {
        document.getElementById('modalUsuario').style.display="none"
    });    


