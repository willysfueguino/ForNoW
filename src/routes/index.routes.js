const indexRouter = require("express").Router();
const { ctlrIndex } = require("../controllers/index.controller");

indexRouter.get("/", ctlrIndex.renderIndex);

module.exports = indexRouter;
