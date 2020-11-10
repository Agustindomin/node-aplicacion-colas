const { io } = require('../server');
// Cargamos la clase TicketControl
const { TicketControl } = require('../classes/ticket-control');

// Nuevo objeto/Instancia ticketControl de la clase TicketControl
const ticketControl = new TicketControl();




io.on('connection', (client) => {

    // Escuchamos siguienteTicket
    client.on('siguienteTicket', (datos, callback) => {

        let siguienteTicket = ticketControl.siguienteTicket();

        console.log( siguienteTicket );

        callback(siguienteTicket);
    });
    
    // enviamos la informacion con el estado actual del ultimo ticket
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    // Escuchamos atenderTicket
    client.on('atenderTicket', (data, callback) => {

        // Validamos que viene el escritorio
        if ( !data.escritorio ) {
            return callback({
                err: true,
                mensaje: 'El escritorio ed necesario'
            });
        }
        
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        // TAREA Falta actualizar/notificar cambios ultimos4
        // enviamos la informacion ultimos4 a TODOS los usuarios conectados con .broadcast
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

   });


});