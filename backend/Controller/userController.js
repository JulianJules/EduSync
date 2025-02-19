const User = require('../Models/userModel');
const crypto = require('crypto')
const validator  = require('validator')
const {genPassword} = require('../Auth/Auth')
const jwt = require('jsonwebtoken');
const T_SECRET = process.env.ACCESS_TOKEN_SECRET;

// Generate JWT based on the userID
const createToken = (_id) => {
    return jwt.sign({_id}, T_SECRET, { expiresIn: '1h' })
}

//Compares the storedHash and storedSalt to the Salt and Hash from the password the user typed
function verifyPassword(providedPassword, storedSalt, storedHash) {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(providedPassword, storedSalt, 10000, 64, 'sha512', (err, hashedPassword) => {
        if (err) reject(err);
        resolve(hashedPassword.toString('hex') === storedHash);
      });
    });
  }

const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        // Checks if the user didn't these required fields blank
        if (!email || !password) {
            throw Error('All fields must be filled')
        }

        const Login_User = await User.findOne({email})
        
        //Checks if the email the user typed is in the database
        if (!Login_User) {
            console.log("J")
            throw Error('Incorrect Email')
        }

        //Retreive the hash and salt based on the email
        const storedHash = Login_User.hash; 
        const storedSalt = Login_User.salt;

        //Verifies if the password is correct
        if (!await verifyPassword(password, storedSalt, storedHash)) {
            throw Error('Incorrect Password')
        }

        //Creates the token baed on the UserID
        const token = createToken(Login_User._id.toString())

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Lax',
            maxAge: 60 * 60 * 1000, // 1 hour
        });
        
        res.status(200).json({email})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const signup_User = async (req,res) => {
    try {
        const {email, password} = req.body

        // Checks if the user didn't these required fields blank
        if (!email || !password) {
            throw Error('All fields must be filled')
        }

        //Checks if the email format is correct
        if (!validator.isEmail(email)) {
            throw Error('Email is not valid')
        }

        //Checks to see if the email is being used already
        if (await User.findOne({email})) {
            throw Error('Email already being used')
        }

        //Creates the hash and salt of the password
        const securePassword = genPassword(password)
        const hash = securePassword.hash
        const salt = securePassword.salt

        //Creates a new document in the Users Collection
        const SignUp = await User.create({email, hash, salt})

        //Used to create the JWT based on the userID
        const id = SignUp._id.toString()
        const token = createToken(id)

        //Sends the cookie with Http
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Lax',
            maxAge: 60 * 60 * 1000, // 1 hour
        });
        
        console.log(token)
        res.status(200).json({email, id})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


module.exports = {signup_User, loginUser}