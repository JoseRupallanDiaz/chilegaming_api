import mongoose from 'mongoose'
import {DATABASE_URI} from './enviorment.js'

export default async function connectDB(){
    return mongoose
        .connect(DATABASE_URI)
        .then(success => {
            console.log("MongoDB connected successfully.")
            return true
        })
        .catch(error => {
            console.log("Failed to connect to MongoDB. Error:"+error)
            return false
        })
}