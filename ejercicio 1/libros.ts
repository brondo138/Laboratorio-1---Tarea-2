export interface Prestamo {
    prestarLibro(usuarioID: number, libroID: number):void;
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

export enum EstadoLibro {
    DISPONIBLE = "Disponible",
    NO_DISPONIBLE = "No disponible"
}

export enum GeneroLibro{
    ACCION = "Accion",
    FANTASIA = "Fantasia",
    TERROR = "Terror"
}

export abstract class Libro {
    constructor(public genero: GeneroLibro, public nombre: string, public autor: string, public estado:EstadoLibro){}

    abstract mostrarInfo();
}

export class LibroVirtual extends Libro {
    constructor( genero: GeneroLibro, nombre: string, autor: string, estado:EstadoLibro){
        super(genero, nombre, autor, estado);
    }

    mostrarInfo() {
        return `Nombre del Libro: ${this.nombre}\nAutor: ${this.autor}\nGenero: ${this.genero}\nEstado del libro: ${this.estado}`;
    }
}

const libros: LibroVirtual[] = [
    new LibroVirtual(GeneroLibro.ACCION, "La isla del tesoro","Robert Louis Stevenson",EstadoLibro.DISPONIBLE),
    new LibroVirtual(GeneroLibro.ACCION, "Odisea","Homero",EstadoLibro.DISPONIBLE),
    new LibroVirtual(GeneroLibro.ACCION,"Robinson Crusoe","Daniel Defoe",EstadoLibro.DISPONIBLE),

    new LibroVirtual(GeneroLibro.FANTASIA, "El señor de los anillos","J. R. R. Tolkien",EstadoLibro.DISPONIBLE),
    new LibroVirtual(GeneroLibro.FANTASIA, "El último deseo","Andrzej Sapkowski",EstadoLibro.DISPONIBLE),
    new LibroVirtual(GeneroLibro.FANTASIA,"El pozo de la ascensión","Brandon Sanderson",EstadoLibro.DISPONIBLE),

    new LibroVirtual(GeneroLibro.TERROR, "Drácula","Bram Stoker",EstadoLibro.DISPONIBLE),
    new LibroVirtual(GeneroLibro.TERROR, "La casa de las sombras","Adam L. G. Nevill",EstadoLibro.DISPONIBLE),
    new LibroVirtual(GeneroLibro.TERROR,"Carrie","Stephen King",EstadoLibro.DISPONIBLE),
]