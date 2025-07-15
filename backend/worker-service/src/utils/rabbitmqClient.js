const amqp = require("amqplib");

// Helper to log errors and exit if fatal
function handleExceptions(err, context = "") {
  console.error(`Fatal error${context ? ` (${context})` : ""}:`, err);
}

async function connectRabbit(retries = 10, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      const connection = await amqp.connect(
        process.env.RABBITMQ_URL || "amqp://rabbitmq",
        { clientProperties: { connection_name: "worker-service" } }
      );
      const channel = await connection.createChannel();
      await channel.assertQueue("nasa_requests");
      console.log(`Worker connected to RabbitMQ (attempt ${i + 1}/${retries})`);

      // Handle unexpected connection/channel errors
      connection.on("error", (err) => {
        handleExceptions(err, "RabbitMQ connection");
      });
      channel.on("error", (err) => {
        handleExceptions(err, "RabbitMQ channel");
      });

      return { connection, channel };
    } catch (err) {
      console.error(
        `Worker RabbitMQ connection failed (attempt ${i + 1}/${retries}):`,
        err.message
      );
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error(
    "Worker could not connect to RabbitMQ after multiple attempts"
  );
}

async function startWorker(processJob) {
  let channel;
  try {
    ({ channel } = await connectRabbit());
  } catch (err) {
    handleExceptions(err, "connecting to RabbitMQ");
  }

  channel.consume("nasa_requests", async (msg) => {
    let job, result;
    try {
      job = JSON.parse(msg.content.toString());
    } catch (err) {
      console.error("Failed to parse job message:", err.message);
      channel.ack(msg);
      return;
    }

    console.log("Worker received job:", job);

    try {
      result = await processJob(job);
    } catch (err) {
      console.error("Error processing job:", err.message, job);
      result = { error: err.message || "Unknown error" };
    }

    try {
      channel.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(JSON.stringify(result)),
        { correlationId: msg.properties.correlationId }
      );
      console.log("Worker sent response for job:", job.type);
    } catch (err) {
      console.error("Error sending response:", err.message);
    }

    try {
      channel.ack(msg);
    } catch (err) {
      console.error("Error acknowledging message:", err.message);
    }
  }, { noAck: false });

  // Handle unhandled promise rejections and uncaught exceptions globally
  process.on("unhandledRejection", (err) => {
    handleExceptions(err, "unhandledRejection");
  });

  process.on("uncaughtException", (err) => {
    handleExceptions(err, "uncaughtException");
  });
}

module.exports = { startWorker };