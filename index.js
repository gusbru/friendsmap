import express from "express";
import connection from "./db";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use("/api", routes);

// custom error-handler
app.use((err, req, res, next) => {
  console.log("error handler called", err.message, err.code);

  res.status(err.code).send({ Error: err.message });
});

connection.once("open", () => {
  console.log("connected to db");

  const server = app.listen(PORT, () => {
    console.log(`express listening on port ${PORT}`);
  });
});

// close connection to DB
process.on("SIGINT", () => {
  connection.close(() => {
    console.log("Mongoose disconnected through app termination");
    process.exit(0);
  });
});
