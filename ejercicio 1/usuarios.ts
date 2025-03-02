import { LibroVirtual } from "./libros";

abstract class Usuario {
    constructor(protected id: number, public nombre: string, public libro?: LibroVirtual) {}

    public get obtenerId(): number {
        return this.id;
    }

    abstract mostrarLibros(): string;
}

export class Cliente extends Usuario {
    mostrarLibros(): string {
        return this.libro ? `📚 Libro en préstamo: ${this.libro.nombre}` : "📭 No tiene libros en préstamo.";
    }
}

export const usuarios: Cliente[] = [
    new Cliente(1, "Alex Lovos"),
    new Cliente(2, "Steveen Portillo"),
    new Cliente(3, "Elvin Rivera")
];

export function ingresar(id: number): boolean {
    return usuarios.some(cliente => cliente.obtenerId === id);
}
