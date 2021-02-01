const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const storage = require('../db/memory')


const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = storage.getUser(email)
 
        const passwordIsvalid = await bcrypt.compare(password, user.password);

        if (!passwordIsvalid) {
            res.status(401).send('Incorrect password or user')
            return
        }

        const tokenPayload = {
            email: user.email,
            password: user.password,
        }

        const token = jwt.sign(tokenPayload, process.env.SECRET, {
            expiresIn: '1d'
        });


        res.json({
            token
        })


    } catch (e) {
        res.status(401).send('Some error ocurred')
        console.log(e.message)
        return
    }

    // res.send('Hello!')
}

module.exports = {
    login
}