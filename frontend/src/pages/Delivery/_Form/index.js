import React, { useEffect, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import AsyncSelect from 'react-select/async';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { FieldGroupForm as Fieldset, FormLayout } from '../../../components';

import api from '~/services/api';

export default function RegistrationForm({
  title,
  initialData,
  handleSubmit,
  loadingSubmit,
  // registrationEdit,
}) {
  const [deliverymanId, setDeliverymanId] = useState('');
  const [recipientId, setRecipientId] = useState('');

  const [recipientDefault, setRecipientDefault] = useState('');
  const [deliverymanDefault, setDeliverymanDefault] = useState('');

  const handleDeliveryman = (selectedData) => {
    setDeliverymanId(selectedData.value);
  };

  const handleRecipient = (selectedData) => {
    setRecipientId(selectedData.value);
  };

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
      setRecipientId(recipient.id);

      setDeliverymanDefault(formatOptionDeliveryman(deliveryman));
      setDeliverymanId(deliveryman.id);
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

  const waitSelectDefaultValue = !initialData.recipient || (initialData.recipient && recipientDefault)

  return (
    <FormLayout>
      {waitSelectDefaultValue &&
        <Form initialData={initialData} onSubmit={handleSubmit} schema={schema}>
          <Fieldset title={title} back="/delivery" loading={loadingSubmit} />

          <div className="break-row">
            <section>
              <label htmlFor="recipient">
                Destinatário
              <AsyncSelect
                  name="recipient"
                  cacheOptions
                  defaultOptions
                  loadOptions={loadRecipientByName}
                  placeholder="Selecionar destinatário"
                  onChange={(selected) => handleRecipient(selected)}
                  defaultValue={recipientDefault}
                />
                <Input
                  name="recipientId"
                  type="hidden"
                  readOnly
                  value={recipientId}
                />
              </label>
            </section>

            <section>
              <label htmlFor="deliveryman">
                Entregador
              <AsyncSelect
                  name="deliveryman"
                  cacheOptions
                  defaultOptions
                  loadOptions={loadDeliverymenByName}
                  placeholder="Selecionar entregador"
                  onChange={(selected) => handleDeliveryman(selected)}
                  defaultValue={deliverymanDefault}
                />
                <Input
                  name="deliverymanId"
                  type="hidden"
                  readOnly
                  value={deliverymanId}
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
      }
    </FormLayout>
  );
}

RegistrationForm.propTypes = {
  title: PropTypes.string.isRequired,
  initialData: PropTypes.shape({
    student: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    plan: PropTypes.shape({
      id: PropTypes.number,
    }),
    product: PropTypes.string,
  }),
  handleSubmit: PropTypes.func.isRequired,
  loadingSubmit: PropTypes.bool.isRequired,
  // registrationEdit: PropTypes.bool,
};

RegistrationForm.defaultProps = {
  initialData: {},
  // registrationEdit: false,
};
