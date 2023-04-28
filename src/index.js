const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
const userRoutes = require("./routes/user");
const reportesRouter = require('./routes/reportes');

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// Configuración de la vista EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Swagger
const { swaggerUi, swaggerDocs } = require("./swagger/swagger");
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
const routes = require("./routes");
app.use("/", routes);
app.use("/users", userRoutes);
app.use('/reportes', reportesRouter);

// Iniciamos el servidor
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${server.address().port}`);
});
