import { GeneroLibro, libros } from "./libros";

export function seleccionar(opcion: any, lista: any[]) {
    return lista.find(item => item.id === opcion);
}

export function mostrar(lista: any[], categoria?: GeneroLibro) {
    if (categoria) {
        lista.filter(libro => libro.genero === categoria).forEach((dato, index) => {
            console.log(`${index + 1}. ${dato.nombre}`);
        });
    } else {
        lista.forEach((dato, index) => {
            console.log(`${index + 1}. ${dato.nombre}`);
        });
    }
}
