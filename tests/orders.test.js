const request = require('supertest')
const app = require('../app')

// const User = require('./../models/usersModel')


it('Should Creat a New Order', async() => {
    await request(app)
        .post('order/make')
        .send({
            "mealId": "5f893c3bec48542e24c1e566",
            "quantity": 15,
            "officeRoomNumber": "genesys office 123"
        })
        .expect(201)
})