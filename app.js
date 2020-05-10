const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

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

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

// routes middleware
app.use("/api", userRoutes);

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Node server connected on port ${port}`);
});
