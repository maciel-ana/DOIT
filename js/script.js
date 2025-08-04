import { criarItemDaLista } from "./tarefas.js";
import verificarListaVazia from "./verificarListaVazia.js";
import { logout } from "./login.js";
import { usuarioLogado } from "./login.js";

document.addEventListener('DOMContentLoaded', (event) => {
    
    const login = document.querySelector('.login-btn');
    const nome = document.querySelector('.name');
    
    // Pequena interação com o nome 
    if ( usuarioLogado ) {
        login.innerHTML = '<span>Logout</span>';
        nome.innerHTML = `Olá ${usuarioLogado.nome.toUpperCase()}, Seja bem vindo(a)!`;
    }
    
    login.addEventListener('click', logout);
    
    const listaTarefas = document.getElementById('listaTarefas');
    const botaoAdicionar = document.getElementById('adicionar-item');
    
    botaoAdicionar.addEventListener('click', adicionar);
    
    
    function adicionar(evento) {
        evento.preventDefault();
        const inputItem = document.getElementById('input-item');
        
        if (!inputItem) {
            console.error("Erro: o input 'input_item não foi encontrado.'");
            return;
        }

        const valorDoInput = inputItem.value;
    
        const itemDaLista = criarItemDaLista(valorDoInput);
    
        if (itemDaLista) {
            listaTarefas.appendChild(itemDaLista);
            verificarListaVazia(listaTarefas);
            inputItem.value = '';
        }
    
    }
    
    verificarListaVazia(listaTarefas);

})








