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

describe('[GET] /users', () => {
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



