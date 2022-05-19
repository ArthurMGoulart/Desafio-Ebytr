import StatusCode from "../enums";

class CustomError extends Error {
  constructor(public status: StatusCode, message: string) {
    super(message);
  }
}

export default CustomError;
