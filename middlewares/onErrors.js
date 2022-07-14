export function onError(err, req, res, next) {
  return res.status(500).json({ message: err.toString() })
  // OR: you may want to continue
  next()
}
