const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db")

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors({
  origin: [

  "http://localhost:5173",

  "https://documind-tan.vercel.app"

    ],
  credentials: true
}));

app.get("/", (req, res) => {
    res.send("API Running");
});

app.use(
    "/api/auth", 
    require("./routes/authRoutes"));

app.use(
    "/api/documents",
    require("./routes/documentRoutes")
);

app.use(
  "/api/chat",
  require("./routes/chatRoutes")
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`); 
});