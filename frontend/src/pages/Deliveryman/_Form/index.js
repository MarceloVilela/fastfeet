import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { FieldGroupForm as Fieldset, FormLayout } from '../../../components';

export default function RegistrationForm({
  title,
  initialData,
  handleSubmit,
  loadingSubmit,
}) {
  const schema = Yup.object().shape({
    name: Yup.string()
      .min(7, 'Nome precisa de ao menos 7 caracteres')
      .required('Preencha este campo'),
    email: Yup.string().email().required('Email inválido'),
  });

  return (
    <FormLayout>
      <Form initialData={initialData} onSubmit={handleSubmit} schema={schema}>
        <Fieldset title={title} back="/deliverymen" loading={loadingSubmit} />

        <div className="break-row">
          <section>
            <label htmlFor="name">
              Nome
              <Input name="name" type="text" id="name" required />
            </label>
          </section>

          <section>
            <label htmlFor="email">
              Email
              <Input name="email" type="email" id="email" required />
            </label>
          </section>
        </div>

      </Form>
    </FormLayout>
  );
}

RegistrationForm.propTypes = {
  title: PropTypes.string.isRequired,
  initialData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  handleSubmit: PropTypes.func.isRequired,
  loadingSubmit: PropTypes.bool.isRequired,
};

RegistrationForm.defaultProps = {
  initialData: {},
};
