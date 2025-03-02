import { seleccionar } from "./function";
import { rd } from "./readline";
import { menu } from "./usuarioMenu";
import { ingresar, usuarios } from "./usuarios";

async function main() {
    let condition = true;
    do {
        const opcion = Number((await rd.question(`
Biblioteca Virtual
---------------------------------------------------
1. Ingresar
2. Salir
---------------------------------------------------
Seleccione una opción: `)).trim());

        switch (opcion) {
            case 1:
                const usuarioID = Number((await rd.question("\nIngresa tu id: ")).trim());
                if (ingresar(usuarioID)) {
                    let usuario = seleccionar(usuarioID, usuarios);
                    await menu(usuario);
                } else {
                    console.error("❌ Usuario no encontrado.");
                }
                break;
            case 2:
                condition = false;
                process.exit(0);
                break;
            default:
                console.error("❌ Ingrese una opción válida.");
                break;
        }
    } while (condition);
}

main();
