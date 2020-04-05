import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class DeliveryMail {
  get key() {
    return 'DeliveryMail';
  }

  async handle({ data }) {
    const { delivery } = data;
    console.log('sendmail');
    console.log(`${delivery.deliveryman.name} <${delivery.deliveryman.email}>`);
    const {
      street, number, city, state, zip_code,
    } = delivery.recipient;
    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Detalhes da encomenda na FastFeet',
      template: 'delivery',
      context: {
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

export default new DeliveryMail();
