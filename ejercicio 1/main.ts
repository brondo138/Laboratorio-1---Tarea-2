import { rd } from "./readline";

async function main() {

    let opcion = Number((await rd.question(`
Biblioteca Virtual\n---------------------------------------------------\n1.Gestionar prestamos 
2.Devolver libros 
3.Mostrar recomendaciones 
4.Calcular multas 
5.Generar reportes 
6.Valorar libros 
7.Notificar disponibilidad 
8.Salir\n---------------------------------------------------\nSeleccione una opción: `)).trim());

    let condition = true;
    do {
        
        switch (opcion) {
            case 1:
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
                process.exit(0);
                break;
            default:
                console.error("Error: Ingrese una opcion valida");
                break;
        }
    } while (condition);
}

main();