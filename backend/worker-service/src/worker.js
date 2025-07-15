require("dotenv").config();

const { startWorker } = require("./utils/rabbitmqClient");
const { processJob } = require("./services/nasa.service");

startWorker(processJob);
