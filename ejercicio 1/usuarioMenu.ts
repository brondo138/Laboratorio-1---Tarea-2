import { prestamos, devolverLibro } from "./prestamos";
import { rd } from "./readline";
import { Cliente } from "./usuarios";

export async function menu(usuario: Cliente) {
    let condition = true;
    do {
        let opcion = Number((await rd.question(`
📚 Biblioteca Virtual - Usuario: ${usuario.nombre}
---------------------------------------------------
1. Solicitar préstamo 
2. Devolver libros 
3. Mostrar recomendaciones 
4. Calcular multas 
5. Generar reportes 
6. Valorar libros 
7. Notificar disponibilidad 
8. Cerrar sesión
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
                console.log("📌 Mostrando recomendaciones...");
                break;
            case 4:
                console.log("💰 Calculando multas...");
                break;
            case 5:
                console.log("📊 Generando reportes...");
                break;
            case 6:
                console.log("⭐ Valorar libros...");
                break;
            case 7:
                console.log("📩 Notificar disponibilidad...");
                break;
            case 8:
                condition = false;
                break;
            default:
                console.error("❌ Error: Ingrese una opción válida");
                break;
        }
    } while (condition);
}
