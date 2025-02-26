import { prestamos } from "./prestamos";
import { rd } from "./readline";
import { Cliente } from "./usuarios";

export async function menu(usuario: Cliente) {

    let condition = true;
    do {
        let opcion = Number((await rd.question(`
Biblioteca Virtual, Usuario: ${usuario.nombre}\n---------------------------------------------------\n1.Solicitar prestamo 
2.Devolver libros 
3.Mostrar recomendaciones 
4.Calcular multas 
5.Generar reportes 
6.Valorar libros 
7.Notificar disponibilidad 
8.Cerrar sesión\n---------------------------------------------------\nSeleccione una opción: `)).trim());
        
        switch (opcion) {
            case 1:
                await prestamos(usuario);
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                break;
            case 7:
                break;
            case 8:
                condition = false;
                break;
            default:
                console.error("Error: Ingrese una opcion valida");
                break;
        }
    } while (condition);
}