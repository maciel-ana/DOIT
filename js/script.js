const login = document.querySelector('.login-btn');
const nome = document.querySelector('.name');

const usuarioLogado = (() => {
    try {
        return JSON.parse(localStorage.getItem('usuarioLogado') || 'null');
    } catch {
        localStorage.removeItem('usuarioLogado'); // Limpa dados corrompidos
        return null;
    }
})();

// Pequena interação com o nome 
if ( usuarioLogado ) {
    login.innerHTML = '<span>Logout</span>';
    nome.innerHTML = `Olá ${usuarioLogado.nome.toUpperCase()}, Seja bem vindo(a)!`;
}

// Trocando o Login por Logout
function logout() {
    localStorage.removeItem('usuarioLogado');
    if (login.innerHTML === '<span>Logout</span>') {
        alert('Logout realizado com sucesso');
    }
}

login.addEventListener('click', logout);

// Tarefas variaveis
const inputItem = document.querySelector('.input-item');
const listaTarefa = document.getElementById('taskList');
const botaoAdicionar = document.getElementById('adicionar-item');
let contador = 0;

// Enviar tarefa com o enter

function adicionar(evento) {
    evento.preventDefault();

    if (event.key === 'Enter') {
        const valorTarefa = tarefas.value.trim();

        if ( valorTarefa === '' ) {
            alert('Adicione uma tarefa');
            return;
        } 

        //Buscando os dados ou criando novos
        let dadosUsuario;
        const dadosExistentes = localStorage.getItem('usuarioLogado');
        
        if (dadosExistentes && dadosExistentes !== 'undefined' ) {
            try {
                dadosUsuario = JSON.parse(dadosExistentes);
                dadosUsuario.tarefas = dadosUsuario.tarefas || [];
                dadosUsuario.tarefasPendentes = dadosUsuario.tarefasPendentes || [];
                dadosUsuario.tarefasConcluidas = dadosUsuario.tarefasConcluidas || [];
            } catch (error) {
                console.log('Erro ao fazer parse dos dados:', error);
                dadosUsuario = {
                    nome: usuarioLogado ? usuarioLogado.nome : '', 
                    tarefas: [],
                    tarefasPendentes: [],
                    tarefasConcluidas: []
                };
            }
        } else { 
            dadosUsuario = {
                nome: usuarioLogado ? usuarioLogado.nome : '',
                tarefas: [],
                tarefasPendentes: [],
                tarefasConcluidas: []
            };
        }
        
        // Criando ID unico para cada tarefa
        const tarefaId = `tarefa_${contadorTarefas++}`;

        // Adicionando tarefas
        dadosUsuario.tarefasPendentes.push({
            id: tarefaId,
            texto: valorTarefa,
            concluida: false
        });
        
        // Salvando 
        localStorage.setItem('usuarioLogado', JSON.stringify(dadosUsuario));
        
        // Criando cada elemento da tarefa com id unico
        const novaTarefa = document.createElement('li');
        const containerTarefas = document.createElement('div');

        containerTarefas.classList.add("tarefas-container");
        const inputCheckbox = document.createElement('input');
        inputCheckbox.type = 'checkbox';

        inputCheckbox.id = 'checkbox' + contador++;

        const nomeItem = document.createElement('p');
        nomeItem.innerText = inputItem.value;

        inputCheckbox.addEventListener('click', function() {
            if (inputCheckbox.checked) {
                nomeItem.style.textDecoration = 'line-through';
            } else {
                nomeItem.style.textDecoration = 'none';
            }
        })
        
        // limpando o input
        tarefas.value = '';
        

    }
}

botaoAdicionar.addEventListener('click', adicionar);







