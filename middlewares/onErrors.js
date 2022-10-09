export function onError(err, req, res, next) {
  if (err) {
    return res.status(500).json({ message: err.toString() });
  }
  // OR: you may want to continue
  next();
}
