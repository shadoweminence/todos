const connectToMongo = require("./db");
const express = require("express");
const http = require("http");

const cors = require("cors");

connectToMongo();

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: "http://localhost:3000", // Allow only the frontend domain
  methods: "GET,POST,PUT,DELETE", // Specify allowed methods
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/task", require("./routes/task"));

const port = 5000;

server.listen(port, () => {
  console.log(`TODOs listening at http://localhost:${port}`);
});
