const express = require("express")
const app = express()
const router = express.Router()
const mysql = require("mysql")
const routes = require("./route")
const settings = require("./settings")
const middlewares = require("./middlewares")
const bodyParser = require("body-parser")

// const connection = mysql.createConnection(settings.dataBase)

router.get("/teams", routes.employees.listAllEmployees)
router.get(
  "/teams/:id",
  middlewares.getIDAsInteger,
  routes.employees.listEmployee
)

const jsonParser = bodyParser.json()

router.post("/teams", jsonParser, routes.employees.createEmployee)

router.patch(
  "/teams/:id",
  jsonParser,
  middlewares.getIDAsInteger,
  routes.employees.updateEmployee
)

router.delete(
  "/teams/:id",
  middlewares.getIDAsInteger,
  routes.employees.deleteEmployee
)

router.get("/departments", routes.departments.getAllDepartments)

router.get(
  "/departments/:id",
  middlewares.getIDAsInteger,
  routes.departments.getDepartment
)

router.post("/departments", jsonParser, routes.departments.createDepartment)

router.delete(
  "/departments/:id",
  jsonParser,
  middlewares.getIDAsInteger,
  routes.departments.deleteDepartment
)

app.use("/api", router)

const knex = require("knex")({
  client: "mysql",
  connection: settings.dataBase,
})

app.locals.knex = knex

app.listen(settings.APIServerPort, () =>
  console.log(`Server started at port ${settings.APIServerPort}`)
)
