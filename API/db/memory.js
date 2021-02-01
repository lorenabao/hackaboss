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

const getUsers = () => {
    return Object.keys(users)
}

const getUser = (email) => {
    let user = users.find(u => u.email === email)

    if(!user) {
        throw new Error('User doesnt found')
    }

    return user
}

module.exports = {
    addUser,
    getUser,
    getUsers
}

