import { LibroVirtual } from "./libros";

export class Cliente {
    public historial: { libro: string; fecha: string }[] = [];
    public listaDeseos: string[] = [];
    public libro?: LibroVirtual;
    public fechaPrestamo: string = "";

    constructor(public id: number, public nombre: string) {}
}

export const usuarios: Cliente[] = [
    new Cliente(1, "Alex Lovos"),
    new Cliente(2, "Steveen Portillo"),
    new Cliente(3, "Elvin Rivera")
];

export function ingresar(id: number): boolean {
    return usuarios.some(cliente => cliente.id === id);
}
