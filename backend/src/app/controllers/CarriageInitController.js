import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
//import Registration from '../models/Registration';

class CarriageInitController {
  async update(req, res) {
    const {delivery_id} = req.params;

    const deliveryExists = await Delivery.findOne({ where: { id: delivery_id } });

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery not found.' });
    }

    const now = new Date();

    const returnUpdate = await Delivery.update(
      { start_date: now },
      { where: { id: delivery_id }, returning: true },
    );

    const [, [{
      id, deliveryman_id, recipient_id, product, start_date
    }]] = returnUpdate;

    return res.json({
      id, deliveryman_id, recipient_id, product, start_date
    });
  }
}

export default new CarriageInitController();
