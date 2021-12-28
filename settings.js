const APIServerPort = 3000
const dataBase = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "companydb",
}
module.exports = {
  dataBase,
  APIServerPort,
}
