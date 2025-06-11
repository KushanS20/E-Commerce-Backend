const app = require('./index');
require("dotenv").config();
const sequelize = require("./Config/db");

const port = process.env.PORT || 3001;

sequelize.sync({ alter: true, }).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

