import { mostrar, seleccionar, seleccionarLibrosGenero } from "./function";
import { rd } from "./readline";

// -------------------- INTERFACES --------------------

export interface Prestamo {
    prestarLibro(usuarioID: number, libroID: number): void;
    devolverLibro(usuarioID: number, libroID: number): void;
}

export interface Recomendacion {
    recomendarLibros(usuarioID: number): string[];
}

export interface Multa {
    calcularMulta(usuarioID: number): number;
}

export interface Reporte {
    generarReporte(): void;
}

export interface Reseña {
    generarReseña(libroId: number, calificacion: number, comentario: string): void;
}

export interface Notificacion {
    notificarDisponibilidad(libroId: number, usuarioId: number): void;
}

// -------------------- ENUMS --------------------

export enum EstadoLibro {
    DISPONIBLE = "Disponible",
    NO_DISPONIBLE = "No disponible"
}

export enum GeneroLibro {
    ACCION = "Accion",
    FANTASIA = "Fantasia",
    TERROR = "Terror"
}

// -------------------- CLASES --------------------

export abstract class Libro {
    constructor(
        public id: number,
        public genero: GeneroLibro,
        public nombre: string,
        public autor: string,
        protected estado: EstadoLibro
    ) {}

    abstract mostrarInfo(): string;
}

export class LibroVirtual extends Libro {
    constructor(id: number, genero: GeneroLibro, nombre: string, autor: string, public cantidad: number, estado: EstadoLibro) {
        super(id, genero, nombre, autor, estado);
    }

    mostrarInfo() {
        return `📖 Nombre: ${this.nombre}\nAutor: ${this.autor}\nGénero: ${this.genero}\nDisponibles: ${this.cantidad}\n`;
    }
}

// -------------------- LISTA DE LIBROS --------------------

export const libros: LibroVirtual[] = [
    new LibroVirtual(1, GeneroLibro.ACCION, "La isla del tesoro", "Robert Louis Stevenson", 4, EstadoLibro.DISPONIBLE),
    new LibroVirtual(2, GeneroLibro.ACCION, "Odisea", "Homero", 7, EstadoLibro.DISPONIBLE),
    new LibroVirtual(3, GeneroLibro.ACCION, "Robinson Crusoe", "Daniel Defoe", 8, EstadoLibro.DISPONIBLE),

    new LibroVirtual(4, GeneroLibro.FANTASIA, "El señor de los anillos", "J. R. R. Tolkien", 2, EstadoLibro.DISPONIBLE),
    new LibroVirtual(5, GeneroLibro.FANTASIA, "El último deseo", "Andrzej Sapkowski", 13, EstadoLibro.DISPONIBLE),
    new LibroVirtual(6, GeneroLibro.FANTASIA, "El pozo de la ascensión", "Brandon Sanderson", 3, EstadoLibro.DISPONIBLE),

    new LibroVirtual(7, GeneroLibro.TERROR, "Drácula", "Bram Stoker", 1, EstadoLibro.DISPONIBLE),
    new LibroVirtual(8, GeneroLibro.TERROR, "La casa de las sombras", "Adam Nevill", 7, EstadoLibro.DISPONIBLE),
    new LibroVirtual(9, GeneroLibro.TERROR, "Carrie", "Stephen King", 1, EstadoLibro.DISPONIBLE),
];

// -------------------- FUNCIÓN PARA SELECCIONAR LIBRO --------------------

export async function libroSeleccionPrestamo(libros: any[], genero: GeneroLibro) {
    let condition = true;

    do {
        try {
            let librosGenero = libros.filter(libro => libro.genero === genero && libro.cantidad > 0);

            if (librosGenero.length === 0) {
                console.log(`No hay libros disponibles en la categoría ${genero}.`);
                return 1;
            }

            mostrar(librosGenero);
            let opcion = Number(
                (await rd.question(`${librosGenero.length + 1}. Volver\nSeleccione una opción: `)).trim()
            );

            if (opcion === librosGenero.length + 1) {
                condition = false;
                return 1;
            } else if (opcion > 0 && opcion <= librosGenero.length) {
                condition = false;
                return librosGenero[opcion - 1];
            } else {
                console.log("Opción inválida, intente nuevamente.");
            }
        } catch (error) {
            console.error("Error: Ingrese una opción válida.");
        }
    } while (condition);
}
