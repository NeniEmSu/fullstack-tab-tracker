import request from 'supertest'
// import app from '../server/index'
// const app = 'http://localhost:3000'
require('dotenv').config()
const app = process.env.BASE_URL

describe('Get Endpoints', () => {
  it('Shold get list of all songs', async () => {
    const res = await request(app).get('/api/song')
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('songs')
  })
})

// describe('Test the root path', () => {
//   test('It should response the GET method', (done) => {
//     request(app)
//       .get('/')
//       .then((response) => {
//         expect(response.statusCode).toBe(200)
//         done()
//       })
//   })
// })
