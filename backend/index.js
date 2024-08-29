const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const cors = require("cors")
const userRouter = require("./routes/User")
const convertRouter = require("./routes/Convert")
dotenv.config()

const PORT = process.env.PORT || 5001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use("/", userRouter)
app.use("/calculate", convertRouter)

const MONGO_URL = process.env.MONGO_URL;

const startServer = async () => {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
    }).then(() => {
        console.log("DATABASE CONNECTED!!")
        app.get("/", (req, res) => {
            res.send("Hello from Server")
        })

        app.listen(PORT, () => {
            console.log(`SERVER RUNNING AT PORT ${PORT}`)
        })
    }).catch((err) => {
        console.log("Database Error", { error: err.message })
    })
}

startServer();

