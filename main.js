const $aceptar = document.querySelector('#aceptar');
const $input = document.querySelector('input');

if(!localStorage.getItem('tasks')){
    localStorage.setItem('tasks', 0);
}

let arrLocalStorage;

if(JSON.parse(localStorage.getItem('tasks') != 0)){
    arrLocalStorage = JSON.parse(localStorage.getItem('tasks'));
}else{
    arrLocalStorage = [];
}

document.addEventListener('DOMContentLoaded', () => {
    console.log(arrLocalStorage);

    if(arrLocalStorage != 0){
        arrLocalStorage.forEach(task => {
            agregarALista(task[0]);
        });
    }
});

$aceptar.addEventListener('click', () => {
    const texto = $input.value;
    agregarALista(texto);
    crearTask(texto);
    borrarInput();
});

function borrarInput() {
    $input.value = '';
}

function agregarALista(texto) {
    if(texto == ''){
        return;
    }

    const $items = document.querySelector('#items');

    if($items.children.length == 0){
        $items.className = '';
    }

    const $item = document.createElement('div');
    $item.id = 'item';
    $item.classList.add('item');

    const $itemCheck = document.createElement('input');
    $itemCheck.type = 'checkbox';
    $itemCheck.id = 'item-check';

    const $itemTexto = document.createElement('p');
    $itemTexto.classList.add('parrafo');
    $itemTexto.textContent = texto;

    const $eliminar = document.createElement('button');
    $eliminar.type = 'button';
    $eliminar.id = 'eliminar';
    $eliminar.textContent = 'ELIMINAR';

    $item.appendChild($itemCheck);
    $item.appendChild($itemTexto);
    $item.appendChild($eliminar);

    $items.appendChild($item);
    
    console.log('Se agrego a la lista ' + texto);
}

function crearTask(texto){
    let task = [];
    task.push(texto);
    task.push(false);

    arrLocalStorage.push(task);

    guardarLocalStorage(arrLocalStorage);

    console.log(arrLocalStorage);
    console.log(task);
}

function guardarLocalStorage(arr){
    localStorage.setItem('tasks', JSON.stringify(arr))
}

document.addEventListener('click', e => {
    if(e.target.matches('#item-check')){
        console.log(e.target.checked);
        console.log(document.querySelectorAll('#item-check'));
    
        let parrafo = e.target.nextElementSibling;
    
        if(e.target.checked){
            parrafo.classList.add('tachado');
            console.log(parrafo.textContent + ' fue tachado.');
        }else{
            parrafo.classList.remove('tachado');
            console.log(parrafo.textContent + ' fue destachado.');
        }
        
        console.log(e);
    }

    if(e.target.matches("#eliminar")){
        e.target.parentElement.remove();
        console.log(document.querySelector('#items').children);

        if(document.querySelector('#items').children.length == 0){
            document.querySelector('#items').className = 'oculto';
        }
    }
});

document.querySelector('#reset').addEventListener('mouseup', () => {
    let items = document.querySelectorAll('#item');
    console.log(items);

    for(let i = 0; i < items.length; i++){
        items[i].remove();
        console.log('Se elimino ' + items[i].textContent);
    }

    localStorage.setItem('tasks', 0);

    document.querySelector('#items').className = 'oculto';
});