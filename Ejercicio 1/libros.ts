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
    reseñas: { usuario: string; calificacion: number; comentario: string }[] = [];

    mostrarInfo() {
        return `Nombre: ${this.nombre}\nAutor: ${this.autor}\nGénero: ${this.genero}\nDisponibles: ${this.cantidad}`;
    }

    agregarReseña(usuario: string, calificacion: number, comentario: string) {
        this.reseñas.push({ usuario, calificacion, comentario });
        console.log(`Reseña agregada para "${this.nombre}"`);
    }

    verReseñas() {
        if (!this.reseñas.length) {
            console.log("No hay reseñas aún para este libro.");
            return;
        }
        console.log(`Reseñas de "${this.nombre}":`);
        this.reseñas.forEach((reseña, index) => {
            console.log(`${index + 1}.${reseña.calificacion}/5 - "${reseña.comentario}" (por ${reseña.usuario})`);
        });
    }
}

export const libros: LibroVirtual[] = [
    new LibroVirtual(1, GeneroLibro.ACCION, "La isla del tesoro", "Robert L. Stevenson", 1),
    new LibroVirtual(2, GeneroLibro.ACCION, "Odisea", "Homero", 1),
    new LibroVirtual(3, GeneroLibro.ACCION, "Robinson Crusoe", "Daniel Defoe", 1),
    new LibroVirtual(4, GeneroLibro.FANTASIA, "El señor de los anillos", "J. R. R. Tolkien", 1),
    new LibroVirtual(5, GeneroLibro.FANTASIA, "El último deseo", "Andrzej Sapkowski", 1),
    new LibroVirtual(6, GeneroLibro.FANTASIA, "El pozo de la ascensión", "Brandon Sanderson", 1),
    new LibroVirtual(7, GeneroLibro.TERROR, "Drácula", "Bram Stoker", 1),
    new LibroVirtual(8, GeneroLibro.TERROR, "La casa de las sombras", "Adam Nevill", 1),
    new LibroVirtual(9, GeneroLibro.TERROR, "Carrie", "Stephen King", 1)
];
