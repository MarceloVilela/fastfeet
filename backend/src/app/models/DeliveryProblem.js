import Sequelize, { Model } from 'sequelize';
import sequelizePaginate from 'sequelize-paginate';
//import { differenceInCalendarYears } from 'date-fns';

class DeliveryProblem extends Model {
  static init(sequelize) {
    sequelize.define('deliveries', {
      freezeTableName: true
    })

    super.init(
      {
        delivery_id: Sequelize.INTEGER,
        description: Sequelize.STRING,
      },
      {
        sequelize,
        //freezeTableName: true
      },
    );

    sequelizePaginate.paginate(this);

    return this;
  }

  static associate(models) {
    this.belongsTo(models.deliveries, { foreignKey: 'delivery_id', as: 'delivery' });
  }
}

export default DeliveryProblem;
