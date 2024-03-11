document.addEventListener('DOMContentLoaded',function(){
    // Creamos un objeto para guardar todos los  valores del email
    const email={
        email:'' ,
        asunto:'',
        mensaje:'',
        email_cc:'',
    }

    //Seleccionar los elementos de la interfaz
    const InputEmail=document.querySelector('#email');
    const InputAsunto=document.querySelector('#asunto');
    const InputMensaje=document.querySelector('#mensaje');
    const InputCopia=document.querySelector('#email_cc');
    const formulario=document.querySelector('#formulario');
    const btnSummit=document.querySelector('#formulario button[type="submit"]');
    const btnReset=document.querySelector('#formulario button[type="reset"]');
    const spinner=document.querySelector('#spinner_pro');             
    //Asignamos eventos a los inputs que queremos validar
    //Queremos que los eventos sean especificos para cada uno de los escenarios que se van a usar


    InputEmail.addEventListener('blur',validar);

    InputAsunto.addEventListener('blur',validar);

    InputMensaje.addEventListener('blur',validar);

    InputCopia.addEventListener('blur' , validar);

    

    btnReset.addEventListener('click',function(e){
        e.preventDefault();

        formulario.reset();

            reiniciar_objeto();

    })

    formulario.addEventListener('submit' ,enviar_email);


    //HACEMOS UNA FUNCTION PARA ELIMINAR EL CALLBACK Y QUE PUEDA SER REUTILIZABLE SIEMPRE QUE LA NECESITEMOS

    function validar(e){

        const valor=e.target.value.trim();

        const clase=document.querySelector('#email');   
        if(valor==='' && e.target.id!=='email_cc'){
            mostrar_alerta(`El campo de ${e.target.id} es obligatorio...`,e.target.parentElement);
            email[e.target.name]='';
            comprobar_email();
            return;
            
        } 
        borrar_alerta(e.target.parentElement);

      
        if(e.target.id==='email'&&!validar_email(e.target.value)){
            mostrar_alerta('El campo e-mail no es valido',e.target.parentElement);
            email[e.target.name]='';
            comprobar_email();
            return;
        }

        if(e.target.value==='' && e.target.name==='email_cc'){
            email[e.target.name]='';
            return
        }
        else if(e.target.id==='email_cc'&&!validar_email(e.target.value)){
            mostrar_alerta('El campo de "Con Copia no es valido...',e.target.parentElement);
            email[e.target.name]='';
            comprobar_email();
            return;
        }
   
        //Guardamos cada uno de los valores del email que ingreso el usuario en el objeto email despues de que paso todas las validaciones

        email[e.target.name] = e.target.value.trim().toLowerCase();
        comprobar_email();

        console.log(email);

    };

    function mostrar_alerta(mensaje , referencia){

         const alerta = referencia.querySelector('.bg-red-600'); 

        if(alerta){
            alerta.remove();
        };  
    
        const error=document.createElement('P');
        error.textContent=mensaje;
        error.classList.add('text-center', 'bg-red-600' , 'p-2');
        //Inyectar HTML del error al formulario

        referencia.appendChild(error);
    }


    function borrar_alerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600'); 
        if(alerta){
            alerta.remove();
        };
    }


        function validar_email(email){

            const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;

            const resultado= regex.test(email);
            return resultado;

        }

        function comprobar_email(){
            if(email.asunto==='' || email.email==='' || email.mensaje==='')
            {
                btnSummit.classList.add('opacity-50');
                btnSummit.disabled= true; 
                
            }
            else
            {
                btnSummit.classList.remove('opacity-50');
                btnSummit.disabled= false; 
            }
        }

        function enviar_email(e){

            e.preventDefault();

            spinner.classList.remove('hidden');
            spinner.classList.add('flex');

            setTimeout(() => {
                spinner.classList.add('hidden');
                spinner.classList.remove('flex');
                formulario.reset();

               reiniciar_objeto();

                const Alerta_de_Exito= document.createElement('P');
                Alerta_de_Exito.textContent='Tu email se ha enviado correctamente';
                Alerta_de_Exito.classList.add('text-center','back_azul','p-2');
                formulario.appendChild(Alerta_de_Exito);
                    setTimeout(() => {
                        Alerta_de_Exito.hidden=true;
                    }, 4000);

            }, 3000);


        }

        function reiniciar_objeto(){
             //Reiniciar el objeto
                
             email.email='';
             email.asunto='';
             email.mensaje='';
             email.email_cc='';
     
             comprobar_email();
        };

}); 