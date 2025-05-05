import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { AuthController } from "../controllers/AuthController";

const router = Router()

//AUTH
router.post('/sing-up',
    body('name')
        .notEmpty().withMessage('Your name cannot be empty'),
    body('email')
        .isEmail().withMessage('Invalid E-mail')
        .notEmpty().withMessage('Your email cannot be empty'),
    body('password')
        .isLength({min: 8}).withMessage('The password is very short, minimun 8 characters'),
    body('password_confirmation')
        .custom((value, {req}) => {
            if(value !== req.body.password) {
                throw new Error('Password do not match')
            }
            return true
        }),
        handleInputErrors,
        AuthController.createAccount
)

router.post('/log-in',
    body('email')
        .isEmail().withMessage('Invalid E-mail')
        .notEmpty().withMessage('Your email cannot be empty'),
    body('password')
        .notEmpty().withMessage('Your password cannot be empty'),    handleInputErrors,
    AuthController.login
)

router.post('/confirm-account',
    body('token')
        .notEmpty().withMessage('The token cannot be empty'), 
    handleInputErrors,
    AuthController.confirmAccount
)

router.post('/forgot-password',
    body('email')
        .isEmail().withMessage('Invalid E-mail'),
    handleInputErrors,
    AuthController.forgotPassword
)

router.post('/validate-token',
    body('token')
        .notEmpty().withMessage('The token cannot be empty'),
    handleInputErrors,
    AuthController.validateToken
)

router.post('/reset-password',
    body('token')
        .isNumeric().withMessage('Invalid Token'),
    body('password')   
        .isLength({min: 8}).withMessage('The password is very short, minimum 8 characters'),
    body('password_confirmation')
        .custom((value, {req}) => {
            if(value !== req.body.password) {
                throw new Error('Passwords do not match')
            }
            return true
        }),
    handleInputErrors,
    AuthController.resetPassword
)


export default router