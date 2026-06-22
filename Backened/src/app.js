const express = require("express");

const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize")
const cors = require("cors")
const helmet = require("helmet")


const authRouter = require("./routes/auth.routes");
const reportRouter  = require("./routes/report.routes");
const sanitize = require("./middleware/sanitize.middleware");

const app = express();
//    just install helmet thats it ayesha npm install it does everything automatically
app.use(helmet())
app.use(cors({
  origin:  ['http://localhost:5173', 'https://ai-resume-builder-nu-silk.vercel.app'],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(sanitize)



app.use("/api/auth",  authRouter )
app.use("/api/report", reportRouter)


module.exports = app