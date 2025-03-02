import { GeneroLibro, libros, LibroVirtual } from "./libros";
import { seleccionar } from "./function";
import { rd } from "./readline";
import { usuarios } from "./usuarios";

class GestionPrestamos {
    prestarLibro(usuarioID: number, libroID: number): void {
        let usuario = seleccionar(usuarioID, usuarios);
        let libro = seleccionar(libroID, libros);

        if (!usuario || !libro) {
            console.log("❌ Usuario o libro no encontrado.");
            return;
        }

        if (libro.cantidad <= 0) {
            console.log("❌ El libro no está disponible.");
            return;
        }

        if (usuario.libro) {
            console.log("❌ Ya tiene un libro en préstamo.");
            return;
        }

        usuario.libro = libro;
        libro.cantidad--;
        console.log(`✅ ${usuario.nombre} ha tomado prestado: "${libro.nombre}"`);
    }

    devolverLibro(usuarioID: number): void {
        let usuario = seleccionar(usuarioID, usuarios);
        if (!usuario || !usuario.libro) {
            console.log("❌ No hay libros en préstamo.");
            return;
        }
        usuario.libro.cantidad++;
        console.log(`📤 Has devuelto el libro: "${usuario.libro.nombre}"`);
        usuario.libro = undefined;
    }

    calcularMulta(usuarioID: number): number {
        let usuario = seleccionar(usuarioID, usuarios);
        if (!usuario || !usuario.libro) {
            console.log("✅ No tienes multas.");
            return 0;
        }
        const multa = 2.5; // Simulación de multa fija
        console.log(`💰 Multa acumulada: $${multa.toFixed(2)}`);
        return multa;
    }
}

// ✅ Función para solicitar préstamo de libros
export async function prestamos(usuario: any) {
    console.log("\n📚 Selecciona un libro para solicitar préstamo:");
    libros.forEach((libro, index) => {
        console.log(`${index + 1}. ${libro.nombre} - ${libro.cantidad} disponibles`);
    });

    let opcion = Number((await rd.question("\nSeleccione un libro (número): ")).trim());
    if (opcion > 0 && opcion <= libros.length) {
        const gestion = new GestionPrestamos();
        gestion.prestarLibro(usuario.id, libros[opcion - 1].id);
    } else {
        console.log("❌ Opción no válida.");
    }
}

// ✅ Función para devolver libros
export async function devolverLibro(usuario: any) {
    const prestamo = new GestionPrestamos();
    prestamo.devolverLibro(usuario.id);
}
