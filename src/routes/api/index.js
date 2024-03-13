const router = require("express").Router();
const AuthRouter = require("./auth.routes");
const studentRouter = require("./student.route");

router.get("/student", studentRouter);
router.get("/auth", AuthRouter);

module.exports = router;
