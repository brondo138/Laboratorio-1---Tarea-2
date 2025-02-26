import { Prestamo, Multa , LibroVirtual, GeneroLibro, EstadoLibro, libros} from "./libros";
import { mostrar, seleccionarLibro } from "./function";
import { rd } from "./readline";
import { ingresar, usuarios } from "./usuarios";

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


export async function prestamos(usuario:any) {
    
    let condition = true;
    
    do {
        

        const opcion = Number((await rd.question(`
Biblioteca Virtual, Usuario: ${usuario.nombre}, Categorias de Libros\n---------------------------------------------------
1.${GeneroLibro.ACCION}
2.${GeneroLibro.FANTASIA}
3.${GeneroLibro.TERROR}
4.Volver\n---------------------------------------------------\nSeleccione una opción: `)).trim());

        switch (opcion) {
            case 1:

                mostrar(libros,GeneroLibro.ACCION)
                
                break;
            case 2:
                mostrar(libros,GeneroLibro.FANTASIA)
                break;
            case 3:
                mostrar(libros,GeneroLibro.TERROR)
                break;
            case 4:
                condition = false;
                break;
        
            default:
                break;
        }
    } while (condition);
}


