import mongoose from "mongoose"

// Esquema de usuarios para la base de datos
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
        trim: true
    },
    email: {
        type: String,
        required:true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required:true
    }
}, {
    timestamps: true
})

// se export el modelo del esquema
export default mongoose.model('User', userSchema)