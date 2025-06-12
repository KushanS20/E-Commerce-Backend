const app = require('./index');
require("dotenv").config();
const sequelize = require("./Config/db");

const port = process.env.PORT || 3001;

sequelize.sync({ alter: true }).then(() => {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
  });
});

