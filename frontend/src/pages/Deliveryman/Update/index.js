import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import FormRegistration from '../_Form';
import api from '~/services/api';
import { Container } from '../../../components';

export default function RegistrationUpdate({ match }) {
  const [registration, setRegistration] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  async function loadRegistration(id) {
    setLoading(true);
    try {
      const { data } = await api.get(`deliverymen/${id}`);
      setRegistration(data);
    } catch (error) {
      toast.error('Erro ao listar entregador');
    }
    setLoading(false);
  }

  useEffect(() => {
    loadRegistration(match.params.id);
  }, [match.params.id]);

  const handleSubmit = async ({ name, email }) => {
    setLoadingSubmit(true);
    try {
      await api.put(`deliverymen/${match.params.id}`, { name, email });
      toast.success('Entregador editado com sucesso');
    } catch (error) {
      toast.error('Erro ao editar entregador');
    }
    setLoadingSubmit(false);
  };

  return (
    <Container loading={loading}>
      <FormRegistration
        title="Edição de entregador"
        initialData={loading ? {} : registration}
        handleSubmit={handleSubmit}
        loadingSubmit={loadingSubmit}
      />
    </Container>
  );
}

RegistrationUpdate.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
