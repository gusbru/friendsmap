import { connect, connection } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongoDB = process.env.DB_CONNECTION;

connect(
  mongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

export default connection;
