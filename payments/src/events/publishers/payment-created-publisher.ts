import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from "@infiniteideas/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
