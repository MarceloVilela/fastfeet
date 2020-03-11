import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import {
  Container, FieldGroupList, List, Modal, Options, Pagination,
} from '../../../components';
import DeliveryPreview from '../Preview';

export default function Profile() {
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [loading, setLoading] = useState(true);

  const [currentHelp, setCurrentHelp] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const formatPlan = (data) => {
    let status = { description: 'PENDENTE', color: 'yellow' }

    if (data.start_date) {
      status = { description: 'RETIRADA', color: 'yellow' };
    } else if (data.end_date) {
      status = { description: 'ENTREGUE', color: 'yellow' };
    } else if (data.canceled_at) {
      status = { description: 'CANCELADA', color: 'yellow' };
    }
    return {
      ...data,
      status
    }
  };

  const loadPlans = useCallback(async () => {
    setLoading(true);
    try {
      const {
        data: { docs, pages },
      } = await api.get(`deliveries?page=${page}`);

      setPageTotal(pages);

      const plansFormatted = docs.map((plan) => formatPlan(plan));
      setPlans(plansFormatted);
    } catch (error) {
      toast.error('Erro ao listar encomendas');
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    loadPlans();
  }, [page, loadPlans]);

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Tem certeza que deseja apagar encomenda?')) {
      setLoading(true);
      try {
        await api.delete(`plans/${id}`);
        toast.success('Encomenda apagada com sucesso');
        loadPlans();
      } catch (error) {
        toast.error('Erro ao apagar encomenda');
      }
      setLoading(false);
    }
  };

  const handleDelivery = (item) => {
    setCurrentHelp(item);
    setOpenModal(true);
  };

  const handlePropagatesClose = () => {
    setOpenModal(false);
  };

  return (
    <Container loading={loading}>
      <FieldGroupList
        title="Gerenciando encomendas"
        location="/delivery.new"
        handleChange={() => { }}
        inputPlaceholder="Buscar por encomendas"
      />

      <List>
        <li>
          <div>
            <strong>ID</strong>
          </div>
          <div>
            <strong>Destinatário</strong>
          </div>
          <div>
            <strong>Entregador</strong>
          </div>
          <div>
            <strong>Cidade</strong>
          </div>
          <div>
            <strong>Estado</strong>
          </div>
          <div>
            <strong>Status</strong>
          </div>
          <div>
            <strong>Ações</strong>
          </div>
        </li>
        {plans.map((item) => (
          <li key={item.id}>
            <div>
              #
              {item.recipient.id}
            </div>
            <div>{item.recipient.name}</div>
            <div>{item.deliveryman.name}</div>
            <div>{item.recipient.city}</div>
            <div>{item.recipient.state}</div>
            <div>
              <span style={{ border: '1px solid black', borderRadius: '10px', padding: '3px', background: item.status.color, display: 'flex', width: 'fit-content' }}>
                <span style={{ display: 'block', height: '17px', width: '17px', background: 'black', borderRadius: '50%', marginRight: '5px', }}>&nbsp;</span>
                <span>{item.status.description}</span>
              </span>
            </div>
          <div>
            <Options handleInfo={() => handleDelivery(item)} linkEdit={`delivery.edit/${item.id}`} handleDelete={() => handleDelete(item.id)} />
          </div>
          </li>
        ))}
      </List>
    <Pagination current={page} total={pageTotal} setPage={setPage} />

    <Modal open={openModal} reset={handlePropagatesClose}>
      <DeliveryPreview
        data={currentHelp}
        reset={handlePropagatesClose}
      />
    </Modal>
    </Container >
  );
}
