import mongoose from "mongoose";
import config from "../Utils/config";

const connect = async () : Promise<void> => {
    try{
        const db = await mongoose.connect(config.connectionString);
        console.log("connected to mongoDB");
    } catch (err:any){
        console.log("Error in connection to mongoDB:\n",err);
    }
}

export default{
    connect
}