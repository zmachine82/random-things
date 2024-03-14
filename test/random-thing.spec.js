const request = require('supertest');
const app = require('../src/app')
require('dotenv').config();
const databaseTest = require('./databaseTest');

describe('stuff', () => {
    databaseTest()

    describe('get things', () => {

        it('should return 401 if no jwt token', async () => {
            return request(app)
                .get('/random-things')
                .expect(401)
        })

        it('should give me a list of the random things I can do', async () => {
            const signUpResponse = await request(app).post('/sign-up')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                });

            return request(app)
                .get('/random-things')
                .set('Authorization', `Bearer ${signUpResponse.body.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .then(response => {
                    expect(response.body).toEqual(
                        expect.arrayContaining([{
                            name: 'randomPokemon',
                            text: 'Random Pokemon'
                        }]));
                })
        })
    })

    describe('randomPokemon', () => {

        it('should return 401 if no jwt token', async () => {
            return request(app)
                .post('/random-things/randomPokemon')
                .expect(401)
        })
        it('should return a random pokemon', async () => {
            const signUpResponse = await request(app).post('/sign-up')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                });
            return request(app)
                .post('/random-things/randomPokemon')
                .set('Authorization', `Bearer ${signUpResponse.body.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .then(response => {
                    expect(response.body).toEqual(
                        expect.objectContaining({
                            name: expect.any(String),
                            image: expect.any(String)
                        }));
                })
        })

    })
})


