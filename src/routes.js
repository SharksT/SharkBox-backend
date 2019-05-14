const express = require("express");
const multer = require("multer");
const multerConfig = require("./config/multer");
const authMiddleware = require("./middleware/auth");
const routes = express.Router();

const BoxController = require("./controllers/BoxController");
const FileController = require("./controllers/FileController");
const authController = require("./controllers/authController");

routes.post("/register", authController.create);
routes.post("/", authController.logIn);

routes.use(authMiddleware);
routes.post("/:id/boxes", BoxController.store);
routes.get("/:id/boxes/:id", BoxController.show);
routes.get("/:id/boxes/", BoxController.showBoxes);
routes.post("/:id/deletefile", FileController.delete);
routes.post("/:id/deletebox", BoxController.delete);
routes.post(
  "/boxes/:id/files",
  multer(multerConfig).single("file"),
  FileController.store
);

module.exports = routes;
