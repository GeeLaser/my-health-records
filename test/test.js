const supertest = require("supertest");

var server = supertest.agent('http://localhost:8080')

describe("Sample test", () => {
    it("should return login page", (done) => {
        server
            .get('/')
            .expect('Content-type', /text/)
            .expect(200)
            .end(function (err, res) {
                done();
            });
    });
});
