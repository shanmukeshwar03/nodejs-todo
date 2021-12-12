const Error = (error, req, res, next) => {
  if (error.name) resolveId(error)
  switch (error.id) {
    case 1:
      res.status(400).send(error.message)
      break
    case 2:
      res.status(400).send('Todo not found')
      break
    case 5:
      res.status(400).send('Invalid Request!')
      break
    case 6:
      res.status(404).send('No user found!')
      break
    case 10:
      res.status(400).send(`Syntax Error!`)
      break
    case 11:
      res.status(401).send('Unauthorised')
      break
    case 12:
      res.status(401).send({ expired: 'Session Expired' })
      break
    default:
      res.status(500).send('Something went wrong!')
      break
  }
}

const resolveId = (error) => {
  switch (error.name) {
    case 'ValidationError':
      let message = []
      for (let i in error.errors) {
        message.push({ [i]: error.errors[i].properties.message })
      }
      error.message = message
      error.id = 1
      break
    case 'MongoServerError':
      error.id = 1
      if (error.code === 11000) {
        if (error.keyValue.username)
          error.message = { username: 'Username already taken' }
        else if (error.keyValue.email)
          error.message = { email: 'Email already taken' }
      }
      break
    case 'JsonWebTokenError':
      error.id = 11
      break
    case 'TokenExpiredError':
      error.id = 12
      break
    case 'SyntaxError':
      error.id = 10
      break
    default:
      break
  }
  return error
}

export default Error
