const { AuditoriaRedUrbana } = require('./AuditoriaRedUrbana');

class SimuladorEstocastico {
    constructor(red, totalEventos) {
        this.red = red;
        this.totalEventos = totalEventos;
        this.metricas = { exitosos: 0, fallos: 0, tiempoEjecucionMs: 0 };
        this.logsErrores = [];
    }

    /**
     * Genera un valor entero uniforme entre min y max basado en U(0,1).
     * @complexity O(1)
     */
    _randomUniforme(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Ejecuta la simulación de Monte Carlo disparando eventos aleatorios masivos.
     * @complexity O(N) donde N es el número total de eventos simulados.
     */
    ejecutarPruebaDeEstres() {
        console.log(`[INICIO] Disparando simulación de Monte Carlo con ${this.totalEventos} eventos...`);
        const inicio = Date.now();

        // Precarga de topología base (10 centros)
        for (let i = 1; i <= 10; i++) {
            this.red.agregarCentro(i, `Centro-Urbano-${i}`);
        }

        // Bucle de inyección de estrés estocástico
        for (let i = 0; i < this.totalEventos; i++) {
            const operacion = Math.random(); // Distribución U(0,1)
            const idOrigen = this._randomUniforme(1, 12); // Rango ampliado a 12 para forzar Edge Cases
            const idDestino = this._randomUniforme(1, 12);

            try {
                if (operacion < 0.40) {
                    // 40% probabilidad: Inserción de paquete
                    this.red.recibirPaquete(idOrigen, `PKG-ECO-${Date.now()}-${i}`);
                } else if (operacion < 0.70) {
                    // 30% probabilidad: Conexión de ruta
                    if (idOrigen !== idDestino) {
                        this.red.conectarRuta(idOrigen, idDestino);
                    }
                } else if (operacion < 0.90) {
                    // 20% probabilidad: Consulta de ruta (Búsqueda en grafo)
                    this.red.existeRuta(idOrigen, idDestino);
                } else {
                    // 10% probabilidad: Creación dinámica de nuevo centro
                    this.red.agregarCentro(idOrigen, `Centro-Dinamico-${idOrigen}`);
                }
                this.metricas.exitosos++;
            } catch (error) {
                this.metricas.fallos++;
                this.logsErrores.push({ evento: i, tipo: error.message });
            }
        }

        this.metricas.tiempoEjecucionMs = Date.now() - inicio;
        this._generarReporte();
    }

    _generarReporte() {
        const tasaFallos = (this.metricas.fallos / this.totalEventos) * 100;
        console.log("\n--- REPORTE DE AUDITORÍA DE ESTRÉS (UNLD) ---");
        console.log(`Tiempo total de ejecución: ${this.metricas.tiempoEjecucionMs} ms`);
        console.log(`Eventos Procesados: ${this.totalEventos}`);
        console.log(`Operaciones Exitosas: ${this.metricas.exitosos}`);
        console.log(`Fallos Interceptados (Edge Cases): ${this.metricas.fallos}`);
        console.log(`Tasa de Fallos (λ): ${tasaFallos.toFixed(2)}%`);
        
        if (this.logsErrores.length > 0) {
            console.log(`\nMuestra de Logs de Error Mitigados:`);
            console.log(this.logsErrores.slice(0, 3));
        }
    }
}

// Ejecución del estrés según especificación de APE 15 (10,000 eventos)
const redUNLD = new AuditoriaRedUrbana();
const auditor = new SimuladorEstocastico(redUNLD, 10000);
auditor.ejecutarPruebaDeEstres();