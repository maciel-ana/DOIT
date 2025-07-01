const emailLogin = document.getElementById('email');
const senhaLogin = document.getElementById('senha');
const btnLogin = document.getElementById('btn');


if (btnLogin) {
    btnLogin.addEventListener('click', fazerLogin);
}

function fazerLogin() {
    if (!emailLogin.value || !senhaLogin.value) {
        alert('Por favor, preencha todos os campos');
        return
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuario = usuarios.find(u => u.email === emailLogin.value);
    const perfil = document.querySelector('.login-btn');

    // verificando se a senha esta correta
    if (usuario && usuario.senha === senhaLogin.value) {
        alert('Login realizado com sucesso ');

        // Salavando informação de que o  usuario esta logado
        localStorage.setItem('usuarioLogado', JSON.stringify({
            nome: usuario.nome,
            email: usuario.email,
            dataLogin: new Date().toISOString()
        }));

        window.location.href = '../index.html'; 
        perfil.value.innerHTML = '<span class="material-symbols-outlined">logout</span>'
        
    } else {
        alert('Email ou senha incorretos');
    }
}

function verficarLogin() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if(usuarioLogado) {
        window.location.href = '../index.html';
        return true;
    }

    return false;
}

function fazerLogout() {
    localStorage.removeItem('usuarioLogado');
    alert('Logout realizado com sucesso');
    window.location.href = 'login/index.html';
}

