const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const { param } = require("./routes/link.routes");
const app = express();

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));

app.use("/api/link", require("./routes/link.routes"));

app.use("/t", require("./routes/redirect.routes"));

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`App is running on PORT:${PORT}...`));
  } catch (e) {
    console.error("Error", e.message);
    // process.exit((code: 1));
  }
}

start();
