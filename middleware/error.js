const errorHandler = (error, request, response, next) => {
  const statusCode = response.statusCode === 200 ? 500 : response.statusCode
  response.status(statusCode)
  response.json({ message: error.message })
}

const notFound = (request, response, next) => {
  const error = new Error(`Not Found : ${request.originalUrl}`)
  response.status(401)
  next(error)
}

export { notFound, errorHandler }
