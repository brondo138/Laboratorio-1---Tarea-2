"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline/promises"));
const node_process_1 = require("node:process");
// Clase abstracta para cartas base
class Carta {
    constructor(nombre, poder, elemento, habilidades) {
        this.nombre = nombre;
        this.poder = poder;
        this.elemento = elemento;
        this.habilidades = habilidades;
    }
    mejorar() {
        this.poder += 10;
        console.log(`${this.nombre} ha sido mejorada. Nuevo poder: ${this.poder}`);
    }
    combinar(otraCarta) {
        let nuevoPoder = Math.floor((this.poder + otraCarta.poder) * 1.2);
        let nuevoNombre = `${this.nombre}-${otraCarta.nombre}`;
        let nuevasHabilidades = [...new Set([...this.habilidades, ...otraCarta.habilidades])];
        let nuevoElemento = this.elemento; //Podria ser una fusion logica
        return new CartaFuego(nuevoNombre, nuevoPoder, nuevoElemento, nuevasHabilidades);
    }
}
// Clases concretas de cartas
class CartaFuego extends Carta {
    atacar(otraCarta) {
        let multiplicador = otraCarta.elemento === 'Planta' ? 2 : 1;
        let dano = this.poder * multiplicador;
        console.log(`${this.nombre} ataca a ${otraCarta.nombre} y causa ${dano} de daño.`);
    }
}
class CartaAgua extends Carta {
    atacar(otraCarta) {
        let multiplicador = otraCarta.elemento === 'Fuego' ? 2 : 1;
        let dano = this.poder * multiplicador;
        console.log(`${this.nombre} ataca a ${otraCarta.nombre} y causa ${dano} de daño.`);
    }
}
class CartaPlanta extends Carta {
    atacar(otraCarta) {
        let multiplicador = otraCarta.elemento === 'Agua' ? 2 : 1;
        let dano = this.poder * multiplicador;
        console.log(`${this.nombre} ataca a ${otraCarta.nombre} y causa ${dano} de daño.`);
    }
}
class CartaElectrica extends Carta {
    atacar(otraCarta) {
        let multiplicador = otraCarta.elemento === 'Agua' ? 2 : 1;
        let dano = this.poder * multiplicador;
        console.log(`${this.nombre} ataca a ${otraCarta.nombre} y causa ${dano} de daño.`);
    }
}
// Clase para mazos de cartas
class Mazo {
    constructor(nombre) {
        this.nombre = nombre;
        this.cartas = [];
    }
    agregarCarta(carta) {
        this.cartas.push(carta);
    }
    mostrarCartas() {
        console.log(`Mazo: ${this.nombre}`);
        this.cartas.forEach(carta => console.log(`${carta.nombre} - Poder: ${carta.poder} - Elemento: ${carta.elemento}`));
    }
    generarMazoTematico(elemento, cantidad) {
        for (let i = 0; i < cantidad; i++) {
            let carta = elemento === 'Fuego' ? new CartaFuego(`Fuego-${i}`, 50, 'Fuego', ['Llamarada']) :
                elemento === 'Agua' ? new CartaAgua(`Agua-${i}`, 50, 'Agua', ['Tormenta']) :
                    elemento === 'Planta' ? new CartaPlanta(`Planta-${i}`, 50, 'Planta', ['Raices']) :
                        new CartaElectrica(`Electro-${i}`, 50, 'Electrico', ['Chispa']);
            this.agregarCarta(carta);
        }
    }
}
// Función para pedir datos al usuario
function obtenerEntrada(mensaje) {
    return __awaiter(this, void 0, void 0, function* () {
        const rl = readline.createInterface({ input: node_process_1.stdin, output: node_process_1.stdout });
        const respuesta = yield rl.question(mensaje);
        rl.close();
        return respuesta;
    });
}
// Sistema de rankings
class Ranking {
    constructor() {
        this.jugadores = [];
    }
    agregarJugador(nombre, puntos) {
        this.jugadores.push({ nombre, puntos });
        this.jugadores.sort((a, b) => b.puntos - a.puntos);
    }
    mostrarRanking() {
        console.log("Ranking de jugadores:");
        this.jugadores.forEach((jugador, index) => {
            console.log(`${index + 1}. ${jugador.nombre} - Puntos: ${jugador.puntos}`);
        });
    }
}
// Juego principal
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Bienvenido al juego de cartas!");
        let nombreCarta1 = yield obtenerEntrada("Nombre de la primera carta: ");
        let poderCarta1 = parseInt(yield obtenerEntrada("Poder de la primera carta: "));
        let tipoCarta1 = yield obtenerEntrada("Elemento (Fuego/Agua): ");
        let habilidades1 = ["Ataque rápido", "Furia"];
        let nombreCarta2 = yield obtenerEntrada("Nombre de la segunda carta: ");
        let poderCarta2 = parseInt(yield obtenerEntrada("Poder de la segunda carta: "));
        let tipoCarta2 = yield obtenerEntrada("Elemento (Fuego/Agua): ");
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
    });
}
main();
