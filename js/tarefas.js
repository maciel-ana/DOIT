let contador = 0;

export function criarItemDaLista(valor) {

    if (valor.trim() === '') {
        alert('Por favor insira um item ');
        return null;
    }

    const itemDaLista = document.createElement('li');
    const containeritemDaLista = document.createElement('div');

    containeritemDaLista.classList.add("lista-item-container");
    const inputCheckbox = document.createElement('input');
    inputCheckbox.type = 'checkbox';

    inputCheckbox.id = 'checkbox-' + contador++;

    const nomeItem = document.createElement('p');
    nomeItem.innerText = valor;

    inputCheckbox.addEventListener('click', function() {
        if (inputCheckbox.checked) {
            nomeItem.style.textDecoration = 'line-through';
        } else {
            nomeItem.style.textDecoration = 'none'; 
        }
    });

    containeritemDaLista.appendChild(inputCheckbox);
    containeritemDaLista.appendChild(nomeItem);

    itemDaLista.appendChild(containeritemDaLista);
    
    return itemDaLista;
}