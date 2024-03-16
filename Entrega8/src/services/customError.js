export default class CustomError extends Error {
    constructor({ name = 'Error', message = '', cause = null, code = 0 }) {
      super(message);
      this.name = name;
      this.cause = cause;
      this.code = code;
    }
  }