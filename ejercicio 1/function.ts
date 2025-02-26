import { GeneroLibro, libros } from "./libros";

export function seleccionarLibro(opcion: any, lista: any[]) {
    
    let seleccion = lista.find(cliente => cliente.id === opcion);
    return seleccion;
}

export function mostrar(lista:any[],categoria?: GeneroLibro){

    if (categoria) {
        let librosFiltrados = libros.filter(libro => libro.genero == categoria);
        librosFiltrados.forEach((dato, index) => {
            console.log(`${index + 1}.${dato.nombre}`);
        });
    }else {
        lista.forEach((dato, index) => {
            console.log(`${index + 1}.${dato.nombre}`);
        });
    }
}

export function seleccionarLibros(filtrado,lista: any[]) {
    let librosFiltrados = lista.filter(libros => libros.genero == filtrado);
}