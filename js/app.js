// 0. Ordenar nuestra base de datos de manera alfabética (ARRAY DE OBJETOS)
console.log(campers);

//Estos dos parametros son para comparar
campers.sort((a, b) => {
    if (a.nombre < b.nombre) {
        return -1;
    }

    if (a.nombre > b.nombre) {
        return 1;
    }

    return 0;
});


// 1. Llenar dinámicamente valores en select de nombres
campers.forEach((optionCamper) => {
    const option = document.createElement('option');
    option.value = optionCamper.nombre;
    option.textContent = optionCamper.nombre;
    document.querySelector('#camper').appendChild(option);
});

// 2. Selectores
const camperInput = document.querySelector('#camper');
const psicologaInput = document.querySelector('#psicologa');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const resultadosInput = document.querySelector('#resultados');

// 3. Selectores de formulario y contenedor de resultados
//3.1 formulario
const formulario = document.querySelector('#nueva-entrevista');
const contenedorEntrevistas = document.querySelectorAll('#entrevistas');
// 12. Listener formulario
formulario.addEventListener('submit', nuevaEntevista);

// 4. Listeners/Events
eventListeners();

function eventListeners() {
    camperInput.addEventListener('change', datosEntrevista);
    // 8. Añadir los demás event listener
    psicologaInput.addEventListener('change', datosEntrevista);
    fechaInput.addEventListener('change', datosEntrevista);
    horaInput.addEventListener('change', datosEntrevista);
    resultadosInput.addEventListener('change', datosEntrevista);
}

// 6. Objeto con propiedades que tiene como valor los input del formulario
const entrevistaObject = {
    camper: '',
    psicologa: '',
    fecha: '',
    hora: '',
    resultados: ''
}

console.log(entrevistaObject);


// 5. Funciones
function datosEntrevista(e) {
    console.log(e.target.value);
    // 7. Guardar en cada propiedad el valor
    entrevistaObject[e.target.name] = e.target.value;
}

// 10. Clases

class Interviews {
    // 11.1 Constructor
    constructor() {
        this.Interviews = [];
    }

}

class UserInterface {

}

// 11. Instanciar las clases de Interviews y UserInterface --> (objetos)
const interviewsManager = new Interviews();
const userInterface = new UserInterface();

// 13. Funcion para validar y agregar una nueva entrevista psicologica
function nuevaEntevista(e) {
    e.preventDefault();
    // 14. Destructuring desde objeto de entrevistas
    const {camper, psicologa, fecha, hora, resultados} = entrevistaObject;

    //Validar
    if(camper === '' || psicologa === '' || fecha === '' || hora === '' || resultados === ''){
        alert('Todos los campos son obligatorios');
        return;
    }
}