import { mostrar } from "./function";
import { rd } from "./readline";

export interface Prestamo {
    prestarLibro(usuarioID: number, libroID: number): void;
    devolverLibro(usuarioID: number): void;
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

export enum EstadoLibro {
    DISPONIBLE = "Disponible",
    NO_DISPONIBLE = "No disponible"
}

export enum GeneroLibro {
    ACCION = "Accion",
    FANTASIA = "Fantasia",
    TERROR = "Terror"
}

export abstract class Libro {
    constructor(
        public id: number,
        public genero: GeneroLibro,
        public nombre: string,
        public autor: string,
        public cantidad: number
    ) {}

    abstract mostrarInfo(): string;
}

export class LibroVirtual extends Libro {
    mostrarInfo() {
        return `📖 Nombre: ${this.nombre}\n👤 Autor: ${this.autor}\n🎭 Género: ${this.genero}\n📌 Disponibles: ${this.cantidad}`;
    }
}

export const libros: LibroVirtual[] = [
    new LibroVirtual(1, GeneroLibro.ACCION, "La isla del tesoro", "Robert L. Stevenson", 4),
    new LibroVirtual(2, GeneroLibro.FANTASIA, "El señor de los anillos", "J. R. R. Tolkien", 2),
    new LibroVirtual(3, GeneroLibro.TERROR, "Drácula", "Bram Stoker", 1)
];
