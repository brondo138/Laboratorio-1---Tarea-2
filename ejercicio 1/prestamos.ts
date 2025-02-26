import { Prestamo, Multa , LibroVirtual, GeneroLibro, EstadoLibro} from "./libros";
import { mostrar, seleccionar } from "./function";
import { rd } from "./readline";
import { usuarios } from "./usuarios";

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

const prestamosLista: GestionPrestamos[] = []


export async function prestamos() {
    let usuario = Number((await rd.question("\nIngresa tu id: ")).trim());

    if (usuarios.some(cliente => cliente.id == usuario)) {
        let cliente = seleccionar(usuario,usuarios)
        console.log(`Bienvenido ${cliente.nombre}`);
    }else{
        console.error("\nError: ID no encontrado\n");
        
    }
}
