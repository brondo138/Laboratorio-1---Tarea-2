# 🏆 Laboratorio 1 - Tarea 2

## 📌 Integrantes del Proyecto
| Nombre                              | Carnet      |
|-------------------------------------|------------|
| **Elvin Elisander Rivera Sorto**    | **U20231642** |
| **Alex Francisco Lovos Argueta**    | **U20241471** |
| **Steveen Antonio Portillo Gómez**  | **20240573** |

---

## 📌 Ejercicios a Desarrollar

### **📚 Ejercicio 1: Biblioteca Virtual - Alex Francisco Lovos Argueta**
**Desarrollar un sistema para una biblioteca virtual que permita:**  
✅ Gestionar préstamos de libros electrónicos.  
✅ Implementar un sistema de recomendaciones basado en las últimas lecturas.  
✅ Calcular multas por retrasos automáticamente.  
✅ Generar reportes de libros más prestados.  
✅ Permitir valoraciones y reseñas de los usuarios.  
✅ Notificar cuando un libro de la lista de deseos esté disponible.  

**📌 Implementación:**  
✔️ **Interfaces** para definir la estructura de los datos.  
✔️ **Clases abstractas** y **clases concretas** para modelar libros y usuarios.  
✔️ **Herencia y polimorfismo** en la gestión de libros.  
✔️ **Validaciones y manejo de excepciones** en cada funcionalidad.  

📌 **Sistema de Recomendaciones:**  
El sistema **prioriza libros de la misma categoría** que el último leído por el usuario.  
Si ya no hay libros en esa categoría, **se pasa a otra disponible**.  
Si ya se leyeron todos los libros, **se muestra un mensaje informativo**.  

📌 **Usuarios Disponibles:**  
Cuando se solicite el id estos son los disponibles 
| ID | Nombre             |
|----|--------------------|
| 1  | Alex Lovos        |
| 2  | Steveen Portillo  |
| 3  | Elvin Rivera      |

---

### **🃏 Ejercicio 2: Juego de Cartas - Elvin Elisander Rivera Sorto**

**Desarrollar un juego de cartas que incluya:**  
✅ Cartas con poderes y habilidades únicas.  
✅ Mejora y combinación de cartas.  
✅ Sistema de batalla entre cartas.  
✅ Cálculo de daño según elementos y efectos especiales.  
✅ Creación automática de mazos temáticos.  
✅ Implementación de sistema de rankings.  

**📌 Implementación:**  
✔️ Uso de **interfaces** para definir estructuras de cartas y batallas.  
✔️ **Clases abstractas** y **concretas** para manejar cartas y jugadores.  
✔️ Aplicación de **herencia y polimorfismo** para gestionar habilidades y efectos.  
✔️ Sistema de **rankings** basado en las victorias y derrotas de los jugadores.  

---

### **📈 Ejercicio 3: Gestión de Tareas - Steveen Antonio Portillo Gómez**

**Desarrollar un sistema de gestión de tareas que:**  
✅ Maneje diferentes tipos de tareas.  
✅ Asigne prioridades a las tareas.  
✅ Calcule el tiempo estimado de cada tarea.  
✅ Genere reportes de productividad.  
✅ Permita asignación de recursos a las tareas.  

**📌 Implementación:**  
✔️ Uso de **Enums** para definir estados de las tareas.  
✔️ Implementación de **Types** para estructurar los datos.  
✔️ Uso de **Generics** para optimizar la gestión de tareas y recursos.  

---

## 📌 Criterios de Evaluación

✅ **Funcionalidad completa** de cada ejercicio.  
✅ **Uso correcto de TypeScript.**  
✅ **Entrada de datos manejada correctamente** en cada ejercicio.  
✅ **Código ordenado, bien estructurado y con buenas prácticas.**  
✅ **Validaciones y manejo de excepciones** en todas las funciones críticas.  
✅ **Entrega en dos formatos: ZIP y repositorio de GitHub.**  
✅ **Entrega puntual** antes del **2 de marzo de 2025**.  

---

## 📌 🖥️ Cómo Ejecutar el Proyecto

### **1️⃣ Instalar Dependencias**
Asegúrate de tener **Node.js** instalado y luego ejecuta:  

```bash
npm i ts-node
```

### **2️⃣ Compilar el Código**
Ejecuta el siguiente comando para compilar y correr los archivos TypeScript:  

```bash
ts-node main.ts 
```
Dependiendo que archivo quisiéramos ejecutar

---

## 📌 🗂️ Estructura del Proyecto
```
📦 laboratorio-1-tarea-2
 ├📂 Ejercicio 1
 ┃ ├📂 node_modules
 ┃ ├📄 ejercicio 1.txt       # Información sobre el ejercicio 1
 ┃ ├📄 function.ts           # Funciones principales del ejercicio 1
 ┃ ├📄 libros.ts             # Definición de clases y datos de libros
 ┃ ├📄 main.ts               # Punto de entrada del programa
 ┃ ├📄 package-lock.json     # Archivo de bloqueo de dependencias
 ┃ ├📄 package.json          # Dependencias del proyecto
 ┃ ├📄 prestamos.ts          # Gestión de préstamos y devoluciones
 ┃ ├📄 readline.ts           # Manejo de entrada de usuario en consola
 ┃ ├📄 tsconfig.json         # Configuración de TypeScript
 ┃ ├📄 usuarioMenu.ts        # Menú de opciones para los usuarios
 ┃ ├📄 usuarios.ts           # Datos de usuarios y validaciones
 ├📂 Ejercicio 2
 ┃ ├📄 juego.js              # Código JavaScript del juego de cartas
 ┃ ├📄 juego.ts              # Código TypeScript del juego de cartas
 ┃ ├📄 package-lock.json     # Archivo de bloqueo de dependencias
 ┃ ├📄 package.json          # Dependencias del ejercicio 2
 ┃ ├📄 tsconfig.json         # Configuración de TypeScript
 ├📂 Ejercicio 3
 ┃ ├📄 Ejercicio3.ts         # Código TypeScript del sistema de gestión de tareas
 ┃ ├📄 ejercicio3.js         # Código JavaScript del sistema de gestión de tareas

```

---

## 📌 📦 Formato de Entrega

### 📌 **1️⃣ Archivo ZIP**
El archivo **debe incluir**:
✔️ Todo el código fuente en la carpeta `src/`.  
✔️ Un archivo `integrantes.txt` con:  
   - **Nombres completos** de los integrantes.  
   - **Carnet de la universidad**.  
   - **Enlace del repositorio de GitHub** donde trabajaron el proyecto.  

### 📌 **2️⃣ Repositorio en GitHub**
El repositorio debe incluir:  
✔️ **Todo el código funcional de los ejercicios**.  
✔️ **Este README.md** con la documentación del proyecto.  
✔️ **Historial de commits** mostrando la contribución de cada integrante.  

---

## 📅 **Fecha de Entrega**
📌 **2 de Marzo 2025**  

🚀 **¡Gracias por revisar nuestro proyecto!**  
