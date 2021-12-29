const { Knex, default: knex } = require("knex")
const data = require("./data")

function listAllEmployees(req, res) {
  const { knex } = req.app.locals
  knex
    .select(
      "name",
      "address",
      "email",
      "hired",
      "dob",
      "salary",
      "bonus",
      "photo",
      " department"
    )
    .from("employees")
    .then((data) => {
      return res.status(200).json(data)
    })
    .catch((error) => {
      return res.status(500).json(error)
    })
}

const listEmployee = (req, res) => {
  const { knex } = req.app.locals
  const { id } = req.params
  knex
    .select(
      "name",
      "address",
      "email",
      "hired",
      "dob",
      "salary",
      "bonus",
      "photo",
      " department"
    )
    .from("employees")
    .where({ id: `${id}` })
    .then((data) => {
      if (data.length > 0) {
        return res.status(200).json(data)
      } else {
        return res.status(404).json(`No users found ${id} not found`)
      }
    })
    .catch((err) => {
      return res.status(500).json(err)
    })
}

module.exports = {
  listAllEmployees,
  listEmployee,
}
