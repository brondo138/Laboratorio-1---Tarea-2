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

export function generarReporte(usuario: any) {
    if (!usuario.historial.length) {
        console.log("📌 No hay libros en el historial de préstamos.");
        return;
    }
    console.log("📊 Reporte de libros prestados:");
    usuario.historial.forEach((registro: any) => {
        console.log(`📖 Libro: ${registro.libro} | 📅 Fecha de préstamo: ${registro.fecha}`);
    });
}

export function recomendarLibros(usuario: any) {
    if (!usuario.historial.length) {
        console.log("📌 No hay historial de lectura. Prueba leyendo un libro primero.");
        return;
    }

    const librosRestantes = libros.filter(libro => 
        !usuario.historial.some((reg: any) => reg.libro === libro.nombre)
    );

    if (!librosRestantes.length) {
        console.log("✅ Has leído todos los libros disponibles.");
        return;
    }

    console.log("📌 Recomendaciones:");
    librosRestantes.slice(0, 3).forEach((libro, index) => {
        console.log(`${index + 1}. ${libro.nombre} - ${libro.autor}`);
    });
}


export function agregarAListaDeseos(usuario: any, libro: any) {
    if (!usuario.listaDeseos.includes(libro.nombre)) {
        usuario.listaDeseos.push(libro.nombre);
        console.log(`✅ Se ha añadido "${libro.nombre}" a tu lista de deseos.`);
    } else {
        console.log("❌ Este libro ya está en tu lista de deseos.");
    }
}

export function notificarDisponibilidad(usuario: any, libro: any) {
    if (!usuario.listaDeseos || !Array.isArray(usuario.listaDeseos)) {
        usuario.listaDeseos = [];
    }

    if (usuario.listaDeseos.includes(libro.nombre) && libro.cantidad > 0) {
        console.log(`📩 Notificación: "${libro.nombre}" ya está disponible.`);
        usuario.listaDeseos = usuario.listaDeseos.filter((item: string) => item !== libro.nombre);
    }
}
