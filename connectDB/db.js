import mongoose from "mongoose";

const connectDB =  async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Connected to MONGODB${conn.connection.host}`);
    } catch (error) {
        console.log(`error in MONGODB ${error}`);
    }
}

export default connectDB;