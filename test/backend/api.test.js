import request from 'supertest'
require('dotenv').config()
const app = process.env.BASE_URL

describe('Get Endpoints', () => {
  it('Should get list of all songs', async () => {
    const res = await request(app).get('/api/song')
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('songs')
  })
})
