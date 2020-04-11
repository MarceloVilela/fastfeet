import { Op } from 'sequelize';
import {
  startOfDay,
  endOfDay,
} from 'date-fns';
import Delivery from '../models/Delivery';

class CarriageInitController {
  async update(req, res) {
    const { delivery_id } = req.params;

    //
    // check existence
    const deliveryExists = await Delivery.findOne({ where: { id: delivery_id } });

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Encomenda não encontrada.' });
    }

    const now = new Date();

    //
    // deliveryman can only make 5 withdrawals per day
    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: deliveryExists.deliveryman_id,
        start_date: {
          [Op.between]: [startOfDay(now), endOfDay(now)],
        },
      },
    });

    if (deliveries.length === 5) {
      return res.status(400).json({ error: 'O entregador só pode fazer 5 retiradas por dia.' });
    }

    const returnUpdate = await Delivery.update(
      { start_date: now },
      { where: { id: delivery_id }, returning: true },
    );

    const [, [{
      id, deliveryman_id, recipient_id, product, start_date,
    }]] = returnUpdate;

    return res.json({
      id, deliveryman_id, recipient_id, product, start_date,
    });
  }
}

export default new CarriageInitController();
