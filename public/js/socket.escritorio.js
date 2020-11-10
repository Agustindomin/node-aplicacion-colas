// Lógica de un nuevo escritorio

// Comando para establecer la conexión con el servidor por socket
var socket = io();

// Obtenemos todos los parámetros de la Url
var searchParams = new URLSearchParams( window.location.search );
// console.log( searchParams.has('escritorio') );

// V alida os que venga el parametro escritorio
if ( !searchParams.has('escritorio') ) {
    window.location = 'index.html'; // abandonamos la pantalla, porque no va a funcionar nada
    throw new Error('El escritorio es necesario');
}

// Recuperamos el escritorio
var escritorio = searchParams.get('escritorio');
console.log( escritorio );

// Ponemos el escritorio en el tag <small></small>
$('h1').text(`Escritorio ${ escritorio }`);

var label = $('small');

// TAREA: eventos onConnect y onDisconnect
// .on ===> Escuchar ó recibir eventos / información
// .emit ===> Enviar ó emitir eventos / información

// Evento click para todos los botones de la pantalla escritorio.html con  JQuery
$('button').on('click', function() {

    // TAREA: definir evento atenderTicket en FrontEnd y BackEnd
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) { // respuesta del servidor al envío
        
        console.log(resp);

        // Validamos que haya tickets
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }

        // Ponemos el ticket en la pantalla
        label.text('Ticket' + resp.numero);

    });

});
