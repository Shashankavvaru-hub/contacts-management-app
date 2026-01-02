import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./config/dbConfig.js";


const port = process.env.PORT || 3000;

connectDB()
    .then(()=>{
        app.listen(port,()=>{
            console.log(`Example app listening on port http://localhost:${port}`);
        });
    })
    .catch((err)=>{
        console.error("MongoDB connetion",err)
    })