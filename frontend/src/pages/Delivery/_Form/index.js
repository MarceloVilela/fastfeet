import React, { useEffect, useState } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import {
  SelectAsync, FieldGroupForm as Fieldset, FormLayout, Input,
} from '../../../components';

import api from '~/services/api';

export default function DeliveryForm({
  title,
  initialData,
  handleSubmit,
  loadingSubmit,
  // registrationEdit,
}) {
  const [recipientDefault, setRecipientDefault] = useState('');
  const [deliverymanDefault, setDeliverymanDefault] = useState('');

  const formatOptionRecipient = (opt) => ({
    value: opt.id,
    label: `${opt.name} / ${opt.street}, ${opt.number}, ${opt.city} - ${opt.state}`,
  });

  const formatOptionDeliveryman = (opt) => ({
    value: opt.id,
    label: `${opt.name} / ${opt.email}`,
  });

  /*
   * Defines states based on initial data
   */
  useEffect(() => {
    const {
      recipient, deliveryman,
    } = initialData;

    if (recipient) {
      setRecipientDefault(formatOptionRecipient(recipient));
      setDeliverymanDefault(formatOptionDeliveryman(deliveryman));
    }
  }, [initialData]);

  /*
   * Requests
   */

  // Fetch for the recipient by name using the async method of the React Select library.
  const loadRecipientByName = async (inputValue) => {
    try {
      const {
        data: { docs },
      } = await api.get(`recipients?q=${inputValue}&page=1`);
      const options = docs.map((item) => formatOptionRecipient(item));
      return options;
    } catch (error) {
      toast.error('Erro ao listar destinatários');
    }
  };

  // Fetch for the deliverman by name using the async method of the React Select library.
  const loadDeliverymenByName = async (inputValue) => {
    try {
      const {
        data: { docs },
      } = await api.get(`deliverymen?q=${inputValue}&page=1`);
      const options = docs.map((item) => formatOptionDeliveryman(item));
      return options;
    } catch (error) {
      toast.error('Erro ao listar entregadores');
    }
  };

  const schema = Yup.object().shape({
    recipientId: Yup.number().required('Entregador inválido'),
    deliverymanId: Yup.number().required('Entregador inválido'),
    product: Yup.string()
      .min(7, 'Nome precisa de ao menos 7 caracteres')
      .required('Preencha este campo'),
  });

  return (
    <FormLayout>
      <Form initialData={initialData} onSubmit={handleSubmit} schema={schema}>
        <Fieldset title={title} back="/encomenda" loading={loadingSubmit} />

        <div className="break-row">
          <section>
            <label htmlFor="recipient">
              Destinatário
              <SelectAsync
                name="recipientId"
                cacheOptions
                defaultOptions
                loadOptions={loadRecipientByName}
                placeholder="Selecionar destinatário"
                defaultValue={recipientDefault}
                initial={!!initialData.recipient}
              />
            </label>
          </section>

          <section>
            <label htmlFor="deliveryman">
              Entregador
              <SelectAsync
                name="deliverymanId"
                cacheOptions
                defaultOptions
                loadOptions={loadDeliverymenByName}
                placeholder="Selecionar entregador"
                defaultValue={deliverymanDefault}
                initial={!!initialData.recipient}
              />
            </label>
          </section>
        </div>

        <div>
          <section>
            <label htmlFor="product">
              Nome do produto
              <Input name="product" type="text" id="product" required />
            </label>
          </section>
        </div>
      </Form>
    </FormLayout>
  );
}

DeliveryForm.propTypes = {
  title: PropTypes.string.isRequired,
  initialData: PropTypes.shape({
    recipient: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      street: PropTypes.string,
      number: PropTypes.number,
      city: PropTypes.string,
      state: PropTypes.string,
    }),
    deliveryman: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
    }),
    product: PropTypes.string,
  }),
  handleSubmit: PropTypes.func.isRequired,
  loadingSubmit: PropTypes.bool.isRequired,
  // registrationEdit: PropTypes.bool,
};

DeliveryForm.defaultProps = {
  initialData: {},
  // registrationEdit: false,
};
