"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var TipoTarea;
(function (TipoTarea) {
    TipoTarea["Desarrollo"] = "Desarrollo";
    TipoTarea["Mantenimiento"] = "Mantenimiento";
    TipoTarea["Investigaci\u00F3n"] = "Investigaci\u00F3n";
})(TipoTarea || (TipoTarea = {}));
var Prioridad;
(function (Prioridad) {
    Prioridad["Alta"] = "Alta";
    Prioridad["Media"] = "Media";
    Prioridad["Baja"] = "Baja";
})(Prioridad || (Prioridad = {}));
var EstadoTarea;
(function (EstadoTarea) {
    EstadoTarea["Pendiente"] = "Pendiente";
    EstadoTarea["EnProgreso"] = "En progreso";
    EstadoTarea["Completada"] = "Completada";
})(EstadoTarea || (EstadoTarea = {}));
var GestorTareas = /** @class */ (function () {
    function GestorTareas() {
        this.tareas = [];
    }
    GestorTareas.prototype.agregarTarea = function (tarea) {
        try {
            if (!tarea.titulo || !tarea.descripcion) {
                throw new Error("El título y la descripción son obligatorios.");
            }
            this.tareas.push(tarea);
            console.log("area agregada exitosamente .");
        }
        catch (error) {
            console.error("Error al agregar la tarea:", error.message);
        }
    };
    GestorTareas.prototype.obtenerTareasPorEstado = function (estado) {
        return this.tareas.filter(function (tarea) { return tarea.estado === estado; });
    };
    GestorTareas.prototype.generarReporte = function () {
        var tareasCompletadas = this.tareas.filter(function (t) { return t.estado === EstadoTarea.Completada; }).length;
        var tiemposEstimados = this.tareas
            .filter(function (t) { return "tiempoEstimadoHoras" in t; })
            .map(function (t) { return t.tiempoEstimadoHoras; });
        var promedioTiempoEstimado = tiemposEstimados.length > 0
            ? tiemposEstimados.reduce(function (a, b) { return a + b; }, 0) / tiemposEstimados.length
            : 0;
        return {
            totalTareas: this.tareas.length,
            tareasCompletadas: tareasCompletadas,
            promedioTiempoEstimado: promedioTiempoEstimado,
        };
    };
    return GestorTareas;
}());
// ingresar datos
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var gestor = new GestorTareas();
function preguntarDatos() {
    rl.question("Titulo de la tarea: ", function (titulo) {
        rl.question("Descripcion de la tarea: ", function (descripcion) {
            console.log("Seleccione el tipo de tarea:");
            Object.values(TipoTarea).forEach(function (tipo, index) {
                return console.log("".concat(index + 1, ". ").concat(tipo));
            });
            rl.question("Opcion: ", function (tipoSeleccionado) {
                var tipoIndex = parseInt(tipoSeleccionado) - 1;
                var tipo = Object.values(TipoTarea)[tipoIndex];
                if (!tipo) {
                    console.log("Opcion invalida.");
                    preguntarDatos();
                    return;
                }
                console.log("Seleccione la prioridad:");
                Object.values(Prioridad).forEach(function (prioridad, index) {
                    return console.log("".concat(index + 1, ". ").concat(prioridad));
                });
                rl.question("Opcion: ", function (prioridadSeleccionada) {
                    var prioridadIndex = parseInt(prioridadSeleccionada) - 1;
                    var prioridad = Object.values(Prioridad)[prioridadIndex];
                    if (!prioridad) {
                        console.log("Opcion invalida.");
                        preguntarDatos();
                        return;
                    }
                    console.log("Seleccione el estado:");
                    Object.values(EstadoTarea).forEach(function (estado, index) {
                        return console.log("".concat(index + 1, ". ").concat(estado));
                    });
                    rl.question("Opcion: ", function (estadoSeleccionado) {
                        var estadoIndex = parseInt(estadoSeleccionado) - 1;
                        var estado = Object.values(EstadoTarea)[estadoIndex];
                        if (!estado) {
                            console.log("Opcion invalida.");
                            preguntarDatos();
                            return;
                        }
                        rl.question("Tiempo estimado en horas: ", function (tiempo) {
                            var tiempoEstimadoHoras = parseFloat(tiempo);
                            if (isNaN(tiempoEstimadoHoras) || tiempoEstimadoHoras <= 0) {
                                console.log("Tiempo invalido. Debe ser un numero positivo.");
                                preguntarDatos();
                                return;
                            }
                            // Agregar tarea
                            gestor.agregarTarea({
                                id: Date.now(),
                                titulo: titulo,
                                descripcion: descripcion,
                                tipo: tipo,
                                prioridad: prioridad,
                                estado: estado,
                                tiempoEstimadoHoras: tiempoEstimadoHoras,
                            });
                            mostrarMenu();
                        });
                    });
                });
            });
        });
    });
}
function mostrarTareasPorEstado() {
    console.log("Seleccione el estado de las tareas a mostrar:");
    Object.values(EstadoTarea).forEach(function (estado, index) {
        return console.log("".concat(index + 1, ". ").concat(estado));
    });
    rl.question("Opcion: ", function (estadoSeleccionado) {
        var estadoIndex = parseInt(estadoSeleccionado) - 1;
        var estado = Object.values(EstadoTarea)[estadoIndex];
        if (!estado) {
            console.log("Opcion invalida.");
            mostrarTareasPorEstado();
            return;
        }
        var tareas = gestor.obtenerTareasPorEstado(estado);
        if (tareas.length === 0) {
            console.log("No hay tareas en este estado.");
        }
        else {
            console.clear();
            console.log("Tareas encontradas:");
            tareas.forEach(function (t) { return console.log("- ".concat(t.titulo, " (").concat(t.estado, ")")); });
        }
        mostrarMenu();
    });
}
function mostrarReporte() {
    var reporte = gestor.generarReporte();
    console.log("Reporte de Productividad:");
    console.log("Total de tareas: ".concat(reporte.totalTareas));
    console.log("Tareas completadas: ".concat(reporte.tareasCompletadas));
    console.log("Promedio de tiempo estimado: ".concat(reporte.promedioTiempoEstimado.toFixed(2), " horas"));
    mostrarMenu();
}
function mostrarMenu() {
    console.log("\n\t\t Menu Principal ");
    console.log("1. Agregar tarea");
    console.log("2. Mostrar tareas por estado");
    console.log("3. Generar reporte de productividad");
    console.log("4. Salir");
    rl.question("Seleccione una opcion: ", function (opcion) {
        switch (opcion) {
            case "1":
                preguntarDatos();
                break;
            case "2":
                mostrarTareasPorEstado();
                break;
            case "3":
                mostrarReporte();
                break;
            case "4":
                console.log("Saliendo...");
                rl.close();
                break;
            default:
                console.log("Opción invalida. Intente de nuevo.");
                mostrarMenu();
                break;
        }
    });
}
mostrarMenu();
