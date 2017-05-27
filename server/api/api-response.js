// Change this in production environment
const sendErrors = true

function APIResponse ({ status, error, data }) {
  this.isError = Boolean(error)
  this.status = status

  if (!this.status) {
    throw new Error('APIResponse: no status has been specified')
  }

  this.data = data
  if (error) {
    this.errors = [error]
  }
}

APIResponse.prototype.toData = function () {
  return {
    errors: this.isError ? this.errors : null,
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

const getClientErrData = (err) => {
  let clientData

  if (err instanceof Error) {
    if (sendErrors) {
      clientData = {
        name: err.name,
        message: err.message
      }
    } else {
      clientData = {
        type: 'Server logic error'
      }
    }

    return clientData
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
        data: getClientErrData(err),
        message: errorText
      }
    })
  }
}

module.exports = APIResponse
