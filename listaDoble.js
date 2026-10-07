JavaScript
// 1. Clase NodoFoto que almacena el nombre de la imagen y los punteros
class NodoFoto {
    constructor(data) {
        this.nombre = data;
        this.siguiente = null;
        this.anterior = null;
    }
}

// 2. Clase Galeria para gestionar las imágenes y la navegación
class Galeria {
    constructor() {
        this.cabeza = null;
        this.cola = null;
        this.actual = null; // Mantiene el rastreo de la foto visualizada en el momento
    }

    // Agregar nuevas fotos al final de la lista
    agregarFoto(nombre) {
        const nuevoNodo = new NodoFoto(nombre);

        if (this.cabeza === null) {
            this.cabeza = nuevoNodo;
            this.cola = nuevoNodo;
            this.actual = nuevoNodo; // La primera foto agregada es la actual por defecto
            return;
        }

        this.cola.siguiente = nuevoNodo;
        nuevoNodo.anterior = this.cola;
        this.cola = nuevoNodo;
    }

    // Avanzar al siguiente nodo
    siguienteFoto() {
        if (this.actual && this.actual.siguiente !== null) {
            this.actual = this.actual.siguiente;
            console.log(`Avanzando a: ${this.actual.nombre}`);
        } else {
            console.log("Estás en la última foto. No hay siguiente.");
        }
    }

    // Retroceder usando el enlace anterior
    fotoAnterior() {
        if (this.actual && this.actual.anterior !== null) {
            this.actual = this.actual.anterior;
            console.log(`Retrocediendo a: ${this.actual.nombre}`);
        } else {
            console.log("Estás en la primera foto. No hay anterior.");
        }
    }

    // Método auxiliar para ver la foto que se está mostrando actualmente
    verFotoActual() {
        if (this.actual !== null) {
            console.log(`Foto actual: ${this.actual.nombre}`);
        } else {
            console.log("La galería está vacía.");
        }
    }
}

// --- Ejemplo de Uso ---
const miGaleria = new Galeria();

// Agregar fotos
miGaleria.agregarFoto("foto1.jpg");
miGaleria.agregarFoto("foto2.jpg");
miGaleria.agregarFoto("foto3.jpg");

// Navegación
miGaleria.verFotoActual(); // Foto actual: foto1.jpg
miGaleria.siguienteFoto(); // Avanzando a: foto2.jpg
miGaleria.siguienteFoto(); // Avanzando a: foto3.jpg
miGaleria.siguienteFoto(); // Estás en la última foto. No hay siguiente.
miGaleria.fotoAnterior(); // Retrocediendo a: foto2.jpg
miGaleria.fotoAnterior(); // Retrocediendo a: foto1.jpg
miGaleria.fotoAnterior(); // Estás en la primera foto. No hay anterior.