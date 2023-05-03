const express = require("express");
const path = require("path");
const jwt = require('jsonwebtoken');
const logger = require("./middlewares/logger");
const { setGlobalMiddlewares } = require('./middlewares/global');
const { swaggerUi, specs } = require('./swagger/swagger');
const ejs = require("ejs");
const ejsConfig = require("./config/ejsConfig");

const app = express();

// Middlewares para procesar solicitudes con formato application/json y application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración del logger
app.use((req, res, next) => {
  req.logger = logger;
  next();
});

// Middlewares globales
setGlobalMiddlewares(app);

// Configuración de las vistas
app.engine(ejsConfig.viewEngine, ejs.renderFile);
app.set("view engine", ejsConfig.viewEngine);
app.set("views", ejsConfig.viewsFolder);

// Rutas
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/user");
const subscriptionsRouter = require("./routes/subscription");
const plansRouter = require("./routes/plan");

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use("/", indexRouter);
app.use("/auth", authRouter); // Ruta libre
app.use("/users", usersRouter); // Ruta protegida por autenticación de token
app.use("/subscriptions", subscriptionsRouter); // Ruta protegida por autenticación de token
app.use("/plans", plansRouter); // Ruta protegida por autenticación de token


// Manejo de errores
app.use((err, req, res, next) => {
  req.logger.error(err.stack);
  res.status(500).send("Something broke!");
});

// Inicio del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});