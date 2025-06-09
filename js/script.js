document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário está logado
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    const perfil = document.getElementById('perfil');
    const face = document.getElementById('face');
    const nomeElemento = document.getElementById('nome');
    
    if (usuarioLogado) {
        // Preencher o nome do usuário 
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
                face.style.display = 'none'; 
            }
        }
    } else {
        
        // Limpar o nome, se houver um elemento com id "nome"
        if (nomeElemento) {
            nomeElemento.textContent = '';
        }
        
        // Configurar o ícone de perfil
        if (perfil) {
            
            // clique para ir para página de login
            perfil.addEventListener('click', function() {
                window.location.href = 'login/index.html';
            });
            
            // Garantir que o face esteja visível 
            if (face) {
                face.style.display = ''; 
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
    
}

// Tarefas

const novaTarefa = document.getElementById('digitar');
const add = document.getElementById('adicionar');
const tarefas = document.getElementById('tarefas');
const concluidas = document.getElementById('concluidas');

// carregar as tarefas
document.addEventListener('DOMContentLoaded', function() {
    carregarTarefas();
});


// Adicioanr as tarefas
adicionar.addEventListener('click', function () {
    adicionar();
});

novaTarefa.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        adicionar();
    }
})

// Tarefa

function adicionar() {

    if ( novaTarefa.value.trim() === '') {
        alert('Adicione uma tarefa');
        return;
    }

     // Criar novo item de tarefa
    const novaTarefaItem = document.createElement('div');
    novaTarefaItem.className = 'tarefa-item';
    
    // Criar container para ícone e texto
    const containerTarefa = document.createElement('div');
    containerTarefa.className = 'container-tarefa';
    containerTarefa.style.display = 'flex';
    containerTarefa.style.alignItems = 'center';
    containerTarefa.style.marginBottom = '10px';
    
    // Adicionar ícone
    const icone = document.createElement('span');
    icone.className = 'material-symbols-outlined';
    icone.textContent = 'radio_button_unchecked';
    icone.style.marginRight = '10px';
    icone.style.cursor = 'pointer';
    icone.onclick = function() {
        marcarConcluida(novaTarefaItem);
    };
    
    // Adicionar texto da tarefa
    const textoTarefa = document.createElement('span');
    textoTarefa.textContent = novaTarefa.value;
    textoTarefa.className = 'texto-tarefa';
    
    // Adicionar elementos ao container
    containerTarefa.appendChild(icone);
    containerTarefa.appendChild(textoTarefa);
    
    // Adicionar container ao item da tarefa
    novaTarefaItem.appendChild(containerTarefa);
    
    // Adicionar item à lista de tarefas
    listaTarefas.appendChild(novaTarefaItem);
    
    // Limpar campo de entrada
    novaTarefa.value = '';
    
    // Salvar no localStorage
    salvarTarefas();
}

// Função para marcar tarefa como concluída
function marcarConcluida(tarefaItem) {
    // Verificar se a tarefa já está concluída
    const icone = tarefaItem.querySelector('.material-symbols-outlined');
    const textoTarefa = tarefaItem.querySelector('.texto-tarefa');
    
    if (icone.textContent === 'radio_button_unchecked') {
        // Marcar como concluída
        icone.textContent = 'task_alt';
        textoTarefa.style.textDecoration = 'line-through';
        textoTarefa.style.color = '#6c757d';
        listaConcluidas.appendChild(tarefaItem);
    } else {
        // Desmarcar como concluída
        icone.textContent = 'radio_button_unchecked';
        textoTarefa.style.textDecoration = 'none';
        textoTarefa.style.color = '';
        listaTarefas.appendChild(tarefaItem);
    }
    
    // Salvar no localStorage
    salvarTarefas();
}

// Function para salvar tarefas no localStorage
function salvarTarefas() {
    // Obter todas as tarefas
    const tarefasAtivas = obterTarefasDoElemento(listaTarefas);
    const tarefasConcluidas = obterTarefasDoElemento(listaConcluidas);
    
    // Obter dados do usuário do localStorage
    let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')) || {};
    
    // Atualizar tarefas do usuário
    usuarioLogado.tarefasAtivas = tarefasAtivas;
    usuarioLogado.tarefasConcluidas = tarefasConcluidas;
    
    // Salvar no localStorage
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
}

