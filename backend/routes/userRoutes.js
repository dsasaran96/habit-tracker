import express from 'express'
import { body, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'

const router = express.Router()

const saltRounds = 10


const userInfoValidation = (action) => {
    switch (action) {
        case "register":
            return [body('firstName', 'First Name field missing')
                    .exists()
                    .isLength({ min: 1 }),
                body('lastName', 'Last Name field is missing')
                    .exists()
                    .isLength({min: 1 }),
                body('email', 'Invalid email adress')
                    .exists()
                    .isEmail(),
                body('password', 'Password must be atleast 5 characters')
                    .exists()
                    .isLength({min: 5}),
                body('confirmPassword', 'Password confirmation must be atleast 5 characters')
                    .exists()
                    .isLength({min: 5})
                    .custom((passwordConf, {req}) => {
                        if(passwordConf !== req.body.password) {
                            throw new Error("Passwords must match!")
                        }
                        return true
                    })
            ]
        default: 
            break;
    }
}

router.post('/register', userInfoValidation("register"), async (req, res) => {
    const user = {
        name: "dragos",
    }
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(401).send(errors.array())
    }
    const {firstName, lastName, email, password} = req.body

    //hash the password
    const pwHash = await bcrypt.hash(password, saltRounds)

    console.log(pwHash)

    res.send(user)
})

export default router