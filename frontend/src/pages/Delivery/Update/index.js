import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import FormStudent from '../_Form';
import api from '~/services/api';
import { Container } from '../../../components';

export default function PlanUpdate({ match }) {
  const [plan, setPlan] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    async function loadPlan() {
      setLoading(true);
      try {
        const response = await api.get(`deliveries/${match.params.id}`);
        setPlan(response.data);
      } catch (error) {
        toast.error('Erro ao listar encomenda');
      }
      setLoading(false);
    }

    loadPlan();
  }, [match.params.id]);

  const handleSubmit = async ({ recipientId, deliverymanId, product }) => {
    setLoadingSubmit(true);
    try {
      await api.put(`deliveries/${match.params.id}`, { recipient_id: recipientId, deliveryman_id: deliverymanId, product });
      toast.success('Encomenda editado com sucesso');
    } catch (error) {
      toast.error('Erro ao editar encomenda');
    }
    setLoadingSubmit(false);
  };

  return (
    <Container loading={loading}>
      <FormStudent
        title="Edição de encomenda"
        initialData={plan}
        handleSubmit={handleSubmit}
        loadingSubmit={loadingSubmit}
      />
    </Container>
  );
}

PlanUpdate.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
