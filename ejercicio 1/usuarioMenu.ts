import { prestamos, devolverLibro } from "./prestamos";
import { rd } from "./readline";
import { Cliente } from "./usuarios";
import { generarReporte, recomendarLibros } from "./function";

export async function menu(usuario: Cliente) {
    let condition = true;
    do {
        let opcion = Number((await rd.question(`
📚 Biblioteca Virtual - Usuario: ${usuario.nombre}
---------------------------------------------------
1. Solicitar préstamo 
2. Devolver libros 
3. Mostrar recomendaciones 
4. Generar reportes 
5. Valorar libros 
6. Notificaciones
7. Cerrar sesión
---------------------------------------------------
Seleccione una opción: `)).trim());

        switch (opcion) {
            case 1:
                await prestamos(usuario);
                break;
            case 2:
                await devolverLibro(usuario);
                break;
            case 3:
                recomendarLibros(usuario);
                break;
            case 4:
                generarReporte(usuario);
                break;
            case 5:
                console.log("⭐ Valorar libros...");
                break;
            case 6:
                console.log("📩 Revisando notificaciones...");
                break;
            case 7:
                condition = false;
                break;
            default:
                console.error("❌ Error: Ingrese una opción válida");
                break;
        }
    } while (condition);
}
