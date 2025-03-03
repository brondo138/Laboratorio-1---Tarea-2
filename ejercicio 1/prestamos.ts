import { libros } from "./libros";
import { seleccionar, agregarAListaDeseos, notificarDisponibilidad } from "./function";
import { rd } from "./readline";
import { usuarios } from "./usuarios";

class GestionPrestamos {
    prestarLibro(usuarioID: number, libroID: number, fechaPrestamo: string): void {
        let usuario = seleccionar(usuarioID, usuarios);
        let libro = seleccionar(libroID, libros);

        if (!usuario || !libro) {
            console.log("Error: Usuario o libro no encontrado.");
            return;
        }

        if (libro.cantidad <= 0) {
            console.log("El libro no está disponible. Puedes añadirlo a tu lista de deseos.");
            agregarAListaDeseos(usuario, libro);
            return;
        }

        if (usuario.libro) {
            console.log("Ya tiene un libro en préstamo solo puede tener 1 libro a la vez.");
            return;
        }

        usuario.libro = libro;
        libro.cantidad--;
        usuario.fechaPrestamo = fechaPrestamo;
        console.log(`${usuario.nombre} ha tomado prestado: "${libro.nombre}" el ${fechaPrestamo}`);
    }

    devolverLibro(usuarioID: number, fechaDevolucion: string): void {
        let usuario = seleccionar(usuarioID, usuarios);
        if (!usuario || !usuario.libro) {
            console.log("No hay libros en préstamo.");
            return;
        }
    
        let fechaPrestamo = new Date(usuario.fechaPrestamo);
        let fechaDevolucionDate = new Date(fechaDevolucion);

        let regexFecha = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        if (!regexFecha.test(fechaDevolucion)) {
            console.log("Error: La fecha ingresada no tiene un formato válido (YYYY-MM-DD).");
            return;
        }

        let [año, mes, dia] = fechaDevolucion.split("-").map(Number);
        let fechaVerificada = new Date(año, mes - 1, dia);
    
        if (fechaVerificada.getFullYear() !== año || fechaVerificada.getMonth() + 1 !== mes || fechaVerificada.getDate() !== dia) {
            console.log("Error: La fecha ingresada no es válida.");
            return;
        }
    
        if (fechaDevolucionDate < fechaPrestamo) {
            console.log("Error: No puedes ingresar una fecha anterior a la del préstamo.");
            return;
        }
    
        usuario.historial.push({
            libro: usuario.libro.nombre,
            fecha: usuario.fechaPrestamo
        });
    
        usuario.libro.cantidad++;
        console.log(`Has devuelto el libro: "${usuario.libro.nombre}" el ${fechaDevolucion}`);
    
        let diasPrestamo = Math.ceil((fechaDevolucionDate.getTime() - fechaPrestamo.getTime()) / (1000 * 60 * 60 * 24));
        if (diasPrestamo > 7) {
            let multa = (diasPrestamo - 7) * 0.5;
            console.log(`Multa aplicada: $${multa.toFixed(2)}`);
        }
    
        notificarDisponibilidad(usuario.libro);
        
        usuario.libro = undefined;
        usuario.fechaPrestamo = "";
    }
}

export async function prestamos(usuario: any) {
    console.log("\nSelecciona un libro para solicitar préstamo:");
    libros.forEach((libro, index) => {
        console.log(`${index + 1}. ${libro.nombre} - ${libro.cantidad} disponibles`);
    });

    let opcion = Number((await rd.question("\nSeleccione un libro (número): ")).trim());
    if (opcion > 0 && opcion <= libros.length) {
        const gestion = new GestionPrestamos();
        gestion.prestarLibro(usuario.id, libros[opcion - 1].id, new Date().toISOString().split('T')[0]);
    } else {
        console.log("Opción no válida.");
    }
}

export async function devolverLibro(usuario: any) {
    const fechaDevolucion = await rd.question("\nIngrese la fecha de devolución (YYYY-MM-DD): ");
    const prestamo = new GestionPrestamos();
    prestamo.devolverLibro(usuario.id, fechaDevolucion);
}
