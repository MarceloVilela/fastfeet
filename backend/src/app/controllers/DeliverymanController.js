import * as Yup from 'yup';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
//import Registration from '../models/Registration';

class DeliverymanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const DeliverymanExists = await Deliveryman.findOne({ where: { 
      email: req.body.email
    } });

    if (DeliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman already exists.' });
    }

    const {
      id, name, email, avatar_id
    } = await Deliveryman.create({...req.body, avatar_id: 'zaq1'});

    return res.json({
      id, name, email, avatar_id
    });
  }

  async index(req, res) {
    const { page, q } = req.query;
    const where = q ? { name: { [Op.iLike]: `%${q}%` }, canceled_at: null } : { canceled_at: null };

    const options = {
      page,
      paginate: 10,
      order: [['id', 'ASC']],
      where,
      /*include: [
        {
          model: Registration,
          as: 'registration',
          attributes: ['id', 'plan_id'],
          where: { canceled_at: null },
          required: false,
        },
      ],*/
    };

    const { docs, pages, total } = await Deliveryman.paginate(options);

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
    const Deliveryman = await Deliveryman.findOne({ where: { id } });

    if (!Deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    return res.json(Deliveryman);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const DeliverymanExists = await Deliveryman.findOne({ where: { id: req.params.id } });

    if (!DeliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman not found.' });
    }

    const returnUpdate = await Deliveryman.update(
      {...req.body, avatar_id: 'zaq1'},
      { where: { id: req.params.id }, returning: true },
    );

    const [, [{
      id, name, email, avatar_id
    }]] = returnUpdate;

    return res.json({
      id, name, email, avatar_id
    });
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    deliveryman.canceled_at = new Date();
    await deliveryman.save();

    return res.json(deliveryman);
  }
}

export default new DeliverymanController();
