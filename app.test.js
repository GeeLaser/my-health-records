const { expect } = require("chai")
const request = require("supertest")
const app = require("./app")

it('gets login page', () => {
    request(app).post('/login').send({
        email: 'q@q',
        password: 'Remember1'
    }).expect(200);
})


it('uploads document', () => {
    request(app).post('/upload/uploadFile').send({
        fieldname: 'userDoc',
        originalname: 'City of Houston TX - Permit Payments.pdf',
        encoding: '7bit',
        mimetype: 'application/pdf'
    }).expect(200);
})