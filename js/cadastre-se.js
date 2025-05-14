const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const confirmacaoSenha = document.getElementById('confirmacaoSenha');


// valida o formato de email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// verificação da senha  
function confirmarSenha() {
    return senha.value === confirmacaoSenha.value;
}

// Validar requisitos da senha 
function validarSenha(senha) {
    return senha.length >= 6;
}

// Cadastrar
function cadastrar() {

    // Validando os campos
    if (!email.value || !senha.value || !confirmacaoSenha) {
        alert('Por favor preencha todos os campos');
        return;
    }

    // Email
    if (!validarEmail(email.value)) {
        alert('Por favor, insira um email válido');
        return;
    }
    // Senha
    if (!validarSenha(senha.value)) {
        alert('A senha deve conter pelo menos 6 caracteres');
        return;
    }
    // Confirmar senha
    if (!confirmarSenha()) {
        alert('As senhas não correspondem');
        return;
    }

    // verificando se o email ja esta cadastrado 
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioExistente = usuarios.find(usuario => usuario.email === email.value);

    if (usuarioExistente) {
        alert('Este email ja esta cadastrado');
        return;
    }

    const novoUsuario = {
        nome: nome.value,
        email: email.value,
        senha: senha.value
    };

    // Adicionando a lista
    usuarios.push(novoUsuario);
    
    // Salvar no localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    alert('Cadastro realizado com sucesso');

    window.location.href = '../login/index.html';
}