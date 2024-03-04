require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./src/routes/api");
const { corsEnableMiddleware } = require("./src/middleware/auth.middleware");
const corsOptions = require("./src/config/cors-options");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(corsEnableMiddleware);
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", router);

app.listen(PORT, async () => {});
