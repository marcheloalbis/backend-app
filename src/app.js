require('dotenv').config();
const express = require("express");
const logger = require("./middlewares/logger");
const { setGlobalMiddlewares } = require('./middlewares/global');
const { swaggerUi, specs } = require('./swagger/swagger');
const hbs = require("hbs");
const hbsConfig = require("./config/hbsConfig");
const app = express();

// Middlewares para procesar solicitudes con formato application/json y application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuración del logger
app.use((req, res, next) => {
  req.logger = logger;
  next();
});

// Middlewares globales
setGlobalMiddlewares(app);

// Configuración de las vistas
app.engine(hbsConfig.viewEngine, hbs.__express);
app.set("view engine", hbsConfig.viewEngine);
app.set("views", hbsConfig.viewsFolder);


  const indexRouter = require("./routes/index");
  const authRouter = require("./routes/auth");
  const usersRouter = require("./routes/user");
  const subscriptionsRouter = require("./routes/subscription");
  const plansRouter = require("./routes/plan");
  const reportRouter = require('./routes/report');

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  app.use("/", indexRouter);
  app.use("/auth", authRouter); // Ruta libre
  app.use("/users", usersRouter); // Ruta protegida por autenticación de token
  app.use("/subscriptions", subscriptionsRouter); // Ruta protegida por autenticación de token
  app.use("/plans", plansRouter); // Ruta protegida por autenticación de token
  app.use('/report', reportRouter);

  // Inicio del servidor
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

// Manejo de errores
app.use((err, req, res, next) => {
  // Registra el error en el logger
  req.logger.error(err.stack);
  
  // Devuelve una respuesta de error con detalles del error
  res.status(500).json({
    error: {
      message: err.message,
      stack: err.stack,
      additionalInfo: "Información adicional que pueda ser útil"
    }
  });
});
