import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';
// import Registration from '../models/Registration';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipientExists = await Recipient.findOne({
      where: {
        name: req.body.name,
        zip_code: req.body.zip_code,
        number: req.body.number,
      },
    });

    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already exists.' });
    }

    const {
      id, name, number, complement, state, city, zip_code,
    } = await Recipient.create(req.body);

    return res.json({
      id, name, number, complement, state, city, zip_code,
    });
  }

  async index(req, res) {
    const { page, q } = req.query;
    const where = q ? { name: { [Op.iLike]: `%${q}%` }, canceled_at: null } : { /* canceled_at: null */ };

    const options = {
      page,
      paginate: 10,
      order: [['id', 'ASC']],
      where,
    };

    const { docs, pages, total } = await Recipient.paginate(options);

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
    const recipient = await Recipient.findOne({ where: { id } });

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails==' });
    }

    const RecipientExists = await Recipient.findOne({ where: { id: req.params.id } });

    if (!RecipientExists) {
      return res.status(400).json({ error: 'Recipient not found.' });
    }

    const returnUpdate = await Recipient.update(
      req.body,
      { where: { id: req.params.id }, returning: true },
    );

    const [, [{
      id, name, email, age, weight, height,
    }]] = returnUpdate;

    return res.json({
      id, name, email, age, weight, height,
    });
  }

  async delete(req, res) {
    const Recipient = await Recipient.findByPk(req.params.id);

    Recipient.canceled_at = new Date();
    await Recipient.save();

    return res.json(Recipient);
  }
}

export default new RecipientController();
