import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
dotenv.config();

const PORT = process.env.PORT;


const app = express();
app.use(cors());
app.use(bodyParser.json({extended:false,limit:"5000mb"}));
app.use(bodyParser.urlencoded({extended:false,limit:"5000mb",parameterLimit:50000}));

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})

