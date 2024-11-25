import { MongoClient } from "mongodb";

export default async function dbConnection(stringConnection){
    let mongoClient;

    try{
        mongoClient = new MongoClient(stringConnection);
        console.log("Connecting to MongoDB Cluster");
        await mongoClient.connect();
        console.log("Connected to MongoDB Atlas successfully");

        return mongoClient;
    } catch (error) {
        console.log("oror connecting to MongoDB Atlas: ", error);
        process.exit();
    }
}