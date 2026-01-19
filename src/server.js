
import express from "express";
import cors from "cors";
import "dotenv/config";

import {connectMongoDB}  from "./db/connectMondoDB.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import notesRouter from "./routes/notesRoutes.js";
import { logger } from "./middleware/logger.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger);

app.use(
    cors()
);


app.use(express.json({limit:"10mb"}));

app.use(notesRouter);




app.use(notFoundHandler);

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
