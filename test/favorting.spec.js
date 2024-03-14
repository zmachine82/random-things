const request = require('supertest');
const app = require('../src/app');
const databaseTest = require('./databaseTest');

require('dotenv').config();

describe('add random thing', () => {
    databaseTest()

    it('cannot add favorite thing if not logged in', () => {
        return request(app)
            .post('/favorite')
            .expect(401)
    })

    it('add favorite thing if logged in', async () => {
        const signUpResponse = await request(app).post('/sign-up')
            .send({
                email: 'test@example.com',
                password: 'password123',
            });

        return request(app)
            .post('/favorite')
            .set('Authorization', `Bearer ${signUpResponse.body.token}`)
            .send({
                randomThingType: "randomPokemon",
                thing: {
                    name: "dratini",
                    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png"
                }
            })
            .expect(201)
    });

    it('should be able to get previously favorited thing', async () => {
        const signUpResponse = await request(app).post('/sign-up')
            .send({
                email: 'test@example.com',
                password: 'password123',
            });

        await request(app)
            .post('/favorite')
            .set('Authorization', `Bearer ${signUpResponse.body.token}`)
            .send({
                randomThingType: "randomPokemon",
                thing: {
                    name: "dratini",
                    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png"
                }
            });


        await request(app)
            .get('/favorite')
            .set('Authorization', `Bearer ${signUpResponse.body.token}`)
            .expect(200)
            .then(res => expect(res.body.length).toEqual(1))
    });

    it('should be able to get previously favorited things, but not other peoples favorited things', async () => {
        const signUpResponse = await request(app).post('/sign-up')
            .send({
                email: 'test@example.com',
                password: 'password123',
            });

        const signUpResponse2 = await request(app).post('/sign-up')
            .send({
                email: 'test2@example.com',
                password: 'password1232',
            });

        await request(app)
            .post('/favorite')
            .set('Authorization', `Bearer ${signUpResponse.body.token}`)
            .send({
                randomThingType: "randomPokemon",
                thing: {
                    name: "dratini",
                    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png"
                }
            });

        await request(app)
            .get('/favorite')
            .set('Authorization', `Bearer ${signUpResponse.body.token}`)
            .expect(200)
            .then(res => expect(res.body.length).toEqual(1))

        await request(app)
            .get('/favorite')
            .set('Authorization', `Bearer ${signUpResponse2.body.token}`)
            .expect(200)
            .then(res => expect(res.body.length).toEqual(0))
    });
})