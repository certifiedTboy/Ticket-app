import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@infiniteideas/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
