import Sequelize, { Model } from 'sequelize';
import sequelizePaginate from 'sequelize-paginate';
//import { differenceInCalendarYears } from 'date-fns';

class deliverymen extends Model {
  static init(sequelize) {
    sequelize.define('deliverymen', {
      freezeTableName: true
    })
    super.init(
      {
        name: Sequelize.STRING,
        avatar_id: Sequelize.STRING,
        email: Sequelize.STRING,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
        freezeTableName: true
      },
    );

    sequelizePaginate.paginate(this);

    return this;
  }

  static associate(models) {
    this.hasMany(models.deliveries, { foreignKey: 'deliveryman_id', as: 'deliveryman' });
  }
}

export default deliverymen;
