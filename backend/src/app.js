import express from "express";
import morgan from "morgan";
import cors from "cors";
import seoRouter from "../routes/seo.routes.js";
import messageRouter from "../routes/message.routes.js";
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


app.get("/",(req,res)=>{
    res.json({
        message:"server is runniong on port 3000"
    })
});
app.use("/api/seo",seoRouter);
app.use("/api/message",messageRouter);

export default app;