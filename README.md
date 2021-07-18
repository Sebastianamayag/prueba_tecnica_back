# Indicaciones 

## 1.
Ir la ruta "src/bd/Sequalize.js ", modificar la constante DBURL con los parametros de su base de datos para establecer la conexión.

## 2.
Instalar los paquetes necesarios haciendo uso del comando npm install o npm i 

## 3.
Correr el comando npm run dev o npm start,dependiendo de la preferencias personales.

## 4.
ENDPOINTS:

### Usuario:
* consulta para todos los usuarios http://localhost:4000/usuario. 
* consulta para un usuario por email http://localhost:4000/usuario/:email. 
* consulta para un usuario por id http://localhost:4000/usuario/loc/:id. 
* crear un usuario http://localhost:4000/usuario. 
* actualizar un usuario http://localhost:4000/usuario/actualizar/:email. 
* eliminar un usuario http://localhost:4000/usuario/:email. 

### Libro:
* consulta para todos los libros http://localhost:4000/libro. 
* consulta para un libro por id http://localhost:4000/libro/:id. 
* crear un libro http://localhost:4000/libro. 
* actualizar un libro http://localhost:4000/libro/actualizar/:id. 
* eliminar un libro http://localhost:4000/libro/:id. 

### Prestamo:
* consulta para todos los prestamos http://localhost:4000/prestamo. 
* consulta para un prestamo por email de usuario http://localhost:4000/prestamo/usuario/:email. 
* consulta para un prestamo por id del libro http://localhost:4000/prestamo/libro/:id_usuario. 
* consulta para un prestamo por id http://localhost:4000/prestamo/:id. 
* crear un prestamo http://localhost:4000/prestamo. 
* actualizar un prestamo http://localhost:4000/prestamo/actualizar/:id. 
* eliminar un prestamo http://localhost:4000/prestamo/:id. 