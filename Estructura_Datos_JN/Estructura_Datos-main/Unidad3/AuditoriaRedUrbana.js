class CentroAcopio {
    /**
     * @param {number} id - Identificador único del centro.
     * @param {string} nombre - Nombre descriptivo del nodo urbano.
     */
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
        this.paquetes = [];
    }
}

class AuditoriaRedUrbana {
    constructor() {
        /**
         * Tabla Hash principal que mapea el ID del centro con su nodo y adyacencias.
         * @type {Map<number, {nodo: CentroAcopio, rutas: Set<number>}>}
         */
        this.red = new Map();
    }

    /**
     * Registra un nuevo centro de acopio en la topología urbana.
     * @param {number} id - ID del nodo.
     * @param {string} nombre - Nombre del centro.
     * @returns {boolean} True si se insertó, False si ya existía.
     * @complexity O(1) - La inserción en un Map de JavaScript opera en tiempo constante promedio.
     */
    agregarCentro(id, nombre) {
        if (this.red.has(id)) return false;
        this.red.set(id, {
            nodo: new CentroAcopio(id, nombre),
            rutas: new Set()
        });
        return true;
    }

    /**
     * Conecta dos centros de acopio mediante una ruta de distribución bidireccional.
     * @param {number} idOrigen - ID del nodo de origen.
     * @param {number} idDestino - ID del nodo de destino.
     * @throws {Error} Si alguno de los nodos no existe en la red.
     * @complexity O(1) - Búsqueda en Map e inserción en Set operan en tiempo constante.
     */
    conectarRuta(idOrigen, idDestino) {
        const origen = this.red.get(idOrigen);
        const destino = this.red.get(idDestino);
        
        if (!origen || !destino) {
            throw new Error(`Edge Case: Intento de conexión con nodos inexistentes (${idOrigen} -> ${idDestino})`);
        }
        
        origen.rutas.add(idDestino);
        destino.rutas.add(idOrigen);
    }

    /**
     * Ingiere un paquete logístico en un centro específico en tiempo constante.
     * @param {number} idCentro - ID del centro de acopio.
     * @param {string} codigoPaquete - Código único del paquete.
     * @complexity O(1) - Acceso por clave hash y push al final del arreglo.
     */
    recibirPaquete(idCentro, codigoPaquete) {
        const registro = this.red.get(idCentro);
        if (!registro) {
            throw new Error(`NullPointerException virtual: El centro ${idCentro} no está en la red.`);
        }
        registro.nodo.paquetes.push(codigoPaquete);
    }

    /**
     * Verifica la existencia de una ruta directa entre dos nodos.
     * @param {number} idOrigen - ID de origen.
     * @param {number} idDestino - ID de destino.
     * @returns {boolean} True si existe conexión directa.
     * @complexity O(1) - Búsqueda en la Tabla Hash y verificación en el Set.
     */
    existeRuta(idOrigen, idDestino) {
        const origen = this.red.get(idOrigen);
        return origen ? origen.rutas.has(idDestino) : false;
    }
}

module.exports = { AuditoriaRedUrbana, CentroAcopio };