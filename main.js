//-------------------VAR GLOBALES------------
const $aceptar = document.querySelector('#aceptar');
const $input = document.querySelector('input');
let arrLocalStorage;

//-------------------FUNCIONES------------

function habilitarBoton() {
    $aceptar.disabled = false;
}

function desabilitarBoton() {
    $aceptar.disabled = true;
}

function borrarInput() {
    $input.value = '';
}


function agregarALista(texto, tachado) {

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

    if(tachado){
        $itemCheck.checked = true;
        $itemTexto.classList.add('tachado');
    }

    $item.appendChild($itemCheck);
    $item.appendChild($itemTexto);
    $item.appendChild($eliminar);

    $items.appendChild($item);

    console.log('Se agrego a la lista ' + texto);
    desabilitarBoton();
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


//-------------------EVENT LISTENERS------------

document.addEventListener('DOMContentLoaded', () => { //DOMContentLoaded, cuando se carga el html
    if(!localStorage.getItem('tasks')){
        localStorage.setItem('tasks', 0);
    }
    
    if(JSON.parse(localStorage.getItem('tasks') != 0)){
        arrLocalStorage = JSON.parse(localStorage.getItem('tasks'));
    }else{
        arrLocalStorage = [];
    }
    
    console.log(arrLocalStorage);
    desabilitarBoton();

    if(arrLocalStorage != 0){
        arrLocalStorage.forEach(task => {
            agregarALista(task[0], task[1]);
        });
    }
});

$aceptar.addEventListener('click', () => { //BOTON ACEPTAR
    const texto = $input.value;
    agregarALista(texto);
    crearTask(texto);
    borrarInput();
});

document.querySelector('#reset').addEventListener('mouseup', () => { //BOTON RESET
    let items = document.querySelectorAll('#item');
    console.log(items);

    for(let i = 0; i < items.length; i++){
        items[i].remove();
        console.log('Se elimino ' + items[i].textContent);
    }

    localStorage.setItem('tasks', 0);

    document.querySelector('#items').className = 'oculto';
});

document.addEventListener('click', e => { //CHECKBOX | BOTON ELIMINAR
    if(e.target.matches('#item-check')){ //CHECKBOX
        console.log(document.querySelectorAll('#item-check'));
    
        let parrafo = e.target.nextElementSibling;
        console.log(parrafo);
        let arrTasks = JSON.parse(localStorage.getItem('tasks'));

        for(let i = 0; i < arrTasks.length; i++){
            if(arrTasks[i][0] == parrafo.textContent){
                if(e.target.checked){
                    parrafo.classList.add('tachado');
                    arrTasks[i][1] = true;
                    console.log(arrTasks[i]);
                    console.log(parrafo.textContent + ' fue tachado.');
                }else{
                    parrafo.classList.remove('tachado');
                    arrTasks[i][1] = false;
                    console.log(arrTasks[i]);
                    console.log(parrafo.textContent + ' fue destachado.');
                }
            }
        }
        guardarLocalStorage(arrTasks);
        console.log(e);
    }

    if(e.target.matches("#eliminar")){ //ELIMINAR
        e.target.parentElement.remove();
        console.log(document.querySelector('#items').children);

        if(document.querySelector('#items').children.length == 0){
            document.querySelector('#items').className = 'oculto';
        }
    }
});


$input.addEventListener('input', (e) => { //INPUT, HABILITAR | DESABILITAR BOTON ACEPTAR
    if(e.target.value == ''){
        desabilitarBoton();
    }else{
        habilitarBoton();
    }
});