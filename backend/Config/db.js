import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_URL;
console.log(url);

const ConnectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const connectToMongo = () => {
    mongoose.connect(url, ConnectionParams)
        .then(() => {
            console.log("Connected Successfully");
        })
        .catch((e) => {
            console.log("error : ", e);
        });
};

export default connectToMongo;
