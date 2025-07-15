const express = require("express");
const cors = require("cors");
const nasaRoutes = require("./routes/nasa.routes");
const statsRoutes = require("./routes/stats.routes");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();

// Swagger setup
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use("/api/nasa", nasaRoutes);
app.use("/api/stats", statsRoutes);

app.use(errorHandler);

module.exports = app;
