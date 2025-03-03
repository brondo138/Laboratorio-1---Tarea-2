import { GeneroLibro, libros } from "./libros";
import { rd } from "./readline";
import { usuarios } from "./usuarios";

export function seleccionar(opcion: any, lista: any[]) {
    return lista.find(item => item.id === opcion);
}

export function mostrar(lista: any[], categoria?: GeneroLibro) {
    if (categoria) {
        lista.filter(libro => libro.genero === categoria).forEach((dato, index) => {
            console.log(`${index + 1}. ${dato.nombre}`);
        });
    } else {
        lista.forEach((dato, index) => {
            console.log(`${index + 1}. ${dato.nombre}`);
        });
    }
}

export function generarReporte(usuario: any) {
    if (!usuario.historial.length) {
        console.log("No hay libros en el historial de préstamos.");
        return;
    }
    console.log("Reporte de libros prestados:");
    usuario.historial.forEach((registro: any) => {
        console.log(`Libro: ${registro.libro} | Fecha de préstamo: ${registro.fecha}`);
    });
}

export function recomendarLibros(usuario: any) {
    if (!usuario.historial.length) {
        console.log("No hay historial de lectura. Prueba leyendo un libro primero.");
        return;
    }

    let ultimaCategoriaLeida: GeneroLibro | undefined;
    for (let i = usuario.historial.length - 1; i >= 0; i--) {
        let libroLeido = libros.find(libro => libro.nombre === usuario.historial[i].libro);
        if (libroLeido) {
            ultimaCategoriaLeida = libroLeido.genero;
            break;
        }
    }

    if (!ultimaCategoriaLeida) {
        console.log("Error al determinar la categoría leída.");
        return;
    }

    let librosMismaCategoria = libros.filter(libro =>
        libro.genero === ultimaCategoriaLeida &&
        !usuario.historial.some((hist: { libro: string }) => hist.libro === libro.nombre)
    );

    if (librosMismaCategoria.length > 0) {
        console.log("Recomendaciones de la misma categoría:");
        librosMismaCategoria.slice(0, 3).forEach((libro, index) => {
            console.log(`${index + 1}. ${libro.nombre} - ${libro.autor} (${libro.genero})`);
        });
        return;
    }

    let categoriasOrdenadas = Object.values(GeneroLibro).filter(cat => cat !== ultimaCategoriaLeida);
    let librosOtrasCategorias: any[] = [];

    for (let categoria of categoriasOrdenadas) {
        librosOtrasCategorias = libros.filter(libro =>
            libro.genero === categoria &&
            !usuario.historial.some((hist: { libro: string }) => hist.libro === libro.nombre)
        );
        if (librosOtrasCategorias.length > 0) {
            break;
        }
    }

    if (librosOtrasCategorias.length > 0) {
        console.log("No hay más libros en tu categoría, pero puedes probar estos:");
        librosOtrasCategorias.slice(0, 3).forEach((libro, index) => {
            console.log(`${index + 1}. ${libro.nombre} - ${libro.autor} (${libro.genero})`);
        });
        return;
    }

    console.log("Has leído todos los libros disponibles.");
}




export function agregarAListaDeseos(usuario: any, libro: any) {
    if (!usuario.listaDeseos.includes(libro.nombre)) {
        usuario.listaDeseos.push(libro.nombre);
        console.log(`Se ha añadido "${libro.nombre}" a tu lista de deseos.`);
    } else {
        console.log("Este libro ya está en tu lista de deseos.");
    }
}



export function notificarDisponibilidad(libro: any) {
    usuarios.forEach(usuario => {
        if (usuario.listaDeseos.includes(libro.nombre) && libro.cantidad > 0) {
            usuario.notificaciones.push(`El libro "${libro.nombre}" vuelve a estar disponible para que lo puedas leer.`);
            usuario.listaDeseos = usuario.listaDeseos.filter((item: string) => item !== libro.nombre);
        }
    });
}


export function mostrarNotificaciones(usuario: { notificaciones: string[] }) {
    console.log("\nNotificaciones");
    console.log("---------------------------------------------------");

    if (usuario.notificaciones.length === 0) {
        console.log("No tienes notificaciones nuevas.");
    } else {
        usuario.notificaciones.forEach((notificacion: string) => {
            console.log(notificacion);
        });
    }
}

export async function valorarLibro(usuario: any) {
    let opcion = Number((await rd.question(`
¿Qué deseas hacer?
--------------------------------
1. Escribir reseña
2. Ver todas las reseñas
--------------------------------
Seleccione una opción: `)).trim());

    switch (opcion) {
        case 1:
            await escribirReseña(usuario);
            break;
        case 2:
            verTodasLasReseñas();
            break;
        default:
            console.log("Error: Opción no válida.");
    }
}

async function escribirReseña(usuario: any) {
    console.log("\nSelecciona un libro para valorar:");
    libros.forEach((libro, index) => {
        console.log(`${index + 1}. ${libro.nombre}`);
    });

    let opcion = Number((await rd.question("\nSeleccione un libro (número): ")).trim());
    if (opcion < 1 || opcion > libros.length) {
        console.log("Error: Opción no válida.");
        return;
    }

    let libro = libros[opcion - 1];
    console.log(`\nValorando: ${libro.nombre}`);

    let calificacion = Number((await rd.question("\nIngresa una calificación (1-5): ")).trim());
    if (calificacion < 1 || calificacion > 5) {
        console.log("Error: Calificación no válida.");
        return;
    }

    let comentario = await rd.question("\nEscribe un comentario: ");
    libro.agregarReseña(usuario.nombre, calificacion, comentario);

    console.log("¡Gracias por tu valoración!");
}

function verTodasLasReseñas() {
    console.log("\nTodas las reseñas de la biblioteca:");
    let hayReseñas = false;

    libros.forEach((libro) => {
        libro.reseñas.forEach((reseña) => {
            console.log(`${libro.nombre} - ${reseña.calificacion}/5 - "${reseña.comentario}" (por ${reseña.usuario})`);
            hayReseñas = true;
        });
    });

    if (!hayReseñas) {
        console.log("No hay reseñas en la biblioteca aún.");
    }
}
