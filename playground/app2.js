const url = require("url");
const http = require("http");

const data = require("./data");

const listAllTrains = (req, res) => {
  res.statusCode === 200;
  res.end(JSON.stringify(data));
};

const defaultResponse = (req, res) => {
  res.statusCode === 404;
  res.end("Choose: '/api/teams'");
};
const createANewEntry = (req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk.toString()));
  req.on("end", () => {
    data.push(JSON.parse(body));
    res.statusCode === 201;
    return res.end(`${JSON.parse(body).name} added`);
  });
  req.on("error", (error) => {
    res.statusCode === 400;
    return res.end(error);
  });
};

const server = http.createServer((req, res) => {
  const urlParse = url.parse(req.url);
  if (urlParse.pathname === "/api/teams") {
    switch (req.method) {
      case "GET":
        listAllTrains(req, res);
        break;
      case "POST":
        createANewEntry(req, res);
        break;
      default:
        defaultResponse(req, res);
        break;
    }
  } else {
    defaultResponse(req, res);
  }
});

server.listen(3000, () => console.log("Server started ate port 3000"));
