import { LibroVirtual } from "./libros";

abstract class Usuario {
    constructor(protected id: number, public nombre: string) {}

    
    public get obtenerId() : number {
        return this.id
    }
    

    abstract mostrarLibros(): string;
}

export class Cliente extends Usuario{
    constructor(id: number, nombre: string, protected libro?: LibroVirtual) {
        super(id, nombre);
    }

    mostrarLibros(): string {

        if (this.libro) {
        
            return `\n${this.nombre}\nLibro: ${this.libro?.nombre}`;
        }else {
            return "";
        }
    }
}

export const usuarios: Cliente[] = [
    new Cliente(1, "Alex Lovos"),
    new Cliente(2,"Steveen Portillo"),
    new Cliente(3, "Elvin Rivera")
]

export function ingresar(id: number) {

    if (usuarios.some(cliente => cliente.obtenerId == id)) {
        return true;
    }else{
        console.error("\nError: ID no encontrado\n");
        
    }
}
