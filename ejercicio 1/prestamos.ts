import { Prestamo, Multa , LibroVirtual, GeneroLibro, EstadoLibro} from "./libros";

class GestionPrestamos extends LibroVirtual implements Prestamo, Multa{

    constructor(genero: GeneroLibro, nombre: string, autor: string, estado:EstadoLibro) {
        super(genero, nombre, autor, estado);
    }
    
    prestarLibro(usuarioID: number, libroID: number): void {
        
    }

    devolverLibro(usuarioID: number, libroID: number): void {
        
    }

    calcularMulta(usuarioID: number): number {
        return 10;
    }
}

const prestamos: GestionPrestamos[] = []