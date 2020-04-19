module.exports = {
  up: (QueryInterface) => QueryInterface.bulkInsert(
    'recipients',
    [
      {
        id: 2,
        name: 'Luiz Alves Almeida',
        number: 24,
        complement: 'Casa',
        state: 'Rio de Janeiro',
        city: 'Rio de Janeiro',
        zip_code: 21765310,
        created_at: '2020-03-04T18:30:15.523Z',
        updated_at: '2020-04-19T12:04:26.846Z',
        canceled_at: null,
        street: 'Rua Cosmorama',
      },
      {
        id: 3,
        name: 'Nicolas Lima Barros',
        number: 1832,
        complement: 'Casa',
        state: 'Rio de Janeiro',
        city: 'Belford Roxo',
        zip_code: 26113043,
        created_at: '2020-03-12T12:16:49.135Z',
        updated_at: '2020-04-19T12:24:46.029Z',
        canceled_at: null,
        street: 'Rua Nazaré',
      },
      {
        id: 4,
        name: 'Rafael Costa Correia',
        number: 1556,
        complement: 'Casa',
        state: 'Rio de Janeiro',
        city: 'Mesquita',
        zip_code: 26580061,
        created_at: '2020-03-12T14:04:03.986Z',
        updated_at: '2020-04-06T20:05:13.954Z',
        canceled_at: '2020-04-06T20:05:13.953Z',
        street: 'Rua Liberato',
      },
      {
        id: 5,
        name: 'Raissa Castro Goncalves',
        number: 585,
        complement: 'Casa',
        state: 'Rio de Janeiro',
        city: 'Volta Redonda',
        zip_code: 27240695,
        created_at: '2020-04-19T12:30:20.920Z',
        updated_at: '2020-04-19T12:30:20.920Z',
        canceled_at: null,
        street: 'Rua Cinco-A',
      },
      {
        id: 6,
        name: 'Sarah Cardoso Costa',
        number: 35,
        complement: 'Apartamento 123',
        state: 'Rio de Janeiro',
        city: 'São Gonçalo',
        zip_code: 24745790,
        created_at: '2020-04-19T12:31:56.754Z',
        updated_at: '2020-04-19T12:31:56.754Z',
        canceled_at: null,
        street: 'Rua Gonçalo Paiva Gomes',
      },
      {
        id: 7,
        name: 'Melissa Melo Ferreira',
        number: 1978,
        complement: 'Apartamento 456',
        state: 'Rio de Janeiro',
        city: 'Rio de Janeiro',
        zip_code: 20950080,
        created_at: '2020-04-19T12:34:24.226Z',
        updated_at: '2020-04-19T12:34:24.226Z',
        canceled_at: null,
        street: 'Rua Angola',
      },
      {
        id: 8,
        name: 'Miguel Martins Alves',
        number: 1175,
        complement: 'Apartamento 789',
        state: 'Rio de Janeiro',
        city: 'Rio de Janeiro',
        zip_code: 22723315,
        created_at: '2020-04-19T12:35:09.961Z',
        updated_at: '2020-04-19T12:35:09.961Z',
        canceled_at: null,
        street: 'Beco João Cirino',
      },
      {
        id: 9,
        name: 'José Barros Melo',
        number: 1840,
        complement: 'Casa',
        state: 'Rio de Janeiro',
        city: 'Niterói',
        zip_code: 24210470,
        created_at: '2020-04-19T12:36:11.676Z',
        updated_at: '2020-04-19T12:36:11.676Z',
        canceled_at: null,
        street: '"Rua Presidente Pedreira',
      },
      {
        id: 10,
        name: 'Yasmin Martins Cavalcanti',
        number: 1399,
        complement: 'Casa',
        state: 'Rio de Janeiro',
        city: 'Queimados',
        zip_code: 26379190,
        created_at: '2020-04-19T12:36:51.210Z',
        updated_at: '2020-04-19T12:36:51.210Z',
        canceled_at: null,
        street: 'Queimados-RJ',
      },
      {
        id: 11,
        name: 'Vinícius Ribeiro Azevedo',
        number: 550,
        complement: 'Casa',
        state: 'Rio de Janeiro',
        city: 'Duque de Caxias',
        zip_code: 25220090,
        created_at: '2020-04-19T12:39:26.770Z',
        updated_at: '2020-04-19T12:39:26.770Z',
        canceled_at: null,
        street: 'Rua Leopoldina',
      },
      {
        id: 12,
        name: 'Rodrigo Cavalcanti Ribeiro',
        number: 290,
        complement: 'Apartamento 321',
        state: 'Rio de Janeiro',
        city: 'Campos dos Goytacazes',
        zip_code: 28085530,
        created_at: '2020-04-19T12:40:35.615Z',
        updated_at: '2020-04-19T12:40:35.615Z',
        canceled_at: null,
        street: 'Rua AB-2',
      },
      {
        id: 13,
        name: 'Arthur Araujo Castro',
        number: 177,
        complement: 'Apartamento 321',
        state: 'Rio de Janeiro',
        city: 'Rio de Janeiro',
        zip_code: 23012290,
        created_at: '2020-04-19T12:41:05.257Z',
        updated_at: '2020-04-19T12:41:05.257Z',
        canceled_at: null,
        street: 'Praça Gonçalo Jacome',
      },
      {
        id: 14,
        name: 'Larissa Sousa Fernandes',
        number: 1142,
        complement: 'Apartamento 654',
        state: 'Rio de Janeiro',
        city: 'Belford Roxo',
        zip_code: 26155350,
        created_at: '2020-04-19T12:41:58.855Z',
        updated_at: '2020-04-19T12:41:58.855Z',
        canceled_at: null,
        street: 'Rua Clara Nunes',
      },
    ],
    {},
  ).then(async () => QueryInterface.sequelize.query('ALTER SEQUENCE "recipients_id_seq" RESTART WITH 15')),

  down: (queryInterface, Sequelize) => { },
};
