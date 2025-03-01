import { GeneroLibro, libros, libroSeleccionPrestamo, LibroVirtual } from "./libros";
import { seleccionar } from "./function";
import { rd } from "./readline";
import { usuarios } from "./usuarios";

class GestionPrestamos {
    prestarLibro(usuarioID: number, libro: LibroVirtual): void {
        let usuario = seleccionar(usuarioID, usuarios);

        if (!usuario) {
            console.log("Error: Usuario no encontrado.");
            return;
        }

        if (!libro) {
            console.log("Error: Libro no encontrado.");
            return;
        }

        if (libro.cantidad <= 0) {
            console.log(`El libro "${libro.nombre}" no está disponible.`);
            return;
        }

        if (usuario.libro) {
            console.log("Lo sentimos, no puedes obtener otro libro mientras tengas uno.");
            return;
        }

        usuario.libro = libro;
        libro.cantidad -= 1;
        console.log(`${usuario.nombre} ha tomado prestado: "${libro.nombre}"`);
    }
}

export async function prestamos(usuario: any) {
    let condition = true;

    do {
        console.log(`
📚 Biblioteca Virtual - Usuario: ${usuario.nombre}
---------------------------------------------------
1. ${GeneroLibro.ACCION}
2. ${GeneroLibro.FANTASIA}
3. ${GeneroLibro.TERROR}
4. Volver
---------------------------------------------------
`);
        const opcion = Number((await rd.question("Seleccione una opción: ")).trim());

        switch (opcion) {
            case 1:
                await seleccionarYPrestarLibro(usuario, GeneroLibro.ACCION);
                break;
            case 2:
                await seleccionarYPrestarLibro(usuario, GeneroLibro.FANTASIA);
                break;
            case 3:
                await seleccionarYPrestarLibro(usuario, GeneroLibro.TERROR);
                break;
            case 4:
                condition = false;
                break;
            default:
                console.log("Error: Opción inválida, intente nuevamente.");
                break;
        }
    } while (condition);
}

async function seleccionarYPrestarLibro(usuario: any, genero: GeneroLibro) {
    console.log(`Libros de ${genero}`);
    const libroSeleccionado = await libroSeleccionPrestamo(libros, genero);

    if (libroSeleccionado === 1) {
        return;
    }

    console.log("\n🔎 Información del Libro:");
    console.log(libroSeleccionado.mostrarInfo());

    let confirmacion = Number((await rd.question("\n¿Quieres tomarlo prestado?\n1. Sí\n2. No\n\nOpción: ")).trim());

    if (confirmacion === 1) {
        const prestamo = new GestionPrestamos();
        prestamo.prestarLibro(usuario.id, libroSeleccionado);
    } else {
        console.log("Regresando al menú...");
    }
}
