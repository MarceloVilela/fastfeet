import Sequelize from 'sequelize';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Deliveryman from '../app/models/Deliveryman';
import deliveries from '../app/models/Delivery';
import DeliveryProblem from '../app/models/DeliveryProblem';
/* import Plan from '../app/models/Plan';
import Registration from '../app/models/Registration';
import Checkin from '../app/models/Checkin';
import HelpOrder from '../app/models/HelpOrder';
*/

import databaseConfig from '../config/database';

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  console.log('===>config', JSON.stringify({
    NODE_ENV: process.env.NODE_ENV,
    databaseConfig,
  }, null, 2));
}

const models = [
  User,
  deliveries,
  Recipient,
  Deliveryman,
  DeliveryProblem,
  /* Plan,
  Registration,
  Checkin,
  HelpOrder */
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
