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
  NOT_FOUND: 404,
  GONE: 410,
  SERVER_ERROR: 500
}

module.exports = APIResponse
