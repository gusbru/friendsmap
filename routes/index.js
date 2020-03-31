import express from "express";
import friend from "./friend";
import group from "./group";
import place from "./place";

const routes = express.Router();

// TODO: add validation / sanitizer
routes.use("/friend", friend);
routes.use("/group", group);
routes.use("/place", place);

routes.all("/*", (req, res, next) => {
  const error = new Error("Invalid request. Endpoint not found");
  error.code = 405;
  next(error);
});

export default routes;
