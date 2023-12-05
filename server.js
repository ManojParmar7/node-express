require("dotenv").config(); // env file
const express = require("express");
const app = express();
const DbConnect = require("./Database");
const bodyParser = require("body-parser")
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors({credentials: true}));
const PORT = process.env.PORT || 8000;
DbConnect();
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));
// store the Images path
app.use(express.static("uploads"));
app.use(express.json({ limit: "8mb" }));
///---All Routes ---///
 app.use("/user", require("./routes/userRoutes")); //all user routes
app.get("*", (req, res) => {
  res.status(404).json({ message: "404" }); // 404 routes
});
app.listen(PORT, () => console.log(`Listening on port ${PORT} `));