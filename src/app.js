const express = require("express");
const authRoute = require("./routes/authtRoute");
const taskRoute = require("./routes/taskRoute");
const logger = require("./logger/logger");
const httpLogger = require("./logger/httpLogger");
const verifyToken = require("./middleware/verifyToken");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const limiter = rateLimit({
  windowMs: 0.5 * 60 * 1000,
  max: 4,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(httpLogger);
app.use(limiter);

app.use("/user", authRoute);
app.use("/task", verifyToken.verifyToken, taskRoute);

app.get("/", (req, res) => {
  res.status(200).send("WELCOME TO MY API");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    data: null,
    error: logger.error(err.message),
    errorStack: logger.error(err.stack),
  });
});

app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});
