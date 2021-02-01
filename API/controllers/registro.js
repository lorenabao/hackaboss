const { authValidator } = require('../validators/users')
const bcrypt = require('bcrypt');
const fs = require('fs');

const users = [];

const registro = async (req, res) => {
    try {
        await authValidator.validateAsync(req.body)

        const { email, password, repeatPassword } = req.body
        console.log(`New user to register: ${email}`)

        const passwordBcrypt = await bcrypt.hash(password, 10);
        console.log('Encrypting password')

        // Falta comprobar que el usuario no existe en nuestra bdd
        let newUser = {
            email: email,
            password: passwordBcrypt
        };

        users.push(newUser)
        console.log('New user registered')
        
        const jsonUser = JSON.stringify(users)

        fs.writeFileSync('users.json', jsonUser, 'utf-8')
        

    } catch (e) {
        res.status(400).send('Error registration user')
        console.log('Error registration user', e.message)
        return
    }

    res.send('Welcome!')
}



module.exports = {
    registro
}