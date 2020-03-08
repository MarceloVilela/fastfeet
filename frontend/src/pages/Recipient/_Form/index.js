import React /* , { useState, useEffect } */ from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
// import { differenceInCalendarYears, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import { FieldGroupForm as Fieldset, FormLayout } from '../../../components';

export default function StudentForm({
  title,
  initialData,
  handleSubmit,
  loadingSubmit,
}) {
  /* const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip_code, setZip_code] = useState(''); */

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(7, 'Nome precisa de ao menos 7 caracteres')
      .required('Preencha este campo'),
    street: Yup.string()
      .min(7, 'Rua precisa de ao menos 5 caracteres')
      .required('Preencha este campo'),
    number: Yup.string()
      .min(1, 'Número precisa estar entre 1 e 9999')
      .max(9999, 'Número precisa estar entre 1 e 9999')
      .required('Preencha este campo'),
    complement: Yup.string()
      .min(4, 'Complemento precisa de ao menos 4 caracteres')
      .required('Preencha este campo'),
    city: Yup.string()
      .min(7, 'Cidade precisa de ao menos 5 caracteres')
      .required('Preencha este campo'),
    state: Yup.string()
      .min(7, 'Estado precisa de ao menos 5 caracteres')
      .required('Preencha este campo'),
    zip_code: Yup.string()
      .min(7, 'CEP precisa de ao menos 9 caracteres')
      .required('Preencha este campo'),
  });

  return (
    <FormLayout>
      <Form initialData={initialData} onSubmit={handleSubmit} schema={schema}>
        <Fieldset title={title} back="/recipient" loading={loadingSubmit} />

        <div>
          <section>
            <label htmlFor="name">
              Nome
              <Input name="name" type="text" id="name" required />
            </label>
          </section>
        </div>

        <div className="break-row">
          <section>
            <label htmlFor="street">
              Rua
              <Input name="street" type="text" id="street" required />
            </label>
          </section>

          <section>
            <label htmlFor="number">
              Número
              <Input name="number" type="text" id="number" required />
            </label>
          </section>

          <section>
            <label htmlFor="complement">
              Complemento
              <Input name="complement" type="text" id="complement" required />
            </label>
          </section>
        </div>

        <div className="break-row">
          <section>
            <label htmlFor="city">
              Cidade
              <Input name="city" type="text" id="city" required />
            </label>
          </section>

          <section>
            <label htmlFor="state">
              Estado
              <Input name="state" type="text" id="state" required />
            </label>
          </section>

          <section>
            <label htmlFor="zip_code">
              CEP
              <Input name="zip_code" type="text" id="zip_code" required />
            </label>
          </section>
        </div>
      </Form>
    </FormLayout>
  );
}

StudentForm.propTypes = {
  title: PropTypes.string.isRequired,
  initialData: PropTypes.shape({
    name: PropTypes.string,
    street: PropTypes.string,
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    complement: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip_code: PropTypes.string,
  }),
  handleSubmit: PropTypes.func.isRequired,
  loadingSubmit: PropTypes.bool.isRequired,
};

StudentForm.defaultProps = {
  initialData: {},
};
