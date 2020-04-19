module.exports = {
  up: (QueryInterface) => QueryInterface.bulkInsert(
    'deliverymen',
    [
      {
        id: 1,
        name: 'Marcelo Vilela Silva',
        avatar_id: '28929274-1584036755982.png',
        email: 'marcelo.vilela.s@gmail.com',
        created_at: '2020-03-12T11:30:15.523Z',
        updated_at: '2020-03-12T11:30:15.523Z',
        canceled_at: null,
      },
      {
        id: 2,
        name: 'Fábio Oliveira Fernandes',
        avatar_id: '28929274-1584036755983.png',
        email: 'fabio@armyspy.com',
        created_at: '2020-03-12T11:30:15.523Z',
        updated_at: '2020-04-18T11:30:15.523Z',
        canceled_at: null,
      },
      {
        id: 3,
        name: 'Matheus Silva Cardoso',
        avatar_id: '28929274-1584036755984.png',
        email: 'matheus@armyspy.com',
        created_at: '2020-03-12T11:30:15.523Z',
        updated_at: '2020-03-12T11:30:15.523Z',
        canceled_at: '2020-04-18T11:30:15.523Z',
      },
      {
        id: 4,
        name: 'Vinícius Alves Carvalho',
        avatar_id: '28929274-1584036755985.png',
        email: 'viniciusdecarvalho@armyspy.com',
        created_at: '2020-03-12T11:30:15.523Z',
        updated_at: '2020-03-13T14:54:15.523Z',
        canceled_at: null,
      },
      {
        id: 5,
        name: 'Diogo Martins Melo',
        avatar_id: '28929274-1584036755986.png',
        email: 'diogo@armyspy.com',
        created_at: '2020-03-12T11:30:15.523Z',
        updated_at: '2020-03-12T11:30:15.523Z',
        canceled_at: null,
      },
      {
        id: 6,
        name: 'Caio Araujo Costa',
        avatar_id: '28929274-1584036755987.png',
        email: 'caio@armyspy.com',
        created_at: '2020-03-12T11:30:15.523Z',
        updated_at: '2020-03-12T11:30:15.523Z',
        canceled_at: null,
      },
      {
        id: 7,
        name: 'Thiago Correia Cunha',
        avatar_id: '28929274-1584036755988.png',
        email: 'thiago@armyspy.com',
        created_at: '2020-03-12T11:30:15.523Z',
        updated_at: '2020-03-12T11:30:15.523Z',
        canceled_at: null,
      },
      {
        id: 8,
        name: 'Cauã Oliveira Azevedo',
        avatar_id: '28929274-1584036755989.png',
        email: 'caua@armyspy.com',
        created_at: '2020-03-12T11:30:15.523Z',
        updated_at: '2020-03-12T11:30:15.523Z',
        canceled_at: null,
      },
      {
        id: 9,
        name: 'Julian Cunha Correia',
        avatar_id: '28929274-1584036755990.png',
        email: 'julian@armyspy.com',
        created_at: '2020-03-12T11:30:15.523Z',
        updated_at: '2020-03-12T11:30:15.523Z',
        canceled_at: null,
      },
      {
        id: 10,
        name: 'Pedro Castro Gomes',
        avatar_id: '28929274-1584036755991.png',
        email: 'pedro@armyspy.com',
        created_at: '2020-03-12T11:30:15.523Z',
        updated_at: '2020-03-12T11:30:15.523Z',
        canceled_at: null,
      },
      {
        id: 11,
        name: 'Diego Barros Cardoso',
        avatar_id: '28929274-1584036755992.png',
        email: 'diego@armyspy.com',
        created_at: '2020-03-12T11:30:15.523Z',
        updated_at: '2020-03-12T11:30:15.523Z',
        canceled_at: null,
      },
      {
        id: 12,
        name: 'Carlos Cardoso Martins',
        avatar_id: '28929274-1584036755993.png',
        email: 'carlos@armyspy.com',
        created_at: '2020-03-12T11:30:15.523Z',
        updated_at: '2020-03-12T11:30:15.523Z',
        canceled_at: null,
      },
      {
        id: 13,
        name: 'Gustavo Rocha Carvalho',
        avatar_id: '28929274-1584036755994.png',
        email: 'gustavo@armyspy.com',
        created_at: '2020-03-12T11:30:15.523Z',
        updated_at: '2020-03-12T11:30:15.523Z',
        canceled_at: null,
      },
    ],
    {},
  ).then(async () => QueryInterface.sequelize.query('ALTER SEQUENCE "deliverymen_id_seq" RESTART WITH 14')),

  down: (queryInterface, Sequelize) => { },
};
