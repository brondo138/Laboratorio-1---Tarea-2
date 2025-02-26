enum EstadoLibro {
    DISPONIBLE = "Disponible",
    NO_DISPONIBLE = "No disponible"
}

enum GeneroLibro{
    ACCION = "Accion",
    FANTASIA = "Fantasia",
    TERROR = "Terror"
}

export class Libro {
    constructor(public genero: GeneroLibro, public nombre: string, public autor: string, public estado:EstadoLibro){}

    public mostrarInfo(){
        return `Nombre del Libro: ${this.nombre}\nAutor: ${this.autor}\nGenero: ${this.genero}\nEstado del libro: ${this.estado}`;
    }
}

const libros: Libro[] = [
    new Libro(GeneroLibro.ACCION, "La isla del tesoro","Robert Louis Stevenson",EstadoLibro.DISPONIBLE)
]

console.log(libros[0].mostrarInfo());