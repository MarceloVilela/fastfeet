import React, { useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { MdImage } from 'react-icons/md';
import PropTypes from 'prop-types';

import api from '~/services/api';
import {
  FieldGroupForm as Fieldset, FormLayout, ImageInput, Input,
} from '../../../components';
import formValidation from '../../../services/formValidation';

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
    email: Yup.string().email('Email inválido').required('Email inválido'),
    // avatar: Yup.object().shape({
    //  name: Yup.string().required(),
    // }),
    // avatar: Yup.object().shape({
    //  File: Yup.object().shape({
    //    name: Yup.string().required(),
    //  }).label('File'),
    // }),
    avatar: Yup.string().nullable(),
  });

  const formRef = useRef(null);

  return (
    <FormLayout>
      <Form
        initialData={initialData}
        /* onSubmit={(data, helpers) => validateBeforeSubmit(data, helpers)} */
        onSubmit={(data, helpers) => formValidation(data, helpers, schema, handleSubmit, formRef)}
        ref={formRef}
      >
        <Fieldset title={title} back="/entregador" loading={loadingSubmit} />

        <div>
          <label className="avatar">
            <ImageInput
              name="avatar"
            />
            {initialData.avatar_id
              && (
                <img
                  src={`${api.defaults.baseURL}/files/${initialData.avatar_id}`}
                  alt="Preview-Uploaded"
                />
              )}
            <MdImage />
            <span>Adicionar foto</span>
          </label>
        </div>


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
