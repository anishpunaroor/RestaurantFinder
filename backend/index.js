import app from "./server.js"
import mongodb, { MongoClient } from "mongodb"
import dotenv from "dotenv"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 6000

MongoClient.connect(
    process.env.
)