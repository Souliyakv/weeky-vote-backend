import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./router/route.js";
dotenv.config();

const PORT = process.env.PORT;


const app = express();
app.use(cors());
app.use(bodyParser.json({extended:false,limit:"5000mb"}));
app.use(bodyParser.urlencoded({extended:false,limit:"5000mb",parameterLimit:50000}));
const api = '/api';
app.use(api,router)

app.listen(PORT,()=>{
    console.log(`server start on port ${PORT}`);
})

