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
    
    //  Adicionando as tarefas
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

    // Movendo para as tarefas concluídas

    const completedList = document.getElementById('completedList');

    listaTarefas.addEventListener('click', function(event) {
        
        if (event.target.matches('.checkbox')) {
            const checkboxClicado = event.target;
            const tarefa = checkboxClicado.closest('li');
            
            checkboxClicado.disable = true;

            tarefa.classList.add('movendo-tarefa');

            setTimeout(() => {
               tarefa.classList.add('completed');
            
               completedList.appendChild(tarefa);

               tarefa.classList.remove('movendo-tarefa');
            }, 3000);
        }

        completedList.addEventListener('click', function(event) {
            const checkboxClicado = event.target;
            const tarefa = checkboxClicado.closest('li');

            if (event.target.matches('.checkbox')) {
                checkboxClicado.disable = false;

                tarefa.classList.remove('completed');

                listaTarefas.appendChild(tarefa);
            }

        })
    });
    
    verificarListaVazia(listaTarefas);

})








