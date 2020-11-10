// Clases en ES6

const fs = require('fs'); // FileSystem nativo de node

// Clase Ticket: numero de ticket y escritorio que lo va a gestionar
class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }

}

// Clase para controlar los tickets
class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate(); // día del mes
        this.tickets = []; // array con todos los tickets pendientes de gestionar
        this.ultimos4 = []; // Ultimos 4 tickets

        // Leemos si hay colas del día anterior en ../data/data.json
        let data = require('../data/data.json');
    
        // Vemnos si ha cambiado el día
        if (data.hoy === this.hoy) { // Recuperamos los datos alamcenados en data

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        }
        else { // reiniciamos Todo
            this.reiniciarConteo();
        }

    }

    siguienteTicket() {

        this.ultimo += 1;
        
        let ticket = new Ticket(this.ultimo, null); // creamos un nuevo ticket
        this.tickets.push(ticket); // añadimos el nuevo ticket, al array de tickets

        this.grabarData();

        return `Ticket ${ this.ultimo }`;
    }

    getUltimoTicket() {
        return `Ticket ${ this.ultimo }`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket( escritorio ) {

        // Validamos que haya tickets pendientes
        if ( this.tickets.length === 0 ) {
            return 'No hay tickets';
        }

        // Recuperamos el numero primer ticket en el array de tickets
        let numeroTicket = this.tickets[0].numero;
        // Eliminamos el ticket del array de tickets para que no se acumulen tickets ya atendidos
        this.tickets.shift();

        // Creamos la instancia del nuevo ticket que queremos atender
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        // Lo añadimos AL PRINCIPIO del array ultimos4
        this.ultimos4.unshift( atenderTicket ); 

        // Si ultimos4 es > 4 borramos el último elemento
        if ( this.ultimos4.length > 4 ) {
            this.ultimos4.splice(-1,1); // borra el ultimo elemento de un array
        }

        console.log('Ultimos 4:');
        console.log(this.ultimos4);

        // grabamos los datos
        this.grabarData();

        // Retornamos el nuevo ticket
        return atenderTicket;

    }

    reiniciarConteo() {

        this.ultimo = 0; // Inicializamos a 0
        this.tickets = []; // Inicializamos el array de tickets   
        this.ultimos4 = []; // Inicializamos el array de ultimos4
        
        console.log('Se ha inicializado el sistema');

        this.grabarData();
    }

    grabarData() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData); // convertimos el objeto json a string

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }


}


// exportacion
module.exports = {
    TicketControl,
}