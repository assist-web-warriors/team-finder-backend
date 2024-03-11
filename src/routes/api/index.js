const router = require("express").Router();
const studentRouter = require("./student.route");

router.get("/auth", studentRouter);

module.exports = router;