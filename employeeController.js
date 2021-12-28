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
module.exports = {
  listAllEmployees,
}
