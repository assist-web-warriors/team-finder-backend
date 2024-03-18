require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./src/routes/api');
const { sequelize } = require('./db');
const { corsEnableMiddleware } = require('./src/middleware/auth.middleware');
const corsOptions = require('./src/config/cors-options');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/utils/swagger');
const swaggerDoc = require('./swagger.json');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(corsEnableMiddleware);
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(PORT, async () => {
  // const result = await sequelize.sync().then(() => console.log(`Synced database.`));
  console.log(`Port ${PORT}. DB connected.`);
});
