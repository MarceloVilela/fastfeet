import * as Yup from 'yup';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

import DeliveryMail from '../jobs/DeliveryMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      id, recipient_id, deliveryman_id, product,
    } = await Delivery.create({
      recipient_id: req.body.recipient_id,
      deliveryman_id: req.body.deliveryman_id,
      product: req.body.product,
    });

    const delivery = await Delivery.findByPk(id, {
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name', 'city', 'state'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    console.log(delivery, delivery.deliveryman);
    await Queue.add(
      DeliveryMail.key,
      { delivery },
    );

    return res.json({
      id, recipient_id, deliveryman_id, product,
    });
  }

  async index(req, res) {
    const { page, q } = req.query;
    const where = q ? { product: { [Op.iLike]: `%${q}%` }, canceled_at: null } : { canceled_at: null };

    const options = {
      page,
      paginate: 10,
      order: [['id', 'ASC']],
      where,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name', 'city', 'state'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
      ],
    };

    const { docs, pages, total } = await Delivery.paginate(options);

    return res.json({ docs, pages, total });
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const delivery = await Delivery.findOne({
      where: { id },
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name', 'street', 'number', 'city', 'state', 'zip_code'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
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

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    delivery.canceled_at = new Date();
    await delivery.save();

    return res.json(delivery);
  }
}

export default new DeliveryController();
