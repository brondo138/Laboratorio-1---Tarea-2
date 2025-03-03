import * as readline from "readline";

enum TipoTarea {
  Desarrollo = "Desarrollo",
  Mantenimiento = "Mantenimiento",
  Investigación = "Investigación",
}

enum Prioridad {
  Alta = "Alta",
  Media = "Media",
  Baja = "Baja",
}

enum EstadoTarea {
  Pendiente = "Pendiente",
  EnProgreso = "En progreso",
  Completada = "Completada",
}

type TareaBase = {
  id: number;
  titulo: string;
  descripcion: string;
  tipo: TipoTarea;
  prioridad: Prioridad;
  estado: EstadoTarea;
};

type TareaConTiempoEstimado = TareaBase & {
  tiempoEstimadoHoras: number;
};

type ReporteProductividad = {
  totalTareas: number;
  tareasCompletadas: number;
  promedioTiempoEstimado: number;
};

class GestorTareas<T extends TareaBase> {
  private tareas: T[] = [];

  agregarTarea(tarea: T): void {
    try {
      if (!tarea.titulo || !tarea.descripcion) {
        throw new Error("El título y la descripción son obligatorios.");
      }
      this.tareas.push(tarea);
      console.log("area agregada exitosamente .");
    } catch (error: any) {
      console.error("Error al agregar la tarea:", error.message);
    }
  }

  obtenerTareasPorEstado(estado: EstadoTarea): T[] {
    return this.tareas.filter((tarea) => tarea.estado === estado);
  }

  generarReporte(): ReporteProductividad {
    const tareasCompletadas = this.tareas.filter(
      (t) => t.estado === EstadoTarea.Completada
    ).length;

    const tiemposEstimados = this.tareas
      .filter((t) => "tiempoEstimadoHoras" in t)
      .map((t: any) => t.tiempoEstimadoHoras);

    const promedioTiempoEstimado =
      tiemposEstimados.length > 0
        ? tiemposEstimados.reduce((a, b) => a + b, 0) / tiemposEstimados.length
        : 0;

    return {
      totalTareas: this.tareas.length,
      tareasCompletadas,
      promedioTiempoEstimado,
    };
  }
}

// ingresar datos
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const gestor = new GestorTareas<TareaConTiempoEstimado>();

function preguntarDatos(): void {
  rl.question("Titulo de la tarea: ", (titulo) => {
    rl.question("Descripcion de la tarea: ", (descripcion) => {
      console.log("Seleccione el tipo de tarea:");
      Object.values(TipoTarea).forEach((tipo, index) =>
        console.log(`${index + 1}. ${tipo}`)
      );

      rl.question("Opcion: ", (tipoSeleccionado) => {
        const tipoIndex = parseInt(tipoSeleccionado) - 1;
        const tipo = Object.values(TipoTarea)[tipoIndex];

        if (!tipo) {
          console.log("Opcion invalida.");
          preguntarDatos();
          return;
        }

        console.log("Seleccione la prioridad:");
        Object.values(Prioridad).forEach((prioridad, index) =>
          console.log(`${index + 1}. ${prioridad}`)
        );

        rl.question("Opcion: ", (prioridadSeleccionada) => {
          const prioridadIndex = parseInt(prioridadSeleccionada) - 1;
          const prioridad = Object.values(Prioridad)[prioridadIndex];

          if (!prioridad) {
            console.log("Opcion invalida.");
            preguntarDatos();
            return;
          }

          console.log("Seleccione el estado:");
          Object.values(EstadoTarea).forEach((estado, index) =>
            console.log(`${index + 1}. ${estado}`)
          );

          rl.question("Opcion: ", (estadoSeleccionado) => {
            const estadoIndex = parseInt(estadoSeleccionado) - 1;
            const estado = Object.values(EstadoTarea)[estadoIndex];

            if (!estado) {
              console.log("Opcion invalida.");
              preguntarDatos();
              return;
            }

            rl.question("Tiempo estimado en horas: ", (tiempo) => {
              const tiempoEstimadoHoras = parseFloat(tiempo);

              if (isNaN(tiempoEstimadoHoras) || tiempoEstimadoHoras <= 0) {
                console.log("Tiempo invalido. Debe ser un numero positivo.");
                preguntarDatos();
                return;
              }

              // Agregar tarea
              gestor.agregarTarea({
                id: Date.now(),
                titulo,
                descripcion,
                tipo,
                prioridad,
                estado,
                tiempoEstimadoHoras,
              });

              mostrarMenu();
            });
          });
        });
      });
    });
  });
}

function mostrarTareasPorEstado(): void {
  console.log("Seleccione el estado de las tareas a mostrar:");
  Object.values(EstadoTarea).forEach((estado, index) =>
    console.log(`${index + 1}. ${estado}`)
  );

  rl.question("Opcion: ", (estadoSeleccionado) => {
    const estadoIndex = parseInt(estadoSeleccionado) - 1;
    const estado = Object.values(EstadoTarea)[estadoIndex];

    if (!estado) {
      console.log("Opcion invalida.");
      mostrarTareasPorEstado();
      return;
    }

    const tareas = gestor.obtenerTareasPorEstado(estado);
    if (tareas.length === 0) {
      console.log("No hay tareas en este estado.");
    } else {
      console.clear();
      console.log("Tareas encontradas:");
      tareas.forEach((t) => console.log(`- ${t.titulo} (${t.estado})`));
    }

    mostrarMenu();
  });
}

function mostrarReporte(): void {
  const reporte = gestor.generarReporte();
  console.log("Reporte de Productividad:");
  console.log(`Total de tareas: ${reporte.totalTareas}`);
  console.log(`Tareas completadas: ${reporte.tareasCompletadas}`);
  console.log(
    `Promedio de tiempo estimado: ${reporte.promedioTiempoEstimado.toFixed(2)} horas`
  );

  mostrarMenu();
}

function mostrarMenu(): void {
  console.log("\n\t\t Menu Principal ");
  console.log("1. Agregar tarea");
  console.log("2. Mostrar tareas por estado");
  console.log("3. Generar reporte de productividad");
  console.log("4. Salir");

  rl.question("Seleccione una opcion: ", (opcion) => {
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
