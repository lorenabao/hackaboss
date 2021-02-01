const fs = require('fs')
const users = [];

const addUser = (email, password) => {
    let user = users.find(u => u.email === email)

    if (user) {
        throw new Error('User already exists')
    }
    
    users.push({
        email,
        password
    })
    const jsonUser = JSON.stringify(users)

    fs.writeFileSync('users.json', jsonUser, 'utf-8')

}

module.exports = {
    addUser
}

