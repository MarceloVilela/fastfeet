import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';

class IdentifierController {
  async show(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const options = {
      where: { id, canceled_at: null },
    };

    const deliveryman = await Deliveryman.findOne(options);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Entregador não encontrado' });
    }

    if (deliveryman) {
      return res.json(deliveryman);
    }

    // Although the student is registered on the platform,
    // this does not mean that the student has an active registration and can access the gym.
    return res.status(400).json({ error: 'Sem matrícula ativa' });
  }
}

export default new IdentifierController();
