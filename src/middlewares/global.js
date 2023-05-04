const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const express = require("express");
/**
 * Configura los middlewares globales para la aplicación
 * @param {import('express').Application} app - La aplicación express
 */
function setGlobalMiddlewares(app) {
  // Agrega el middleware CORS para permitir solicitudes desde cualquier origen
  app.use(cors());
  app.use(express.static('public'));
  /* app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net");
    next();
  }); */
  // Crea el directorio logs si no existe
  const logsDir = path.join(__dirname, "../../", "logs");
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
  }

  // Abre el archivo de log y obtiene su descriptor de archivo
  const accessLogPath = path.join(logsDir, "access.log");
  const accessLogFd = fs.openSync(accessLogPath, "a");

  // Agrega el middleware Morgan para registrar las solicitudes entrantes
  app.use(
    morgan(":method :url HTTP/:http-version :status :res[content-length] - :response-time ms :remote-addr :user-agent", {
      // Define un stream de salida personalizado para registrar los mensajes de log
      stream: {
        write: (message) => {
          // Registra los mensajes de log en la consola y en un archivo de log
          console.log(message);
          // Escribe el mensaje en un archivo de log
          fs.writeSync(accessLogFd, message);
        },
      },
    })
  );
}

module.exports = {
  setGlobalMiddlewares,
};