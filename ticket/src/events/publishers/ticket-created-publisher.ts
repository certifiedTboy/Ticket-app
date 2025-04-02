import { Publisher, Subjects, TicketCreatedEvent } from "@infiniteideas/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
