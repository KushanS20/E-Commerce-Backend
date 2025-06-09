const app = require('./index');
require("dotenv").config();
const db = require("./Config/db");

const PORT = process.env.PORT || 5000;

const startserver =  async () => {
  try {
    const [rows] = await db.query("SELECT 'Connected to AWS RDS' AS message");
    console.log(rows[0].message);
  } catch (err) {
    console.log("DB Connection Failed", err.message );
  }
};

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

startserver();
