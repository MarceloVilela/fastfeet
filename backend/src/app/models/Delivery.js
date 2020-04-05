import Sequelize, { Model } from 'sequelize';
import sequelizePaginate from 'sequelize-paginate';
// import { differenceInCalendarYears } from 'date-fns';

class deliveries extends Model {
  static init(sequelize) {
    sequelize.define('deliveries', {
      freezeTableName: true,
    });

    super.init(
      {
        deliveryman_id: Sequelize.INTEGER,
        recipient_id: Sequelize.INTEGER,
        signature_id: Sequelize.STRING,
        product: Sequelize.STRING,

        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,

        status: {
          type: Sequelize.VIRTUAL,
          get() {
            let value = 'pending';

            if (this.end_date) {
              value = 'delivered';
            } else if (this.canceled_at) {
              value = 'canceled';
            } else if (this.start_date) {
              value = 'withdrawal';
            }

            return value;
          },
        },
      },
      {
        sequelize,
        freezeTableName: true,
      },
    );

    sequelizePaginate.paginate(this);

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipient, { foreignKey: 'recipient_id', as: 'recipient' });
    this.belongsTo(models.deliverymen, { foreignKey: 'deliveryman_id', as: 'deliveryman' });
    this.hasMany(models.DeliveryProblem, { foreignKey: 'delivery_id', as: 'problems' });
  }
}

export default deliveries;
