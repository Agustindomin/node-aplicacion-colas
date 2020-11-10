// Lógica pantalla publico

// Comando para establecer la conexión con el servidor por socket
var socket = io();

// creamos referencia a cada element de pantalla que necesitamos
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');
var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

// variables intermedias
var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

// Saber desde FrontEnd cuando está conectado al servidor BackEnd
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

// Saber desde FrontEnd cuando se ha desconectado del servidor BackEnd
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

// TAREA 
// Recuperamos el último ticket
socket.on('estadoActual', function(data) {

    // console.log(data);

    actualizaHTML( data.ultimos4 );

});

// Recuperamos los ultimos4 ticket
socket.on('ultimos4', function(data) {

    // Reproducimos audio
    var audio = new Audio('audio/new-ticket.mp3');
    audio.muted = true;
    audio.play();
    audio.muted = false;

    actualizaHTML( data.ultimos4 );

});

function actualizaHTML( ultimos4 ) {

    for( var i=0; i <= ultimos4.length - 1; i++) {

        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);

    }

}