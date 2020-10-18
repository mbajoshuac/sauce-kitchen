const request = require('supertest')
const app = require('./../app')

// const User = require('./../models/usersModel')


it('should create a new User', async() => {
    await request(app)
        .post('/user/signup')
        .send({
            "firstName": "Joshua",
            "lastName": "Mba",
            "phone": "07063516620",
            "sex": "male",
            "email": "joshua33@gmail.com",
            "password": "12345678",
            "confirmPassword": "12345678"
        })
        .expect(201)
})