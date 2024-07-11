const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

const port = process.env.PORT || 3001;

const routerApi = require("./routes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend with Node + Express + PostgreSQL");
});

routerApi(app);

app.listen(port, () => {
  console.log(`Backend is running on port ${port} \nhttp://localhost:${port}`);
});
