const express = require("express")
const app = express()
const router = express.Router()
const mysql = require("mysql")
const routes = require("./route")
const settings = require("./settings")

// const connection = mysql.createConnection(settings.dataBase)

router.get("/teams", routes.employees.listAllEmployees)

app.use("/api", router)

const knex = require("knex")({
  client: "mysql",
  connection: settings.dataBase,
})

app.locals.knex = knex

app.listen(settings.APIServerPort, () =>
  console.log(`Server started at port ${settings.APIServerPort}`)
)
