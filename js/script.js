// Código para a página principal (index.js)
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário está logado
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    // Obter referência aos elementos
    const perfil = document.getElementById('perfil');
    const face = document.getElementById('face');
    const nomeElemento = document.getElementById('nome');
    
    if (usuarioLogado) {
        // Preencher o nome do usuário no h2 com id "nome"
        if (nomeElemento) {
            nomeElemento.textContent = `Olá, ${usuarioLogado.nome || 'Usuário'}!`;
        }
        
        // Atualizar o ícone de perfil para logout
        if (perfil) {
            perfil.innerHTML = '<span class="material-symbols-outlined">logout</span>';
            
            // Adicionar evento de clique para fazer logout
            perfil.addEventListener('click', function() {
                fazerLogout();
            });
            
            // Remover o elemento face se ele existir
            if (face) {
                face.style.display = 'none'; // Oculta o elemento
                // Alternativa: face.remove(); // Remove completamente o elemento do DOM
            }
        }
    } else {
        // Usuário não está logado
        
        // Limpar o nome, se houver um elemento com id "nome"
        if (nomeElemento) {
            nomeElemento.textContent = '';
        }
        
        // Configurar o ícone de perfil
        if (perfil) {
            
            // Adicionar evento de clique para ir para página de login
            perfil.addEventListener('click', function() {
                window.location.href = 'login/index.html';
            });
            
            // Garantir que o face esteja visível (caso a página seja recarregada após logout)
            if (face) {
                face.style.display = ''; // Restaura a visibilidade padrão
            }
        }
    }
});

// Função para fazer logout
function fazerLogout() {
    localStorage.removeItem('usuarioLogado');
    alert('Logout realizado com sucesso');
    
    // Recarregar a página para atualizar o ícone
    window.location.reload();
    
    // Ou redirecionar para a mesma página
    // window.location.href = window.location.href;
}

// Função para fazer logout
function fazerLogout() {
    localStorage.removeItem('usuarioLogado');
    alert('Logout realizado com sucesso');
    
    // Recarregar a página para atualizar o ícone
    window.location.reload();
    
    // Ou redirecionar para a mesma página
    // window.location.href = window.location.href;
}