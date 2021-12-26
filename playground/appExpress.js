const express = require("express");
const app = express();

const port = "3000";

const data = require("./data");

const router = express.Router();

// app.get("/api/teams", (req, res) => res.send(`${req.path}`));

// app.post("/api/teams", (req, res) => res.send("Post in action"));
// app
//   .route("/api/teams")
//   .get((req, res) => res.send("GET"))
//   .post((req, res) => res.send("POST"));

router.get("/", (req, res) => {
  console.log(req.query);
  console.log(req.query.page);
  res.send(data);
});

router.get("/:id", (req, res) => {
  const id = +req.params.id;
  const uniqueUser = data.filter((user) => user.id === id);
  return res.send(uniqueUser);
});

router.post("/", (req, res) => {
  return res.send(data);
});

app.use("/api/teams", router);

app.use(express.static("images"));
//or
app.use("/static", express.static("images"));

app.listen(port, () => console.log(`Server started at port ${port}`));
