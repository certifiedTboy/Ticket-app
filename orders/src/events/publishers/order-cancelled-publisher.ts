import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from "@infiniteideas/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
