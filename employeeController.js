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
        return res.status(404).json(`No users found. ${id} is not found`)
      }
    })
    .catch((err) => {
      return res.status(500).json(err)
    })
}

const createEmployee = (req, res) => {
  const { knex } = req.app.locals
  const payload = req.body
  console.log(req.body)
  const mandatoryColumns = ["name", "salary", "email"]
  const payloadKeys = Object.keys(payload)
  const mandatoryColumnsExist = mandatoryColumns.every((mc) =>
    payloadKeys.includes(mc)
  )

  if (mandatoryColumnsExist) {
    knex("employees")
      .insert(payload)
      .then((data) => {
        return res.status(201).json("Employee created")
      })
      .catch((err) => {
        return res.status(500).json(err)
      })
  } else {
    return res.status(400).json("Mandatoty columns are mandatory")
  }
}

const updateEmployee = (req, res) => {
  const { knex } = req.app.locals
  const payload = req.body
  const id = +req.params.id
  knex("employees")
    .where(id, id)
    .update(payload)
    .then((response) => {
      if (response) {
        return res.status(204).json("Updated")
      } else {
        return res.status(404).json(`User id: ${req.params.id} not found`)
      }
    })
    .catch((err) => {
      return res.status(400).json(err)
    })
}

const deleteEmployee = (req, res) => {
  const { knex } = req.app.locals
  const { id } = req.params
  knex("employees")
    .where("id", id)
    .del(id)
    .then((response) => {
      if (response) {
        return res.status(200).json(`id: ${id} Deleted`)
      } else {
        return res.status(404).json(`User id: ${req.params.id} not found`)
      }
    })
    .catch((err) => {
      return res.status(500).json(`Error server to Deleted`)
    })
}

module.exports = {
  listAllEmployees,
  listEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
}
