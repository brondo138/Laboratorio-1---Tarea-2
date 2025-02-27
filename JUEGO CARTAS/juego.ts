import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { log } from 'node:console';

// Interfaz para una carta
interface ICarta {
    nombre: string;
    poder: number;
    elemento: string;
    habilidades: string[];
    mejorar(): void;
    atacar(otraCarta: Carta): void;
}

// Clase abstracta para cartas base
abstract class Carta implements ICarta {
    constructor(
        public nombre: string,
        public poder: number,
        public elemento: string,
        public habilidades: string[]
    ) {}

    abstract atacar(otraCarta: Carta): void;
    
    mejorar(): void {
        this.poder += 10;
        console.log(`${this.nombre} ha sido mejorada. Nuevo poder: ${this.poder}`);
    }

    combinar(otraCarta: Carta): Carta {
        let nuevoPoder = Math.floor((this.poder + otraCarta.poder) * 1.2);
        let nuevoNombre = `${this.nombre}-${otraCarta.nombre}`;
        let nuevasHabilidades = [...new Set([...this.habilidades, ...otraCarta.habilidades])];
        let nuevoElemento = this.elemento; //Podria ser una fusion logica

        return new CartaFuego(nuevoNombre, nuevoPoder, nuevoElemento, nuevasHabilidades);
    }
}

// Clases concretas de cartas
class CartaFuego extends Carta {
    atacar(otraCarta: Carta): void {
        let multiplicador = otraCarta.elemento === 'Planta' ? 2 : 1;
        let dano = this.poder * multiplicador;
        console.log(`${this.nombre} ataca a ${otraCarta.nombre} y causa ${dano} de daño.`);
    }
}

class CartaAgua extends Carta {
    atacar(otraCarta: Carta): void {
        let multiplicador = otraCarta.elemento === 'Fuego' ? 2 : 1;
        let dano = this.poder * multiplicador;
        console.log(`${this.nombre} ataca a ${otraCarta.nombre} y causa ${dano} de daño.`);
    }
}

class CartaPlanta extends Carta {
    atacar(otraCarta: Carta): void {
        let multiplicador = otraCarta.elemento === 'Agua' ? 2 : 1;
        let dano = this.poder * multiplicador;
        console.log(`${this.nombre} ataca a ${otraCarta.nombre} y causa ${dano} de daño.`);
    }
}

class CartaElectrica extends Carta {
    atacar(otraCarta: Carta): void {
        let multiplicador = otraCarta.elemento === 'Agua' ? 2 : 1;
        let dano = this.poder * multiplicador;
        console.log(`${this.nombre} ataca a ${otraCarta.nombre} y causa ${dano} de daño.`);
        
    }
}

// Clase para mazos de cartas
class Mazo {
    cartas: Carta[] = [];

    constructor(public nombre: string) {}

    agregarCarta(carta: Carta): void {
        this.cartas.push(carta);
    }

    mostrarCartas(): void {
        console.log(`Mazo: ${this.nombre}`);
        this.cartas.forEach(carta => console.log(`${carta.nombre} - Poder: ${carta.poder} - Elemento: ${carta.elemento}`));
    }
    generarMazoTematico(elemento: string, cantidad: number): void {
        for(let i = 0; i < cantidad; i++) {
            let carta = elemento === 'Fuego' ? new CartaFuego(`Fuego-${i}`, 50, 'Fuego', ['Llamarada']) :
                        elemento === 'Agua' ? new CartaAgua(`Agua-${i}`, 50, 'Agua', ['Tormenta']) :
                        elemento === 'Planta' ? new CartaPlanta(`Planta-${i}`, 50, 'Planta', ['Raices']) :
                        new CartaElectrica(`Electro-${i}`, 50, 'Electrico', ['Chispa']);
            this.agregarCarta(carta)
        }
    }
}



// Función para pedir datos al usuario
async function obtenerEntrada(mensaje: string): Promise<string> {
    const rl = readline.createInterface({ input, output });

    const respuesta = await rl.question(mensaje);
    rl.close();
    return respuesta;
}

// Sistema de rankings
class Ranking {
    private jugadores: { nombre: string, puntos: number }[] = [];

    agregarJugador(nombre: string, puntos: number): void {
        this.jugadores.push({ nombre, puntos });
        this.jugadores.sort((a, b) => b.puntos - a.puntos);
    }

    mostrarRanking(): void {
        console.log("Ranking de jugadores:");
        this.jugadores.forEach((jugador, index) => {
            console.log(`${index + 1}. ${jugador.nombre} - Puntos: ${jugador.puntos}`);
        });
    }
}

// Juego principal
async function main() {
    console.log("Bienvenido al juego de cartas!");
    let nombreCarta1 = await obtenerEntrada("Nombre de la primera carta: ");
    let poderCarta1 = parseInt(await obtenerEntrada("Poder de la primera carta: "));
    let tipoCarta1 = await obtenerEntrada("Elemento (Fuego/Agua): ");
    let habilidades1 = ["Ataque rápido", "Furia"];

    let nombreCarta2 = await obtenerEntrada("Nombre de la segunda carta: ");
    let poderCarta2 = parseInt(await obtenerEntrada("Poder de la segunda carta: "));
    let tipoCarta2 = await obtenerEntrada("Elemento (Fuego/Agua): ");
    let habilidades2 = ["Escudo mágico", "Regeneración"];

    let carta1 = tipoCarta1 === 'Fuego' ? new CartaFuego(nombreCarta1, poderCarta1, tipoCarta1, habilidades1) : new CartaAgua(nombreCarta1, poderCarta1, tipoCarta1, habilidades1);
    let carta2 = tipoCarta2 === 'Fuego' ? new CartaFuego(nombreCarta2, poderCarta2, tipoCarta2, habilidades2) : new CartaAgua(nombreCarta2, poderCarta2, tipoCarta2, habilidades2);

    let mazo = new Mazo("Mazo principal");
    mazo.agregarCarta(carta1);
    mazo.agregarCarta(carta2);
    mazo.mostrarCartas();

    carta1.atacar(carta2);
    carta2.atacar(carta1);

    let ranking = new Ranking();
    ranking.agregarJugador("Jugador 1", Math.floor(Math.random() * 100));
    ranking.agregarJugador("Jugador 2", Math.floor(Math.random() * 100));
    ranking.mostrarRanking();
}

main();
