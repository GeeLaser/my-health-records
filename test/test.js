const chai = require('chai')
const app = require('../app')
const chaiHttp = require('chai-http');
const { response } = require('../app');
const { request } = require('chai');
const fs = require('fs')
var assert = require('assert');

const manage = require('../routes/manage');

chai.use(chaiHttp)
chai.should();

// tests for upload, email, and download
describe('API tasks', () => {
    it('Should GET upload page', (done) => {
        chai.request(app)
            .get('/upload')
            .end((err, response) => {
                response.should.have.status(200)
                done();
            })
    })
    it('Should POST to upload page', (done) => {
        chai.request(app)
            .post('/upload/uploadFile')
            .send(
                {
                    fieldname: 'userDoc',
                    originalname: 'City of Houston TX - Permit Payments.pdf',
                    encoding: '7bit',
                    mimetype: 'application/pdf'
                })
            .end((err, response) => {
                response.should.have.status(200)
                done();
            })
    })
    it('Should GET email page', (done) => {
        chai.request(app)
            .get('/email')
            .end((err, response) => {
                response.should.have.status(200)
                done();
            })
    })
    it('Should POST to email page', (done) => {
        chai.request(app)
            .post('/email/sendEmail')
            .send({
                to: 'henryhmadsen@gmail.com',
                subject: 'asdasd',
                body: 'asdsad',
                checkedFile: [
                    '987461-1637790872534-math 3339 stats for sci.png',
                    '987461-1637791268629-Turkey-Creek-Unit-Trail-Map-508.pdf',
                    '987461-1637948442379-City of Houston TX - Permit Payments.pdf'
                ]
            })
            .end((err, response) => {
                response.should.have.status(200)
                done();
            })
    })
    it('Should GET download/manage page', (done) => {
        chai.request(app)
            .get('/manage')
            .end((err, response) => {
                response.should.have.status(200)
                done();
            })
    })

})

var getUploads = require('../functions/getUploads')
var getNumFiles = require('../functions/getNumFiles');
const sendMail = require('../functions/sendEmail');

describe('Unit Tests', () => {
    it('Number of user uploads == user files in uploads directory', () => {
        var numUploads = getUploads(987461)
        var numfiles = getNumFiles(987461)
        assert.equal(numUploads.length, numfiles)
    })
    it('Should construct the same message', () => {

        var body = {
            to: 'henryhmadsen@gmail.com',
            subject: 'this is a test',
            body: 'hi doc here are the records ',
        }

        var user = {
            name: "test user"
        }

        var request =
        {
            body: body,
            user: user
        }


        var returnedMessage = sendMail(request)

    assert(request.body.to == returnedMessage.to)
    assert('test user says: this is a test' == returnedMessage.subject)
    assert(request.body.body == returnedMessage.text)
    

})
})