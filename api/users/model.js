const db = require('../../data/dbConfig')

module.exports = {
    getAll,
    getById,
    insert,
    remove
}

function getAll() {
    return db('users')
}

function getById(id) {
    return db('users').where("id", id).first()
}

async function insert(user) {
    const [id] = await db('users').insert(user)
    return getById(id)
}

function remove(id) {
    return db('users')
        .where('id', id)
        .del()
}