import { Op } from 'sequelize';
import {
  startOfDay,
  endOfDay,
  subHours,
  isBefore,
  isAfter,
  setHours,
  setMinutes,
  setSeconds,
} from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
import Delivery from '../models/Delivery';

class CarriageInitController {
  async update(req, res) {
    const { delivery_id } = req.params;

    //
    // check - Withdrawals can only be made between 08:00 and 18:00
    const date = new Date();

    // const timeZone = 'America/Sao_Paulo';
    const timeZone = 'America/Denver';

    const now = utcToZonedTime(date, timeZone);
    const min = utcToZonedTime(setSeconds(setMinutes(setHours(now, 8), 0), 0), timeZone);
    const max = utcToZonedTime(setSeconds(setMinutes(setHours(now, 18), 0), 0), timeZone);

    if (isBefore(min, now) || isAfter(max, now)) {
      return res.status(400).json({
        error: 'Retiradas só podem ser feitas entre as 08:00 e 18:00h',
      });
    }

    //
    // check existence
    const deliveryExists = await Delivery.findOne({ where: { id: delivery_id } });

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Encomenda não encontrada.' });
    }

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
