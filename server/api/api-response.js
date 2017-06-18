// Change this in production environment
const sendErrors = process.env.SEND_API_ERRORS

function APIResponse ({ status, error, data }) {
  this.isError = Boolean(error)
  this.status = status
  this.error = error

  if (!this.status) {
    throw new Error('APIResponse: no status has been specified')
  }

  this.data = data
}

APIResponse.prototype.toData = function () {
  return {
    error: this.isError ? this.error : null,
    data: this.isError ? null : this.data
  }
}

APIResponse.CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  GONE: 410,
  SERVER_ERROR: 500
}

/* TODO: figure out how it actually works */
const getClientErrText = (err) => {
  if (err instanceof Error) {
    return sendErrors ? err.message : 'Server logic error'
  }

  return err
}

APIResponse.getDefaultCatch = (errorText) => {
  return (err) => {
    if (err instanceof APIResponse) {
      return err
    }

    return new APIResponse({
      status: APIResponse.CODES.SERVER_ERROR,
      error: {
        text: getClientErrText(err),
        message: errorText
      }
    })
  }
}

module.exports = APIResponse
