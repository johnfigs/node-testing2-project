const express = require('express')


const Users = require('./users/model')

const server = express()

server.use(express.json())

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
}) 

server.get('/api/users/', (req, res, next) => {
    Users.getAll()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(next)
})

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  });
  

module.exports = server