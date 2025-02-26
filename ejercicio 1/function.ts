export function seleccionar(opcion: number, lista: any[]) {
    let seleccion = lista.find(cliente => cliente.id === opcion);
    return seleccion;
}

export function mostrar(lista:any[]){

    lista.forEach((dato, index) => {
        console.log(`${index + 1}.${dato.nombre}`);
    });
}

