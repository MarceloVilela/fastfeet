module.exports = {
  up: (QueryInterface) => QueryInterface.bulkInsert(
    'deliveries',
    [
      {
        id: 1,
        recipient_id: 2,
        deliveryman_id: 7,
        signature_id: 'delivery-1-confirm-1586129902709.jpg',
        product: 'SSD 128GB',
        canceled_at: null,
        start_date: '2020-04-05T09:16:58.850Z',
        end_date: '2020-04-05T23:38:25.471Z',
        created_at: '2020-03-05T18:16:58.850Z',
        updated_at: '2020-04-05T23:38:25.473Z',
      },
      {
        id: 2,
        recipient_id: 2,
        deliveryman_id: 1,
        signature_id: 'delivery-2-confirm-1585939629272.jpg',
        product: 'Teclado Wireless',
        canceled_at: null,
        start_date: '2020-04-02T12:47:12.084Z',
        end_date: '2020-04-03T18:47:12.084Z',
        created_at: '2020-03-12T15:54:41.100Z',
        updated_at: '2020-04-03T18:47:12.084Z',
      },
      {
        id: 3,
        recipient_id: 3,
        deliveryman_id: 8,
        signature_id: null,
        product: 'TV Led 50',
        canceled_at: '2020-04-11T19:56:44.452Z',
        start_date: '2020-03-18T10:27:34.405Z',
        end_date: null,
        created_at: '2020-03-17T19:27:34.405Z',
        updated_at: '2020-04-11T19:56:44.453Z',
      },
      {
        id: 4,
        recipient_id: 4,
        deliveryman_id: 1,
        signature_id: 'delivery-4-confirm-1585940243620.jpg',
        product: 'Motorola G6',
        canceled_at: null,
        start_date: '2020-04-02T12:47:12.084Z',
        end_date: '2020-04-03T18:57:27.323Z',
        created_at: '2020-03-17T19:28:10.708Z',
        updated_at: '2020-04-03T18:57:27.323Z',
      },
      {
        id: 5,
        recipient_id: 5,
        deliveryman_id: 9,
        signature_id: 'delivery-5-confirm-1586089372459.jpg',
        product: 'HD Externo 2TB',
        canceled_at: null,
        start_date: '2020-04-02T12:47:12.084Z',
        end_date: '2020-04-05T12:22:55.331Z',
        created_at: '2020-03-17T19:35:02.284Z',
        updated_at: '2020-04-06T19:58:29.365Z',
      },
      {
        id: 6,
        recipient_id: 6,
        deliveryman_id: 1,
        signature_id: 'delivery-6-confirm-1585940829001.jpg',
        product: 'Fone HyperX',
        canceled_at: null,
        start_date: '2020-04-02T12:47:12.084Z',
        end_date: '2020-04-03T19:07:12.339Z',
        created_at: '2020-03-17T19:36:34.176Z',
        updated_at: '2020-04-03T19:07:12.339Z',
      },
      {
        id: 7,
        recipient_id: 2,
        deliveryman_id: 10,
        signature_id: null,
        product: 'Cadeira de Praia',
        canceled_at: '2020-04-06T19:59:12.317Z',
        start_date: '2020-03-18T10:28:45.405Z',
        end_date: null,
        created_at: '2020-03-17T19:38:45.366Z',
        updated_at: '2020-04-06T19:59:12.317Z',
      },
      {
        id: 8,
        recipient_id: 2,
        deliveryman_id: 1,
        signature_id: null,
        product: 'Sofa Reclinável',
        canceled_at: null,
        start_date: '2020-04-11T17:22:20.140Z',
        end_date: null,
        created_at: '2020-03-17T19:39:02.730Z',
        updated_at: '2020-04-11T17:22:20.140Z',
      },
      {
        id: 9,
        recipient_id: 3,
        deliveryman_id: 11,
        signature_id: null,
        product: 'Pen Drive 32GB',
        canceled_at: null,
        start_date: '2020-04-11T18:16:52.611Z',
        end_date: null,
        created_at: '2020-03-17T19:39:25.160Z',
        updated_at: '2020-04-11T18:16:52.758Z',
      },
      {
        id: 10,
        recipient_id: 4,
        deliveryman_id: 1,
        signature_id: null,
        product: 'Notebook Samsuns X20',
        canceled_at: null,
        start_date: '2020-04-11T18:17:00.081Z',
        end_date: null,
        created_at: '2020-03-17T19:40:52.698Z',
        updated_at: '2020-04-11T18:17:00.220Z',
      },
      {
        id: 11,
        recipient_id: 5,
        deliveryman_id: 12,
        signature_id: null,
        product: 'Modem TPLink',
        canceled_at: null,
        start_date: '2020-04-11T18:18:06.417Z',
        end_date: null,
        created_at: '2020-03-17T19:47:08.594Z',
        updated_at: '2020-04-11T18:18:06.558Z',
      },
      {
        id: 12,
        recipient_id: 6,
        deliveryman_id: 1,
        signature_id: null,
        product: 'Filtro de Linha 3 Tomadas',
        canceled_at: null,
        start_date: '2020-04-11T18:18:19.739Z',
        end_date: null,
        created_at: '2020-03-17T19:51:56.343Z',
        updated_at: '2020-04-11T18:18:19.887Z',
      },
      {
        id: 13,
        recipient_id: 2,
        deliveryman_id: 13,
        signature_id: null,
        product: 'Carregador USB V8',
        canceled_at: null,
        start_date: null,
        end_date: null,
        created_at: '2020-03-17T19:53:38.832Z',
        updated_at: '2020-04-11T18:19:05.997Z',
      },
      {
        id: 14,
        recipient_id: 2,
        deliveryman_id: 1,
        signature_id: null,
        product: 'Suporte para Notebook',
        canceled_at: null,
        start_date: null,
        end_date: null,
        created_at: '2020-03-17T19:53:52.436Z',
        updated_at: '2020-03-17T19:53:52.436Z',
      },
      {
        id: 15,
        recipient_id: 3,
        deliveryman_id: 7,
        signature_id: null,
        product: 'Cabo HDMI 2.0 3M',
        canceled_at: null,
        start_date: null,
        end_date: null,
        created_at: '2020-04-10T12:53:55.183Z',
        updated_at: '2020-03-17T19:55:19.215Z',
      },
      {
        id: 16,
        recipient_id: 4,
        deliveryman_id: 1,
        signature_id: null,
        product: 'Memória 8GB DDR4',
        canceled_at: null,
        start_date: null,
        end_date: null,
        created_at: '2020-04-11T12:53:55.183Z',
        updated_at: '2020-03-17T20:00:30.342Z',
      },
      {
        id: 17,
        recipient_id: 5,
        deliveryman_id: 8,
        signature_id: null,
        product: 'Tênis Mood Bend',
        canceled_at: null,
        start_date: null,
        end_date: null,
        created_at: '2020-04-11T12:53:55.183Z',
        updated_at: '2020-03-17T20:01:22.550Z',
      },
      {
        id: 18,
        recipient_id: 6,
        deliveryman_id: 1,
        signature_id: null,
        product: 'Samsung S10',
        canceled_at: null,
        start_date: null,
        end_date: null,
        created_at: '2020-04-11T12:53:55.183Z',
        updated_at: '2020-03-17T20:08:59.978Z',
      },
      {
        id: 19,
        recipient_id: 2,
        deliveryman_id: 9,
        signature_id: null,
        product: 'Iphone 8',
        canceled_at: null,
        start_date: null,
        end_date: null,
        created_at: '2020-04-11T12:53:55.183Z',
        updated_at: '2020-03-17T20:14:28.515Z',
      },
      {
        id: 20,
        recipient_id: 2,
        deliveryman_id: 1,
        signature_id: null,
        product: 'Mouse Logitech GPRO',
        canceled_at: null,
        start_date: null,
        end_date: null,
        created_at: '2020-04-11T12:53:55.183Z',
        updated_at: '2020-04-11T12:53:55.183Z',
      },
      {
        id: 21,
        recipient_id: 3,
        deliveryman_id: 10,
        signature_id: null,
        product: 'Meia Lupo Walk',
        canceled_at: null,
        start_date: null,
        end_date: null,
        created_at: '2020-04-11T12:54:43.288Z',
        updated_at: '2020-04-11T12:54:43.288Z',
      },
      {
        id: 22,
        recipient_id: 4,
        deliveryman_id: 1,
        signature_id: null,
        product: 'Balança Digital Cozinha alta precisão',
        canceled_at: null,
        start_date: null,
        end_date: null,
        created_at: '2020-04-11T20:22:31.859Z',
        updated_at: '2020-04-11T20:22:31.859Z',
      },
      {
        id: 23,
        recipient_id: 5,
        deliveryman_id: 11,
        signature_id: null,
        product: 'Liquidificador turbo premium',
        canceled_at: null,
        start_date: null,
        end_date: null,
        created_at: '2020-04-11T20:22:58.583Z',
        updated_at: '2020-04-11T20:22:58.583Z',
      },
      {
        id: 24,
        recipient_id: 6,
        deliveryman_id: 1,
        signature_id: null,
        product: 'Secador Italy Titan',
        canceled_at: null,
        start_date: null,
        end_date: null,
        created_at: '2020-04-11T20:23:09.657Z',
        updated_at: '2020-04-11T20:23:09.657Z',
      },
      {
        id: 25,
        recipient_id: 2,
        deliveryman_id: 12,
        signature_id: null,
        product: 'Iphone 11 64GB',
        canceled_at: null,
        start_date: null,
        end_date: null,
        created_at: '2020-04-11T20:24:34.421Z',
        updated_at: '2020-04-11T20:24:34.421Z',
      },
      {
        id: 26,
        recipient_id: 2,
        deliveryman_id: 13,
        signature_id: null,
        product: 'Monitor Dell 19',
        canceled_at: null,
        start_date: null,
        end_date: null,
        created_at: '2020-04-11T20:25:12.180Z',
        updated_at: '2020-04-11T20:25:12.180Z',
      },
      {
        id: 27,
        recipient_id: 3,
        deliveryman_id: 1,
        signature_id: null,
        product: 'Pipoqueira Popflix',
        canceled_at: null,
        start_date: null,
        end_date: null,
        created_at: '2020-04-11T20:25:59.835Z',
        updated_at: '2020-04-11T20:25:59.835Z',
      },
      {
        id: 28,
        recipient_id: 4,
        deliveryman_id: 7,
        signature_id: null,
        product: 'Enxaguatório Bucal Anti Cáries',
        canceled_at: null,
        start_date: null,
        end_date: null,
        created_at: '2020-04-11T20:26:59.207Z',
        updated_at: '2020-04-11T20:26:59.207Z',
      },
    ],
    {},
  ).then(async () => QueryInterface.sequelize.query('ALTER SEQUENCE "deliveries_id_seq" RESTART WITH 29')),

  down: (queryInterface, Sequelize) => { },
};
