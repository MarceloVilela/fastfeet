import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancelMail {
  get key() {
    return 'CancelMail';
  }

  async handle({ data }) {
    const { delivery } = data;

    const {
      street, number, city, state, zip_code,
    } = delivery.recipient;
    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Cancelamento da encomenda na FastFeet',
      template: 'cancel',
      context: {
        id: delivery.id,
        deliveryman: delivery.deliveryman.name,
        recipient: delivery.recipient.name,
        address: `${street}, ${number}, ${city} - ${state}, ${zip_code}`,
        product: delivery.product,
        date: format(parseISO(delivery.createdAt), "'dia' dd 'de' MMMM', às ' H:mm:'h'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new CancelMail();
