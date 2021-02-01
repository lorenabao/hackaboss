const { authValidator } = require('../validators/users')
const bcrypt = require('bcrypt');
const storage = require('../db/memory')

const registro = async (req, res) => {
    try {
        await authValidator.validateAsync(req.body)

        const { email, password, repeatPassword } = req.body

        const passwordBcrypt = await bcrypt.hash(password, 10);

        storage.addUser(email, passwordBcrypt)

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