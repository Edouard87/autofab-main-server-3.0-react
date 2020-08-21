/**
 * These tests test the functonality of the authenticaton system.
 */

const expect = require("chai").expect;
const reservactions = require("../models/reservation2");
const request = require("supertest");
const app = require("../app");
const session = require("supertest-session");

let testSession = null;

beforeEach(function () {
    testSession = session(app);
});

// Supertest fecthes cookies from the auth route

describe("Makes a request to a restricted route", () => {
    it("should fail because the route is restricted to only those who are authorized", done => {
        testSession
        .get("/hardware/types/view")
        .expect(401)
        .end(done);
    })
})

describe("Makes a request to log in", () => {
    it("should pass because the username and password are both correct", done => {
        testSession.post('/auth/login')
        .send({email: "admin@autofab.com", password: "admin"})
        .expect(200)
        .end(done)
    })
})
describe('after authenticating session', function () {

    var authenticatedSession;

    beforeEach(function (done) {
        testSession.post('/auth/login')
            .send({ email: 'admin@autofab.com', password: 'admin' })
            .expect(200)
            .end(function (err) {
                if (err) return done(err);
                authenticatedSession = testSession;
                return done();
            });
    });

    it('should get a restricted page', function (done) {
        authenticatedSession.get('/hardware/types/view')
            .expect(200)
            .end(done)
    });

});