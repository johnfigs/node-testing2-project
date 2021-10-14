const { nanoid } = require('nanoid')

function getId() {
    return nanoid().slice(0, 5)
}

const initializeUsers = () => ([
    { id: getId(), username: "Mabel" },
    { id: getId(), username: "Lala" },
])

let users = initializeUsers()

const getAll = () => {
    // SELECT * FROM users;
    return Promise.resolve(users)
  }

const insert = ({ username }) => {
    // INSERT INTO users (name, bio) VALUES ('foo', 'bar');
    const newUser = { id: getId(), username }
    users.push(newUser)
    return Promise.resolve(newUser)
  }

module.exports = {
  getAll,
  insert,
}