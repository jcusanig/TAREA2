class ColaPedidos {
    constructor() {
        this.pedidos = [];
        this.contadorId = 1;
    }

    // Encolar: Agregar pedido al final de la cola
    enqueue(cliente, plato) {
        const nuevoPedido = {
            id: this.contadorId++,
            cliente: cliente,
            plato: plato,
            hora: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            })
        };
        this.pedidos.push(nuevoPedido);
    }

    // Desencolar: Retirar el PRIMER pedido que entró
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.pedidos.shift(); // .shift() remueve el primer elemento
    }

    // Verificar si la cola está vacía
    isEmpty() {
        return this.pedidos.length === 0;
    }

    // Obtener todos los pedidos actuales
    obtenerPedidos() {
        return this.pedidos;
    }
}

// ==========================================
// 2. LÓGICA DE INTERACCIÓN Y PANTALLA
// ==========================================

const miCola = new ColaPedidos();

// Referencias a elementos del DOM
const formPedido = document.getElementById('form-pedido');
const inputCliente = document.getElementById('cliente');
const selectPlato = document.getElementById('plato');
const listaPedidosUI = document.getElementById('lista-pedidos');
const btnEntregar = document.getElementById('btn-entregar');

// Función para renderizar la cola en pantalla
function actualizarPantalla() {
    listaPedidosUI.innerHTML = ''; // Limpiar lista
    const pedidos = miCola.obtenerPedidos();

    if (pedidos.length === 0) {
        listaPedidosUI.innerHTML = '<p class="empty-msg">No hay pedidos en cola.</p>';
        return;
    }

    pedidos.forEach((pedido, index) => {
        const li = document.createElement('li');

        // Si es el primero de la cola, le indicamos que está en preparación activa
        const estado = index === 0 ? ' [EN PREPARACIÓN]' : '';

        li.innerHTML = `
                    <div>
                        <strong>#${pedido.id} - ${pedido.cliente}</strong>${estado}<br>
                        <small>${pedido.plato}</small>
                    </div>
                    <span>${pedido.hora}</span>
                `;
        listaPedidosUI.appendChild(li);
    });
}

// Evento 1: Agregar pedido desde Caja
formPedido.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar que recargue la página

    const cliente = inputCliente.value.trim();
    const plato = selectPlato.value;

    if (cliente && plato) {
        miCola.enqueue(cliente, plato);
        actualizarPantalla();

        // Limpiar formulario
        formPedido.reset();
        inputCliente.focus();
    }
});

// Evento 2: Entregar/Despachar pedido desde Cocina
btnEntregar.addEventListener('click', () => {
    if (miCola.isEmpty()) {
        alert("No hay pedidos pendientes para entregar.");
        return;
    }

    // Atiende strictly el primero que entró (FIFO)
    const pedidoEntregado = miCola.dequeue();
    alert(` Pedido #${pedidoEntregado.id} de "${pedidoEntregado.cliente}" (${pedidoEntregado.plato}) ha sido LISTO Y ENTREGADO.`);

    actualizarPantalla();
});