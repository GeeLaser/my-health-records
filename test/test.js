const chai = require('chai')
const app = require('../app')
const chaiHttp = require('chai-http');
const { response } = require('../app');

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
})