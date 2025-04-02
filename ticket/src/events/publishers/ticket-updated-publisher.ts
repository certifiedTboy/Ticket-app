import { Publisher, Subjects, TicketUpdatedEvent } from "@infiniteideas/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
