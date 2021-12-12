import Jsonwebtoken from 'jsonwebtoken'

const Authorise = (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) throw { id: 5 }

    const decode = Jsonwebtoken.verify(token, process.env.JWT_SECRET)
    if (!decode) throw { id: 5 }

    req._id = decode._id
    next()
  } catch (error) {
    next(error)
  }
}

export default Authorise
