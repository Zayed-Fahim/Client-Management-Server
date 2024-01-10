const app = require("./app");
const connect = require("./utils/dbConnect");
require("dotenv").config();

const port = process.env.PORT || 5000;

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error(error.message);
  });
