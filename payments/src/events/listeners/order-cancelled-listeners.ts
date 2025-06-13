import { Message } from "node-nats-streaming";
import {
  OrderCancelledEvent,
  Subjects,
  Listener,
  OrderStatus,
} from "@infiniteideas/common";
import { Order } from "../../models/order";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = "payments-service";

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const order = await Order.findOne({
      id: data.id,
      version: data.version - 1,
    }).populate("ticket");

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({ status: OrderStatus.Cancelled });
    await order.save();

    msg.ack();
  }
}
