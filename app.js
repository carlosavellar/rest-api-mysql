const express = require("express");
const app = express();
const router = express.Router();
const port = "3000";
const routes = require("./route");

router.get("/teams", routes.employees.listAllEmployees);

app.use("/api", router);

app.listen(port, () => console.log(`Server started at port ${port}`));
