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

it('Should get all orders', async() => {
    await request(app)
        .get(`order/all`)
        .expect(200)
})


it('Should delete orders', async() => {
    const id = " "
    await request(app)
        .delete(`order/delete/${id}`)
        .expect(204)
})


it('Should Cancel an order', async() => {
    await request(app)
        .post('order/cancel')
        .send({
            "orderId": "5f893c3bec48542e24c1e566",
        })
        .expect(200)
})


it('Should Complete an order', async() => {
    await request(app)
        .post('order/complete')
        .send({
            "orderId": "5f893c3bec48542e24c1e566",
        })
        .expect(200)
})