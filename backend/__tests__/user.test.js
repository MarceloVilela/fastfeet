import request from 'supertest';
import bcrypt from 'bcryptjs';

import app from '../src/app';
import User from '../src/app/models/User';

import factory from './factories';
import truncate from './util/truncate';

async function seedUserAdmin() {
  const admin = await factory.attrs('User', {
    email: 'admin@fastfeet.com',
    password: '123456',
  });

  await User.create(admin);

  return admin;
}

async function loginUser({ email, password }) {
  const response = await request(app)
    .post('/sessions')
    .send({ email, password });

  return { token: response.body.token };
}

describe('User', () => {
  let auth = {};
  beforeAll(async () => {
    await truncate();
    const { email, password } = await seedUserAdmin();
    auth = await loginUser({ email, password });
  });

  beforeEach(async () => {
    // await truncate();
  });

  /* it('should encrypt user password when new user created', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    await User.create(user);

    const compareHash = await bcrypt.compare('123456', '123456');

    expect(compareHash).toBe(true);
  }); */

  it('should not be able to register whit invalid data', async () => {
    const user = await factory.attrs('User', {
      email: 'site.com',
    });

    const response = await request(app)
      .post('/users')
      .set('Authorization', `bearer ${auth.token}`)
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should be able to register', async () => {
    const register = await factory.attrs('User', {});

    const response = await request(app)
      .post('/users')
      .set('Authorization', `bearer ${auth.token}`)
      .send(register);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register whit duplicated email', async () => {
    const register = await factory.attrs('User', {
      email: 'duplicated@gmail.com',
    });

    await request(app)
      .post('/users')
      .set('Authorization', `bearer ${auth.token}`)
      .send(register);

    const response = await request(app)
      .post('/users')
      .set('Authorization', `bearer ${auth.token}`)
      .send(register);

    expect(response.status).toBe(400);
  });

  it('should not be able to update password whitout oldPassword', async () => {
    const user = await factory.attrs('User', {
      email: 'whitoutoldpassword@gmail.com',
    });

    const responseCreated = await request(app)
      .post('/users')
      .set('Authorization', `bearer ${auth.token}`)
      .send(user);

    const { token } = await loginUser(user);

    const response = await request(app)
      .put('/users')
      .set('Authorization', `bearer ${token}`)
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should not be able to update password without oldPassword and password', async () => {
    const user = await factory.attrs('User', {
      oldPassword: '123456',
    });

    await request(app)
      .post('/users')
      .set('Authorization', `bearer ${auth.token}`)
      .send({ ...user, password: null });

    const { token } = await loginUser(user);

    const response = await request(app)
      .put('/users')
      .set('Authorization', `bearer ${token}`)
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should not be able to update with an old password other than the confirmation password', async () => {
    const user = await factory.attrs('User', {
      email: 'unconfirmedpassword@gmail.com',
      password: '123456',
      oldPassword: '123456',
      confirmPassword: '654321',
    });

    const responseCreated = await request(app)
      .post('/users')
      .set('Authorization', `bearer ${auth.token}`)
      .send(user);

    const { token } = await loginUser(user);

    const response = await request(app)
      .put('/users')
      .set('Authorization', `bearer ${token}`)
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should not be able to update with wrong old password', async () => {
    const user = await factory.attrs('User', {
      name: 'Wrong',
      email: 'wrong@gmail.com',
      password: 'aaabbb',
      confirmPassword: 'aaabbb',
      oldPassword: '123456',
    });

    const responseCreated = await request(app)
      .post('/users')
      .set('Authorization', `bearer ${auth.token}`)
      .send(user);

    const { token } = await loginUser(user);

    const response = await request(app)
      .put('/users')
      .set('Authorization', `bearer ${token}`)
      .send(user);

    console.error(
      '===>response-old',
      response.body,
      response.status,
      token,
      auth.token,
      JSON.stringify({ user }),
    );

    expect(response.status).toBe(400);
  });

  it('should not be able to register whit duplicated email', async () => {
    const user = await factory.attrs('User', {
      email: 'duplicated@gmail.com',
    });

    await request(app)
      .post('/users')
      .set('Authorization', `bearer ${auth.token}`)
      .send(user);

    const { token } = await loginUser(user);

    const response = await request(app)
      .post('/users')
      .set('Authorization', `bearer ${token}`)
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should not be able to change email to already used by another user', async () => {
    const userA = await factory.attrs('User', {
      email: 'marcelo.vilela.s@hotmail.com',
      password: '123456',
      oldPassword: '123456',
      confirmPassword: '123456',
    });

    const responseCreated = await request(app)
      .post('/users')
      .set('Authorization', `bearer ${auth.token}`)
      .send(userA);

    const { token } = await loginUser(userA);

    const userB = await factory.attrs('User', {
      email: 'diego3g@gmail.com',
    });

    await request(app)
      .post('/users')
      .set('Authorization', `bearer ${auth.token}`)
      .send(userB);

    const responseChange = await request(app)
      .put('/users')
      .set('Authorization', `bearer ${token}`)
      .send({ ...userA, email: 'diego3g@gmail.com' });

    expect(responseChange.status).toBe(400);
  });

  it('should be able to update', async () => {
    const user = await factory.attrs('User', {
      email: 'marcelo.vilela.s@gmail.com',
      password: '123456',
      oldPassword: '123456',
      confirmPassword: '123456',
    });

    await request(app)
      .post('/users')
      .set('Authorization', `bearer ${auth.token}`)
      .send(user);

    const { token } = await loginUser(user);

    const response = await request(app)
      .put('/users')
      .set('Authorization', `bearer ${token}`)
      .send({ ...user, name: 'Marcelo Vilela da Silva' });

    expect(response.body).toHaveProperty('name');
  });

  it('should be able to update the email that does not belong to another user', async () => {
    const user = await factory.attrs('User', {
      email: 'update@gmail.com',
      password: '123456',
      oldPassword: '123456',
      confirmPassword: '123456',
    });

    await request(app)
      .post('/users')
      .set('Authorization', `bearer ${auth.token}`)
      .send(user);

    const { token } = await loginUser(user);

    const response = await request(app)
      .put('/users')
      .set('Authorization', `bearer ${token}`)
      .send({ ...user, email: 'didntexistbefore@gmail.com' });

    expect(response.body).toHaveProperty('name');
  });
});

/*
    console.error(
      '===>response-old',
      responseCreated.body,
      responseCreated.status,
      token,
      auth.token,
      JSON.stringify({ user }),
    );
*/
