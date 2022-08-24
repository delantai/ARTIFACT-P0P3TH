export class InvalidInputError extends Error {
  status = 400;

  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidInputError.prototype);
  }
}
