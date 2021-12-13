import Jsonwebtoken from 'jsonwebtoken'

const Authorise = (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) throw { id: 11 }

    const decode = Jsonwebtoken.verify(token, process.env.JWT_SECRET)
    if (!decode) throw { id: 11 }

    req._id = decode._id
    next()
  } catch (error) {
    next(error)
  }
}

export default Authorise
