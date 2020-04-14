import * as Yup from 'yup';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
// import Registration from '../models/Registration';

class CarriageController {
  async index(req, res) {
    const { page } = req.query;
    const { filter = 'not_delivered' } = req.query;
    const { deliveryman_id } = req.params;

    let where = { deliveryman_id };
    if (filter === 'not_delivered') {
      // return deliveries assigned to the deliveryman, which are not delivered or canceled
      where = { ...where, end_date: null, canceled_at: null };
    } else {
      // return deliveries assigned to the deliveryman, which have already been delivered
      where = { ...where, end_date: { [Op.not]: null } };
    }

    const options = {
      page,
      paginate: 10,
      order: [['id', 'ASC']],
      where,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          // attributes: ['id', 'plan_id'],
          // where: { canceled_at: null },
          required: false,
        },
      ],
    };

    const { docs, pages, total } = await Delivery.paginate(options);

    return res.json({ docs, pages, total });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryExists = await Delivery.findOne({ where: { id: req.params.id } });

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery not found.' });
    }

    const returnUpdate = await Delivery.update(
      { ...req.body, avatar_id: 'zaq1' },
      { where: { id: req.params.id }, returning: true },
    );

    const [, [{
      id, name, email, avatar_id,
    }]] = returnUpdate;

    return res.json({
      id, name, email, avatar_id,
    });
  }
}

export default new CarriageController();
