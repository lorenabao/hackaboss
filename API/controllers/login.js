const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs')

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // Traer la info de los usuarios
        const users = fs.readFileSync('users.json', 'utf8')
        const jsonUsers = JSON.parse(users)

        // Comprobar que existe el usuario - devuelve la contraseña
        const user = jsonUsers.map(user => user.email === email ? user.password : undefined)

        // if (user.email === undefined) {
        //     res.status(401).send('Incorrect user or password')
        //     return
        // }

        // Comprobar contraseña
        const userData = JSON.stringify(user)
        console.log(userData)
        const passwordIsvalid = await bcrypt.compare(password, userData);

        if (!passwordIsvalid) {
            res.status(401).send('Incorrect password or user')
            return
        }

        // Crear token 
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

    res.send('Hello!')
}

module.exports = {
    login
}