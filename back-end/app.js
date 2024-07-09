import express from "express"
import cors from "cors"
import db from "./db/db.js"
import toolkitRoutes from "./routes/toolkit.js"
import creativeWritingRoutes from "./routes/creativewriting.js"
import extras from "./routes/extras.js"

const app = express();
import dotenv from "dotenv"
dotenv.config();

const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json())
app.use(cors());


// routes
app.use("/api/writing-toolkit", toolkitRoutes);
app.use("/api/creative-writing", creativeWritingRoutes);
app.use("/api", extras);


const server = () => {
    db();
    app.listen(PORT, () => {
        console.log("port: ", PORT);
    })
}
server();