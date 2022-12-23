import jwt from 'jsonwebtoken'

export const jwtMiddleware = async (req, res, next) => {
  if (
    !req.headers.authorization &&
    req.headers.authorization?.split(' ')[0] !== 'Bearer'
  ) {
    return res.status(401).json({ message: 'No token provided' })
  }
  
  const token = req.headers.authorization.split(' ')[1]
  
  if (!token) {
      return res.status(401).json({ message: 'No token provided' })
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user ={ id: decoded.data.user.id, token}
  } catch (err) {
      return res.status(401).json({ message: 'Invalid token' })
  }
  next()
}
