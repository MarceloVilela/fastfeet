import Sequelize, { Model } from 'sequelize';
import sequelizePaginate from 'sequelize-paginate';
// import { differenceInCalendarYears } from 'date-fns';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.INTEGER,
        complement: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        zip_code: Sequelize.INTEGER,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      },
    );

    sequelizePaginate.paginate(this);

    return this;
  }

  static associate(models) {
    this.hasMany(models.deliveries, { foreignKey: 'recipient_id', as: 'recipient' });
  }
}

export default Recipient;
