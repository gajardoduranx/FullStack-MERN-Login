import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'


export const register = async (req, res) => {
    const {email, password, username} = req.body
    try {
        // Hash id
        const passwordHash = await bcrypt.hash(password, 10) //String aleatorio
        // nuevo usuario
        const newUser = new User({
            username,
            email, 
            password: passwordHash 
        })
        const userSaved = await newUser.save()
        const token = await createAccessToken({ id: userSaved._id })
        res.cookie("token", token)
        // Respuesta
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
export const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const userFund = await User.findOne({email})
        if(!userFund) return res.status(400).json({message: "User not found"})

        const isMatch = await bcrypt.compare(password, userFund.password) 
        if(!isMatch) return res.status(400).json({message: "Incorrect password"})


        const token = await createAccessToken({ id: userFund._id })
        
        res.cookie("token", token)
        // Respuesta
        res.json({
            id: userFund._id,
            username: userFund.username,
            email: userFund.email,
            createdAt: userFund.createdAt,
            updatedAt: userFund.updatedAt
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
export const logout = (req, res) => {
    res.cookie('token', "", {
    expires: new Date(0)
    })
    return res.sendStatus(200)
}
export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    if(!userFound) return res.status(400).json({message: "User not found"})

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
}