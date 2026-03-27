import supertest from 'supertest';
import { app } from '../../src/app';
import connection from '../../src/database/connection';

import * as argon2 from 'argon2';


const fakeArgon2Hash = '$argon2id$v=19$m=65536,t=3,p=4$saltsalt$hashhashhashhashhashhashhashhash';
jest.mock('argon2', () => ({
  hash: jest.fn(() => Promise.resolve(fakeArgon2Hash)),
  verify: jest.fn((hash, password) => Promise.resolve(
    hash.startsWith('$argon2id$') && password === 'adminpassword'
  ))
}));

beforeAll(() => {
  process.env.SECRET = 'testsecret';
});

afterEach(() => {
  jest.clearAllMocks();
});

function mockConnectWithResponses(responder: (sql: string, params: any[]) => any) {
  const query = jest.fn((sql: string, params: any[]) => {
    const response = responder(sql, params);
    return Promise.resolve(response);
  });
  const release = jest.fn();
  (connection as any).connect = jest.fn().mockResolvedValue({ query, release });
  return { query, release };
}

describe('Testes de Integração - Autenticação (Auth)', () => {
  test('POST /auth/register - nome de usuário ausente retorna 400', async () => {
    const res = await supertest(app)
      .post('/auth/register')
      .send({ email: 'admin@operix.com.br', password: 'adminpassword', confirmPassword: 'adminpassword', tenant_id: 1 });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test('POST /auth/register - sucesso retorna 201', async () => {
    mockConnectWithResponses((sql) => {
      if (sql.includes('WHERE email')) return { rowCount: 0, rows: [] };
      if (sql.includes('WHERE username')) return { rowCount: 0, rows: [] };
      if (sql.includes('INSERT INTO users')) return { rows: [{ id: 1, username: 'adminuser' }], rowCount: 1 };
      return { rows: [], rowCount: 0 };
    });

    const res = await supertest(app)
      .post('/auth/register')
      .send({
        username: 'adminuser',
        email: 'admin@operix.com.br',
        password: 'adminpassword',
        confirmPassword: 'adminpassword',
        tenant_id: 1
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.msg).toBe("Usuário registrado com sucesso");
  });

  test('POST /auth/login - senha ausente retorna 400', async () => {
    const res = await supertest(app)
      .post('/auth/login')
      .send({ username: 'adminuser' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test('POST /auth/login - sucesso retorna token e usuário no campo data', async () => {
      const passwordHash = fakeArgon2Hash;

      mockConnectWithResponses((sql) => {
        if (sql.includes('users') && sql.includes('WHERE username')) {
          return { rows: [{ id: 1, username: 'adminuser', password: passwordHash, admin: true, tenant_id: 1 }], rowCount: 1 };
        }
        return { rows: [], rowCount: 0 };
      });

      const res = await supertest(app)
        .post('/auth/login')
        .send({ username: 'adminuser', password: 'adminpassword', remember: true });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
      expect(res.body.data.user).toBeDefined();
      expect(res.body.msg).toBe("Login realizado com sucesso");
    });
});
