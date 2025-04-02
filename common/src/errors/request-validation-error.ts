import { ValidationError } from "express-validator";
import { CustomError } from "./customer-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err: { msg: string; path?: string }) => {
      return { message: err.msg, field: err.path };
    });
  }
}
