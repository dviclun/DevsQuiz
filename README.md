![DevsQuiz Logo](./frontend/src/assets/images/logo.png)

###### Aplicación de preguntas sobre programación desarrollada como proyecto personal por *Daniel Vicent Luna*.

---

# Enlace al proyecto:

(Enlace aquí)



# Instalación del proyecto en local
---
###### Es necesario tener un cluster en MongoDB para poder hostear la base de datos no relacional.

##### Creación de la base de datos:

1. Descargar el código fuente.

2. Crear una base de datos en tu cluster de MongoDB con el nombre "DevsQuiz" para facilitar la conexión. 

3. Crear una colección en la base de datos "DevsQuiz" con el nombre de "questions".

4. Hacer click en "Insert document", cambiar la visualización de la pestaña a JSON haciendo click en el icono de las llaves "{}" y pegar el contenido del archivo *questions.json* que se encuentra en la carpeta "backend"

5. En la carpeta "backend" crear el archivo ".env" y añadir la variable MONGODB_URI

6. Añadir la URI para conectarte a tu cluster de MongoDB, cuando la añadas deberá verse algo como lo siguiente: 
`MONGODB_URI = mongodb+srv://<UsuarioMongoDB>:<ContraseñaMongoDB>@nombredetucluster.vufpz.mongodb.net/?retryWrites=true&w=majority&appName=<NombreDeTuCluster>`

7. Asegurate que en el archivo *app.js* la variable `dbName` tiene el mismo nombre que tu base de datos y `collectionName` el mismo nombre que la colección para que todo funcione correctamente.

##### Instalación de dependencias

1. Ejecutar el comando `npm install` en la carpeta "backend" desde la terminal.

2. Ejecutar el comando `npm install` en la carpeta "frontend" desde la terminal.

##### Ejecución de la aplicación

1. Ejecutar el comando `npm run dev` en la carpeta "backend" desde la terminal y comprobar que todo funciona correctamente.

2. Desde otra ventana de terminal, ejecutar el comando `npm run dev` en la carpeta "frontend" y comprobar que todo funciona correctamente.

##### Posibles errores

###### Si no se realiza la conexión a la base de datos, asegurate que la URI de conexión añadida en el archivo .env es la correcta y que el nombre de usuario y la contraseña sean correctos.

###### Si al ejecutar la aplicación todo funciona bien pero no cargan las preguntas asegurate de haber insertado correctamente la colección en tu base de datos MongoDB y que los nombres tanto de la base de datos como de la colección son correctos.








