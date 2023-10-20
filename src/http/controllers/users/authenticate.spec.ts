import request from 'supertest'
import { app } from '@/app'
import { expect, describe, it, afterAll, beforeAll } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to autenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'Jhon Doe',
      email: 'johndoe@exameple.com',
      password: '123456',
      role: 'MEMBER',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@exameple.com',
      password: '123456',
    })

    expect(response.status).toEqual(200)
    expect(response.body).toHaveProperty('token')
  })
})
