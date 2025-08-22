const mongoose = require("mongoose");

const mongo_url = process.env.MONGO_CONN;

if (!mongo_url) {
  console.error("❌ MONGO_CONN is not defined in .env file");
  process.exit(1); // stop server if URL is missing
}

mongoose
  .connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected...");
  })
  .catch((err) => {
    console.error("❌ Mongo Connection Error:", err.message);
    process.exit(1); // exit process on DB connection error
  });
