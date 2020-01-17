// const express = require("express");

// const server = express();
// const actionRouter = require("./data/helpers/actionRouter.js");
// const projectRouter = require("./data/helpers/projectRouter.js");

// server.get("/", (req, res) => {
//   res.send(`<h2>This is the start of the sprint challenge!!</h2>`);
// });

// server.use(express.json());
// server.use(logger);
// server.use("/api/actions", actionRouter);
// server.use("/api/projects", projectRouter);

// function logger(req, res, next) {
//   const { method, originalUrl } = req;
//   console.log(`This is the Logger!! ${method} to ${originalUrl}`);

//   next();
// }

// module.exports = server;

const express = require("express");

const actionRouter = require("./data/helpers/actionRouter.js");
const projectRouter = require("./data/helpers/projectRouter.js");

const server = express();

server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
    <h2>Its Working Finally!!!!!!!</h>
  `);
});

module.exports = server;
