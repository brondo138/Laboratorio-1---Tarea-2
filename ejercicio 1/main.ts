import { seleccionar } from "./function";
import { prestamos } from "./prestamos";
import { rd } from "./readline";
import { menu } from "./usuarioMenu";
import { ingresar, usuarios } from "./usuarios";

async function main() {

    let condition = true;
    do {
        const opcion = Number((await rd.question(`
Biblioteca Virtual\n---------------------------------------------------\n1.Ingresar
2.Salir\n---------------------------------------------------\nSeleccione una opción: `)).trim());
        
        switch (opcion) {
            case 1:
                const usuarioID = Number((await rd.question("\nIngresa tu id: ")).trim());
                if (ingresar(usuarioID) == true) {
                    let usuario = seleccionar(usuarioID,usuarios) 

                    await menu(usuario);
                }else {
                    console.error("Error: Ingresa un usuario valido");
                }
                break;
            case 2:
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
