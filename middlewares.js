const getIDAsInteger = (req, res, next) => {
  const id = +req.params.id
  if (Number.isInteger(id)) {
    next()
  } else {
    return res.status(400).json(`${req.params.id} is not an integer`)
  }
}

module.exports = {
  getIDAsInteger,
}
