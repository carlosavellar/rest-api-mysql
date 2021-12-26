const url = require("url");
const http = require("http");

const data = require("./data.jsonb");

const listAllTrains = (req, res) => {
  res.statusCode === 200;
  res.end(JSON.stringify(data));
};

const server = http.createServer((req, res) => {
  const urlParts = url.parse(req.url);
  if (urlParts.pathname === "/api/trains") {
    switch (req.method) {
      case "GET":
        listAllTrains(req, res);
        break;
      default:
        return "Nothing";
    }
  }
});

server.listen(3000, () => console.log("Server started at port 3000"));
