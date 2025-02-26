abstract class Usuario {
    constructor(public id: number, public nombre: string) {}

    abstract mostrarPerfil(): string;
}

class Cliente extends Usuario{
    constructor(id: number, nombre: string) {
        super(id, nombre);
    }

    mostrarPerfil(): string {
        return `ID: ${this.id} \nNombre de Usuario: ${this.nombre}`;
    }
}

const usuarios: Cliente[] = [
    new Cliente(1, "Alex Lovos"),
    new Cliente(2,"Steveen Portillo"),
    new Cliente(3, "Elvin Rivera")
]