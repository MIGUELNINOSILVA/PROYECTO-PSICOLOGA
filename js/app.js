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
        this.interviews = [];
    }
    addInterview(interview) {
        this.interviews = [...this.interviews, interview];
        console.log(this.interviews);
    }
}

function limpiar(){
    let m = document.querySelectorAll('p');
    for (let n = 0 ; n < m.length ; n++){
        m[n].remove();
    }
}
class UserInterface {
    // 15.2 Metodo para gestión de los errores o confirmaciones del interfaz de usuario
    printAlert(mensaje, tipo) {
        // 15.3 Crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
        // 15.4 
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // 15.5 Mensaje de error
        divMensaje.textContent = mensaje;

        // 15.6 Agregar el div al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-entrevista'));

        // 15.7 Quitar el alert después de 3 segundos
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    // 17.1 Metodo para imprimir entrevistas
    
    printInterviews({interviews}){ // aplicar destructuring desde funciones
        limpiar();
        interviews.forEach(interview => {
            const {id, camper, fecha, hora, psicologa, resultados, img} = interview;
            const interviewHTML = document.createElement('p');
            interviewHTML.innerHTML = `
                <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                <div class="col-md-4">
                    <img src="img/${img}" class="img-fluid rounded-start" alt="...">
                </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${camper}</h5>
                            <p class="card-text">${psicologa}</p>
                            <p class="card-text"><small class="text-body-secondary">${resultados}</small></p>
                    </div>
                </div>
                </div>
            </div>
            `;

            document.querySelector('#entrevistas').appendChild(interviewHTML);
        });
    }
}



// 11. Instanciar las clases de Interviews y UserInterface --> (objetos)
const interviewsManager = new Interviews();
const userInterface = new UserInterface();

// 13. Funcion para validar y agregar una nueva entrevista psicologica
function nuevaEntevista(e) {
    e.preventDefault();
    // 14. Destructuring desde objeto de entrevistas
    const {
        camper,
        psicologa,
        fecha,
        hora,
        resultados
    } = entrevistaObject;

    // 15. Validar
    if (camper === '' || psicologa === '' || fecha === '' || hora === '' || resultados === '') {
        // 15.1 Uso del metodo del objeto userInterface
        userInterface.printAlert('Todos los campos son obligatorios', 'error');
        return;
    }
    // 16. Gestión de un nuevo registro
    // 16.1 Generar un ID UNICO
    entrevistaObject.id = Date.now();
    // Agregar img al objeto buscando el nombre del camper
    var index = campers.findIndex(e => e.nombre === entrevistaObject.camper);

    if (index !== -1) {
        console.log(campers[index]);
        entrevistaObject.img = campers[index].imagen;
        console.log(entrevistaObject.img);
        index = null;
    }

    // 16.3 Invocar metodo que añade entrevista
    interviewsManager.addInterview({
        ...entrevistaObject
    });

    // 16.4 Reiniciar formulario
    formulario.reset();

    // 16.5 Reiniciar objeto
    reiniciarObjeto();

    // 17. Imprimir HTML de entrevista
    userInterface.printInterviews(interviewsManager);
}

function reiniciarObjeto() {
    entrevistaObject.id = '';
    entrevistaObject.camper = '';
    entrevistaObject.fecha = '';
    entrevistaObject.hora = '';
    entrevistaObject.psicologa = '';
    entrevistaObject.resultados = '';
    entrevistaObject.img = '';
}