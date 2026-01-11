
import express from "express";
import cors from "cors";
import "dotenv/config";
import logger from "pino-http";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger());

app.use(
    cors()
);


app.use(express.json({limit:"10mb"}));

app.get('/test-error', (req, res) => {
  throw new Error('Simulated server error');
});


app.get("/notes",(req, res)=>{
    res.status(200).json({message: "Retrieved all notes"});
});

app.get("/notes/:noteId",(req,res)=>{
    const noteId = req.params.noteId;
    res.status(200).json({message: `Retrieved note with ID: ${noteId}`});
});

app.use((req,res)=>{
    res.status(404).json({message: "Route not found"});
});

app.use((err, req,res, next)=>{
    const isProd = process.env.NODE_ENV === "production";
    res.status(500).json({
        message: isProd ? "Internal Server Error" : err.message,
    });
});

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
