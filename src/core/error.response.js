const StatusCode = {
  FORBIDDEN: 403,
  CONFLICT: 409
}

const ReasonStatusCode = {
  FORBBIDEN: 'Bad request error',
  CONFLICT: 'Conflict error'
}

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(message = ReasonStatusCode.CONFLICT, status = StatusCode.FORBIDDEN) {
    super(message, status)
  }
}

class BadRequestError extends ErrorResponse {
  constructor(message = ReasonStatusCode.CONFLICT, status = StatusCode.FORBIDDEN) {
    super(message, status)
  }
}

export {
  ConflictRequestError,
  BadRequestError
}
