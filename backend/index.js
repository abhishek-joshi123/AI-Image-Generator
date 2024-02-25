import connectToMongo from "./Config/db.js";
import express from "express";
import cors from "cors";
import postRoutes from "./Routes/Post.js";
import AuthRoute from "./Routes/Auth.js";
import dalleRoutes from "./Routes/Dalle.js";
import dotenv from "dotenv";

dotenv.config();

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;


const corsOptions = {
    origin: [process.env.CORS_ORIGIN]
};

app.use(cors(corsOptions));

app.use(express.json({limit: '50mb'}));

app.use("/auth", AuthRoute);
app.use("/post", postRoutes);
app.use("/dalle", dalleRoutes);

app.listen(port, () => {
    console.log(`Ai-gen backend is running at localhost:${port}`);
});
