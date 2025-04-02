import { natsWrapper } from "../nats-wrapper";
import { TicketCreatedListener } from "../events/listeners/ticket-created-listener";
import { TicketUpdatedListener } from "../events/listeners/ticket-updated-listener";
import { PaymentCreatedListener } from "../events/listeners/payment-created-listener";

const connectListeners = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS CLIENT ID must be defined");
  }

  if (!process.env.NATS_URI) {
    throw new Error("NATS_URI must be defined");
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER ID must be defined");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URI
    );

    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();
    new PaymentCreatedListener(natsWrapper.client).listen();
  } catch (err) {
    console.log(err);
  }
};

export { connectListeners };
