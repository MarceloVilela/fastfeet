import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '~/services/api';
import {
  Container, FieldGroupList, List, Modal, Pagination,
} from '../../../components';
import DeliveryPreview from '../Preview';

export default function Profile() {
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [loading, setLoading] = useState(true);

  const [currentHelp, setCurrentHelp] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const formatPlan = (plan) => ({
    ...plan,
    durationDesc:
      plan.duration === 1 ? `${plan.duration} mês` : `${plan.duration} meses`,
  });

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
            <div>PENDENTE</div>
            <div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'baseline'
              }}
            >
                <button
                type="button"
                className="info"
                onClick={() => handleDelivery(item)}
              >
                visualizar
                </button>
              <Link to={`delivery.edit/${item.id}`} className="edit">
                <span className="edit">editar</span>
              </Link>

              <button
                type="button"
                className="warning"
                onClick={() => handleDelete(item.id)}
              >
                apagar
                </button>
            </div>
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
