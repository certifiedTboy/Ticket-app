import { Publisher, OrderCreatedEvent, Subjects } from "@infiniteideas/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
