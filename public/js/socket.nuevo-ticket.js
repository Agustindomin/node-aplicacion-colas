// Lógica de un nuevo ticket

// Comando para establecer la conexión con el servidor por socket
var socket = io();

let lblNuevoTicket = $('#lblNuevoTicket'); // referencia al label lblNuevoTicket

// TAREA: eventos onConnect y onDisconnect
// .on ===> Escuchar ó recibir eventos / información
// .emit ===> Enviar ó emitir eventos / información

// Saber desde FrontEnd cuando está conectado al servidor BackEnd
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

// Saber desde FrontEnd cuando se ha desconectado del servidor BackEnd
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

// Recibimos información del estado actual desde el BackEnd del ultimo ticket
socket.on('estadoActual', function(estadoActual) {
    lblNuevoTicket.text( estadoActual.actual );
});


// Evento click para todos los botones de la pantalla nuevo-ticket.html con  JQuery
$('button').on('click', function() {
    // console.log('click')

    // TAREA: definir evento siguienteTicket en FrontEnd y BackEnd
    socket.emit('siguienteTicket', null, function(siguienteTicket) { // respuesta del servidor al envío
        
        lblNuevoTicket.text( siguienteTicket );

    });

});
