const greetingMessage = () => {
    let h = new Date().toLocaleTimeString('pt-BR', {hour: 'numeric', hour12: false});

    const saudacao = document.getElementById('clima')
    if (h >= 0 && h <= 5) { 
        clima.innerText = 'Boa Madrugada';
    } else if (h >= 6 && h < 12) { 
        clima.innerText = 'Bom Dia';
    } else if (h >= 12 && h < 18) { 
        clima.innerText = 'Boa Tarde';
    } else if (h >= 18 && h <= 23) { 
        clima.innerText = 'Boa Noite';
    }
    }

    console.log(greetingMessage());