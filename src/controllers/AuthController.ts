import type { Request, Response } from "express"
import { checkPassword, hashPassword } from "../utils/auth"
import { generateToken } from "../utils/token"
import User from "../models/User"
import { AuthEmail } from "../emails/AuthEmail"
import { generateJWT } from "../utils/jwt"
import { log } from "node:console"

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        const {email, password} = req.body

        try {
            const userExist = await User.findOne({email})
            if(userExist) {
                const error = new Error('The user is already register')
                res.status(409).json({error: error.message})
                return
            }

            const user = new User(req.body)
            user.password = await hashPassword(password)
            user.token = generateToken()

            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: user.token
            })
            
            await user.save()
            res.send('Account created, check your email to confirm')
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }

    static login = async (req: Request, res: Response) => {
        const {email, password} = req.body

        try {
            const user = await User.findOne({email})
            if(!user) {
                const error = new Error('Email not found')
                res.status(404).json({error: error.message})
                return
            }

            if(!user.confirmed) {
                AuthEmail.sendConfirmationEmail({
                    email: user.email,
                    name: user.name,
                    token: user.token
                })

                const error = new Error('The account has not been confirmed, we have sent a confirmation email')
                res.status(401).json({error: error.message})
                return
            }

            const isPasswordCorrect = await checkPassword(password, user.password)

            if(!isPasswordCorrect) {
                const error = new Error('Incorrect Password')
                res.status(401).json({error: error.message})
                return
            }

            const token = generateJWT({id: user.id})
            res.send(token)
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }

    static confirmAccount = async (req: Request, res: Response) => {
        const {token} = req.body
        try {
            const tokenExist = await User.findOne({token})

            if(!tokenExist) {
                const error = new Error('Invalid Token')
                res.status(404).json({error: error.message})
                return
            }

            tokenExist.confirmed = true
            tokenExist.token = null

            await tokenExist.save()
            res.send('Account confirmed correctly')
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }

    static forgotPassword = async (req: Request, res: Response) => {
        const {email} = req.body
        try {
            const user = await User.findOne({email})
            if(!user) {
                const error = new Error('Email not found')
                res.status(404).json({error: error.message})
                return
            }

            user.token = generateToken()
            await user.save()

            AuthEmail.sendPasswordResetEmail({
                email: user.email,
                name: user.name,
                token: user.token
            })

            res.send('Check your email for instructions')
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }

    static validateToken = async (req: Request, res: Response) => {
        const {token} = req.body
        try {
            const user = await User.findOne({token})
            if(!user) {
                const error = new Error('Invalid Token')
                res.status(404).json({error: error.message})
                return
            }
            res.send('Token Validated')
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }

    static resetPassword = async (req: Request, res: Response) => {
        const {token, password} = req.body
        try {
            const user = await User.findOne({token})
            if(!user) {
                const error = new Error('Invalid Token')
                res.status(404).json({error: error.message})
                return
            }
            
            user.password = await hashPassword(password)
            user.token = null

            await user.save()
            res.send('Password updated')
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }

    static getUser = async (req: Request, res: Response) => {
        try {
            res.json(req.user)
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }

    static updateProfile = async (req: Request, res: Response) => {
        const {name, email} = req.body
        try {
            req.user.name = name
            req.user.email = email
            
            req.user.save()
            res.send('Profile Updated')
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }

    static updatePassword = async (req: Request, res: Response) => {
        const {current_password, password} = req.body

        try {

            const isPasswordCorrect = await checkPassword(current_password, req.user.password)

            if(!isPasswordCorrect) {
                const error = new Error('Incorrect Current Password')
                res.status(401).json({error: error.message})
                return
            }
    
            req.user.password = await hashPassword(password)
            await req.user.save()
            res.send('Password Updated')
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }
}