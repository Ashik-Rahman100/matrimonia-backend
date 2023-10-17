let mongoose = require("mongoose");
require("dotenv/config");
let app = require("./app.js");
const { database } = require("./env.js");

// database connection
mongoose.connect(database).then(() => {
  console.log(`Database connection is successful 🛢`);
});

// server
const port = 5000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  close(() => {
    process.exit(1);
  });
});
