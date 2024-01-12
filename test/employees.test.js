const supertest = require('supertest');
const { server } = require('../src/app');
const jwt = require("jsonwebtoken");

const request = supertest(server);

const signToken = () => {
  let expiration = "1d";
  const secret = process.env.SECRET;
  const token = jwt.sign(
    {
      id: 1,
      username: process.env.SEEDER_ADMIN_USERNAME,
      admin: process.env.SEEDER_ADMIN_PERMISSION
    },
    secret,
    { expiresIn: expiration }
  );

  return `Bearer ${token}`;
};

const jwtToken = signToken();

describe('Employees route E2E test', () => {

  test('GET /employees ', async () => {
    const response = await request.get('/employees').set('Authorization', jwtToken);

    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('POST /employees ', async () => {
    const response = await request.post('/employees').set('Authorization', jwtToken).send({
      full_name: 'Pedro Pereira Lima',
      address: 'Rua trexe de maio',
      cpf: '05028217291',
      entry_date: '2024-02-26',
      payment_type: 'Mensal',
      payment_value: '1200',
      total_salary: '1200',
      pix_key: '',
      vouchers: ''
    });

    expect(response.created).toEqual(true);
  });
});
