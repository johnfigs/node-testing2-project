const server = require('./server')
const request = require('supertest')
const db = require('../data/dbConfig')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe('[GET] /api/users', () => {
    let res
    beforeEach(async () => {
      res = await request(server).get('/api/users/')
    })
    it('responds with 200 OK', () => {
      expect(res.status).toBe(200)
    })
    it('responds with the correct number of users', () => {
        expect(res.body).toHaveLength(3)
    })
  })

  describe('[POST] /api/users/', () => {
      let res
      beforeEach(async () => {
          res = await request(server).post('/api/users/').send({username: 'Jess' })
      })
      it('responds with 201 created', async () => {
          expect(res.status).toBe(201)
      })
      it('causes a user to be added to the db', async () => {
        const users = await db('users')
        expect(users).toHaveLength(4)
    })
  })

  describe('[DELETE] /api/users/:id', () => {
      let res
      beforeEach(async () => {
           res = await request(server).delete('/api/users/1')
      })
      it('responds with a 200 deleted', () => {
          expect(res.status).toBe(200)
      })
      it('responds with the deleted user', () => {
          expect(res.body).toMatchObject({id: 1, username: 'Mabel'})
      })
  })


