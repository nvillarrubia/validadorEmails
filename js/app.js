//Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

//Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');


//Validacion de email (expresion regular)
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


//EventListeners
eventListeners();

function eventListeners() {
    //Cuando la APP arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //Reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario);
    //Enviar email
    formulario.addEventListener('submit', enviarEmail);

    
}

//Funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

//Valida el formulario
function validarFormulario(e) {
    if(e.target.value.length > 0){

        //Elimina los errores
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }
    
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }else {
        
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios.');
    }

    if(e.target.type === 'email'){
        
        if(er.test( e.target.value)){
            //Elimina los errores
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
        }else if(e.target.value == ''){
            mostrarError('Todos los campos son obligatorios.');
        }else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Ingrese un email válido.');
        }
    }

    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }else{
        btnEnviar.disabled = true;
        btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
    }
}

//Mostrar mensaje de error
function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');

    if(errores.length === 0) {
        formulario.appendChild(mensajeError);
    }

    
}

//Enviar el email
function enviarEmail(e) {
    e.preventDefault();
    
    //Mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //Despues de 3 segundos ocultar el spinner y mostrar mensaje con resultado de la operacion
    setTimeout(() => {
        spinner.style.display = 'none';
        
        //Mensaje de confirmacion
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente.';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');


        //Inserto el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);
        

        setTimeout(() => {
            parrafo.remove();
            resetearFormulario();
        }, 3000);
    }, 3000);
}

//Resetear el formulario
function resetearFormulario(){
    formulario.reset();
    email.classList.remove('border', 'border-red-500','border', 'border-green-500');
    asunto.classList.remove('border', 'border-red-500','border', 'border-green-500');
    mensaje.classList.remove('border', 'border-red-500','border', 'border-green-500');
    iniciarApp();
}

