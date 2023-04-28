# Proyecto Backend

Este es un proyecto de backend en NodeJS que utiliza Express, Prisma, MySQL, Cors, Nodemailer, JWT y Swagger para crear una API RESTful.

## Estructura de carpetas

El proyecto está estructurado en las siguientes carpetas:

- `src`: Contiene el código fuente del proyecto.
  - `controllers`: Contiene los controladores de las rutas.
  - `middlewares`: Contiene los middlewares que se usan en la aplicación.
  - `models`: Contiene los modelos de datos de la aplicación.
  - `routes`: Contiene las definiciones de rutas de la aplicación.
  - `utils`: Contiene archivos de utilidad que se usan en la aplicación.
- `swagger`: Contiene los archivos de configuración de Swagger.

## Instalación

Para instalar el proyecto, se deben seguir los siguientes pasos:

1. Clonar el repositorio de Github:

   ```
   git clone <url-del-repositorio>
   ```

2. Instalar las dependencias del proyecto:

   ```
   npm install
   ```

## Configuración de la base de datos

El proyecto utiliza una base de datos MySQL, por lo que es necesario configurarla antes de poder utilizar la aplicación.

1. Crear una base de datos en MySQL.
2. Crear un archivo `.env` en la raíz del proyecto, y agregar la siguiente línea:

   ```
   DATABASE_URL=mysql://<usuario>:<contraseña>@<host>:<puerto>/<nombre-de-la-base-de-datos>
   ```

   Donde `<usuario>`, `<contraseña>`, `<host>`, `<puerto>` y `<nombre-de-la-base-de-datos>` corresponden a los valores de conexión a la base de datos que se quieren utilizar.

## Inicio del servidor

Para iniciar el servidor, se debe ejecutar el siguiente comando:

```
npm run dev
```

Esto iniciará el servidor en modo de desarrollo, lo que significa que la aplicación se reiniciará automáticamente cada vez que se haga un cambio en el código.

## Documentación

El proyecto cuenta con documentación generada automáticamente con Swagger. Para acceder a la documentación, se debe ingresar a la siguiente URL:

```
http://localhost:3000/api-docs/
```

## Estructura del Proyecto

El proyecto se divide en las siguientes carpetas:

- `controllers`: contiene los controladores para cada ruta.
- `models`: contiene los modelos de la base de datos utilizando Prisma.
- `routes`: contiene las rutas de la API.
- `swagger`: contiene los archivos para la documentación de la API con Swagger.
- `utils`: contiene funciones y utilidades generales para el proyecto.

## Base de Datos

El proyecto utiliza MySQL como base de datos y se utilizó Prisma como ORM para conectarse a ella.

Se crearon tres tablas:

- `User`: para almacenar los datos de los usuarios.
- `Plan`: para almacenar los planes de suscripción disponibles.
- `Subscription`: para almacenar la información de la suscripción de cada usuario.

## Tecnologías Utilizadas

- Node.js
- Express.js
- Prisma
- MySQL
- Cors
- Nodemailer
- JWT
- Swagger

## Cómo Iniciar el Proyecto

1. Clonar el repositorio.
2. Crear una base de datos en MySQL.
3. Configurar las variables de entorno en el archivo `.env`.
4. Instalar las dependencias con `npm install`.
5. Ejecutar las migraciones con `npx prisma migrate dev`.
6. Iniciar el servidor con `npm start`.

## Estructura del Archivo `.env`

El archivo `.env` debe contener las siguientes variables de entorno:

```
PORT=3000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_mysql_database_name
JWT_SECRET=your_jwt_secret_key
EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_USER=your_email_username
EMAIL_PASSWORD=your_email_password
```

## Rutas de la API

### Usuarios

- `POST /api/users`: crear un usuario nuevo.
- `GET /api/users/:id`: obtener información de un usuario por ID.
- `PUT /api/users/:id`: actualizar información de un usuario por ID.
- `DELETE /api/users/:id`: eliminar un usuario por ID.

### Documentación de la API

Para ver la documentación de la API se debe acceder a la ruta `/api-docs` en el navegador después de iniciar el servidor. La documentación se genera automáticamente con Swagger.

## Métodos de Diseño Utilizados

- Estructuración en carpetas y archivos separados para cada funcionalidad.
- Utilización de controladores para separar la lógica de negocio de las rutas.
- Utilización de modelos en Prisma para definir la estructura de la base de datos.
- Utilización de variables de entorno para la configuración del servidor y otros datos sensibles.
- Utilización de Swagger para la documentación automática de la API.

## Estructura del proyecto

El proyecto está organizado de la siguiente manera:

- `src`: contiene el código fuente de la aplicación
  - `config`: contiene la configuración de la aplicación
  - `controllers`: contiene los controladores de la aplicación
  - `middlewares`: contiene los middlewares utilizados en la aplicación
  - `models`: contiene los modelos de datos utilizados en la aplicación
  - `routes`: contiene las rutas de la aplicación
  - `services`: contiene los servicios de la aplicación
  - `utils`: contiene utilidades utilizadas en la aplicación
- `swagger`: contiene la documentación de la API en formato Swagger
- `tests`: contiene los tests de la aplicación
- `package.json`: archivo de configuración de NPM
- `README.md`: este archivo

## Tecnologías utilizadas

- Node.js
- Express
- Prisma
- MySQL
- Cors
- Nodemailer
- JWT
- Swagger

## Instalación

1. Clonar el repositorio:

```sh
git clone https://github.com/TU_USUARIO/backend-app.git
```

2. Instalar las dependencias:

```sh
cd backend-app
npm install
```

3. Crear el archivo `.env` en el directorio raíz del proyecto y definir las variables de entorno:

```
PORT=3000
DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME
JWT_SECRET=UNA_CLAVE_SECRETA
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=EMAIL_DE_ORIGEN
SMTP_PASS=CONTRASEÑA_DE_ORIGEN
```

4. Crear la base de datos y ejecutar las migraciones:

```sh
npx prisma migrate dev
```

## Uso

Para iniciar la aplicación, ejecutar el siguiente comando:

```sh
npm start
```

La aplicación estará disponible en `http://localhost:3000`.

Para consultar la documentación de la API, acceder a `http://localhost:3000/api-docs`.

## Estructura de la base de datos

La base de datos está compuesta por las siguientes tablas:

- `User`: almacena la información de los usuarios de la aplicación.
- `Plan`: almacena la información de los planes de suscripción disponibles.
- `Subscription`: almacena la información de las suscripciones de los usuarios.

## Contributing

1. Clonar el repositorio:

```sh
git clone https://github.com/TU_USUARIO/backend-app.git
```

2. Crear una nueva rama:

```sh
git checkout -b nombre-de-la-rama
```

3. Hacer los cambios necesarios y hacer commit:

```sh
git add .
git commit -m "Mensaje descriptivo de los cambios realizados"
```

4. Subir los cambios:

```sh
git push origin nombre-de-la-rama
```

5. Crear un Pull Request en GitHub.

## Licencia

MIT.

