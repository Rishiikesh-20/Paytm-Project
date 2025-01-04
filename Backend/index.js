import express, { application } from "express";
import cors from "cors"
import bodyParser from "body-parser";
import {mainRouter} from "./routes/index.js"
const app=express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use('/api/v1',mainRouter);
app.use(bodyParser.urlencoded({extended:true}));

app.listen(port,()=>{
  console.log(`Server is running at port ${port}`);
})


