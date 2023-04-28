const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
//require("./swagger/swagger")(app);
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Mi API',
      version: '1.0.0',
      description: 'Descripción de mi API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./swagger/routes.yml'], // Referencia al archivo YAML con las definiciones de rutas
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

const userRoutes = require("./routes/user");
const subscriptionRoutes = require("./routes/subscription");
const planRoutes = require("./routes/plan");

// middleware para agregar el prefijo "/api" a todas las rutas
/* const apiPrefix = (req, res, next) => {
  req.url = "/api" + req.url;
  next();
};
 */
// agregar el middleware al inicio de todas las rutas
//app.use(apiPrefix);
app.use("/users", userRoutes);
app.use("/subscriptions", subscriptionRoutes);
app.use("/plans", planRoutes);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${server.address().port}`);
});
