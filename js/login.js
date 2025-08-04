const login = document.querySelector('.login-btn');


export const usuarioLogado = (() => {
    try {
        return JSON.parse(localStorage.getItem('usuarioLogado') || 'null');
    } catch {
        localStorage.removeItem('usuarioLogado'); // Limpa dados corrompidos
        return null;
    }
})();


// Trocando o Login por Logout
export function logout() {
    localStorage.removeItem('usuarioLogado');
    if (login.innerHTML === '<span>Logout</span>') {
        alert('Logout realizado com sucesso');
    }
}

