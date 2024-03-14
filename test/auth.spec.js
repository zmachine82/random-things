const request = require('supertest');
const app = require('../src/app');
const jwt = require('jsonwebtoken');
const databaseTest = require('./databaseTest');
require('dotenv').config();


describe('auth', () => {
    databaseTest()

    describe('Sign up', () => {
        it('should be able to sign up for an account', async () => {
            const response = await request(app).post('/sign-up')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                });

            expect(response.statusCode).toBe(201);
            expect(response.body.token).toBeTruthy();

            const verifiedToken = jwt.verify(response.body.token, process.env.JWT_SECRET);
            expect(verifiedToken).toBeDefined();
            return response
        })
    })

    describe('Sign in', () => {
        it('should be able to sign in to an account previously setup', async () => {

            await request(app).post('/sign-up')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                });

            const response = await request(app).post('/sign-in')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                });


            expect(response.statusCode).toBe(200);
            expect(response.body.token).toBeTruthy();

            const verifiedToken = jwt.verify(response.body.token, process.env.JWT_SECRET);
            expect(verifiedToken).toBeDefined();

            const badresponse = await request(app).post('/sign-in')
                .send({
                    email: 'test@example.com',
                    password: 'badpassword',
                });
            expect(badresponse.statusCode).toBe(400)
        })
    })

})

