import express from "express";
import { Connection } from "./databases/db.js";
import dotenv from "dotenv";
import DefaultData from "./default.js";
import router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path"; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);





const app= express()

dotenv.config();
app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);


app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  


const PORT=process.env.PORT || 5000;

Connection(process.env.DB_USERNAME, process.env.DB_PASSWORD);


app.listen(PORT, ()=>{
    console.log(`Server is running successfully on port ${PORT}`);

})

DefaultData();







