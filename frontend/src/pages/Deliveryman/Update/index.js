import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import FormDeliveryman from '../_Form';
import api from '~/services/api';
import { Container } from '../../../components';

export default function DeliverymanUpdate({ match }) {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  async function loadItem(id) {
    setLoading(true);
    try {
      const { data } = await api.get(`deliverymen/${id}`);
      setItem(data);
    } catch (error) {
      toast.error('Erro ao listar entregador');
    }
    setLoading(false);
  }

  useEffect(() => {
    loadItem(match.params.id);
  }, [match.params.id]);

  const handleSubmit = async (form) => {
    const formData = new FormData();

    formData.append('file', form.avatar);
    formData.append('name', form.name);
    formData.append('email', form.email);

    setLoadingSubmit(true);
    try {
      await api.put(`deliverymen/${match.params.id}`, formData);
      toast.success('Entregador editado com sucesso');
    } catch (error) {
      toast.error('Erro ao editar entregador');
    }
    setLoadingSubmit(false);
  };

  return (
    <Container loading={loading}>
      <FormDeliveryman
        title="Edição de entregador"
        initialData={loading ? {} : item}
        handleSubmit={handleSubmit}
        loadingSubmit={loadingSubmit}
      />
    </Container>
  );
}

DeliverymanUpdate.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
