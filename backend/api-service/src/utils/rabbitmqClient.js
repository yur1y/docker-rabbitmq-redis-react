const amqp = require("amqplib");
const { v4: uuidv4 } = require("uuid");

let channel;
let connection;

async function connectRabbit(retries = 10, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      connection = await amqp.connect(
        process.env.RABBITMQ_URL || "amqp://rabbitmq",
        { clientProperties: { connection_name: "api-service" } }
      );
      channel = await connection.createChannel();
      await channel.assertQueue("nasa_requests");
      console.log(`RabbitMQ connected after (attempt ${i + 1}/${retries}):`);
      return;
    } catch (err) {
      console.error(
        `RabbitMQ connection failed (attempt ${i + 1}/${retries}):`,
        err.message
      );
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error("Could not connect to RabbitMQ after multiple attempts");
}
connectRabbit();

async function sendRpcRequest(job) {
  const correlationId = uuidv4();
  const replyQueue = await channel.assertQueue("", { exclusive: true });

  return new Promise((resolve, reject) => {
    channel.consume(
      replyQueue.queue,
      (msg) => {
        if (msg.properties.correlationId === correlationId) {
          resolve(JSON.parse(msg.content.toString()));
        }
      },
      { noAck: true }
    );

    channel.sendToQueue("nasa_requests", Buffer.from(JSON.stringify(job)), {
      correlationId,
      replyTo: replyQueue.queue,
    });
    // Timeout for response
    setTimeout(() => reject(new Error("Timeout")), 30000);
  });
}

module.exports = { sendRpcRequest };
