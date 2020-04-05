import * as Yup from 'yup';
import { Op } from 'sequelize';
import Problem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

class DeliveryProblemController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      id, delivery_id, description,
    } = await Problem.create({
      delivery_id: req.params.delivery_id,
      description: req.body.description,
    });

    return res.json({
      id, delivery_id, description,
    });
  }

  async index(req, res) {
    const { page } = req.query;

    const options = {
      page,
      paginate: 10,
      order: [['id', 'ASC']],
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['id', 'product'],
          where: { canceled_at: null },
          required: false,
        },
      ],
    };

    const { docs, pages, total } = await Problem.paginate(options);

    return res.json({ docs, pages, total });
  }

  async show(req, res) {
    const { delivery_id } = req.params;

    const options = {
      where: { id: delivery_id },
      include: [
        {
          model: Problem,
          as: 'problems',
          attributes: ['id', 'description', 'created_at'],
          required: false,
        },
      ],
    };

    const delivery = await Delivery.findOne(options);

    return res.json(delivery);
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

  async delete(req, res) {
    const problem = await Problem.findByPk(req.params.problem_id);
    if (!problem) {
      return res.status(400).json({ error: 'Problem not found.' });
    }

    const delivery = await Delivery.findByPk(problem.delivery_id);

    delivery.canceled_at = new Date();
    await delivery.save();

    return res.json(delivery);
  }
}

export default new DeliveryProblemController();
