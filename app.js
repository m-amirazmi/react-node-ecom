const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// import routes
const userRoutes = require("./routes/user");

// app
dotenv.config();
const app = express();

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));
mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

// routes middleware
app.use("/api", userRoutes);

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Node server connected on port ${port}`);
});
