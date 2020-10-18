const request = require('supertest')
const app = require('../app')

// const User = require('./../models/usersModel')


it('Should add a new meal', async() => {
    await request(app)
        .post('meal/add')
        .send({
            "name": "Fired Rice",
            "description": "It comes with 2 meat and a bottle water- Slad ",
            "price": "900",
            "photo": "https://wp.me/img1"
        })
        .expect(201)
})

it('Should get all Meal', async() => {
    await request(app)
        .get('meal/all')
        .expect(200)
})