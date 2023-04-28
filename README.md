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

## Manejo de suscripciones

El proyecto incluye un sistema de manejo de suscripciones basado en planes. Para utilizarlo, se deben seguir los siguientes pasos:

1. Crear los planes de suscripción en la base de datos, utilizando el modelo de datos definido en `src/models/subscription.js`.
2. Utilizar el middleware `subscriptionMiddleware` en las rutas que se quieren proteger con suscripciones.
3. Utilizar el controlador `subscribe` para que los usuarios puedan suscribirse a un plan.
4. Utilizar el controlador `unsubscribe` para que los usuarios puedan cancelar su suscripción.

## Autores

- Nombre Apellido (correo-electrónico)
- Nombre Apellido (correo-electrónico)
