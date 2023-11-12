import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://GorgeFullStack:Canelafu1$@merndb.ijcoszf.mongodb.net/')
        console.log(">>> DB is connected")
    } catch (error) {
        console.log(error)
    }

}