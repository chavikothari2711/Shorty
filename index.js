import dotenv from "dotenv";
dotenv.config();
import express from "express";
import urlRoutes from "./routes/url.js"
import connectDB from "./connectDB/db.js";
import cors from "cors";
import morgan from "morgan";
import path from "path";

connectDB();
const app = express();
const PORT=process.env.PORT || 8001;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./client/build')))

//routes
app.use(urlRoutes)
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})
app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})