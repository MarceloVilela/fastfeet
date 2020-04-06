import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import {
  Container, FieldGroupList, List, Modal, Options, Pagination,
} from '../../../components';
import { Status } from './styles';
import DeliveryPreview from './Preview';

export default function Delivery() {
  const [itens, setItens] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [loading, setLoading] = useState(true);

  const [currentItem, setCurrentItem] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const loadItens = useCallback(async () => {
    console.log('loadItens');
    setLoading(true);
    try {
      const {
        data: { docs, pages },
      } = await api.get(`deliveries?q=${q}&page=${page}`);

      setPageTotal(pages);

      const desc = {
        pending: 'PENDENTE', withdrawal: 'RETIRADA', delivered: 'ENTREGUE', canceled: 'CANCELADA',
      };

      const docsFormated = docs.map((item) => ({ ...item, statusDesc: desc[item.status] }));

      setItens(docsFormated);
    } catch (error) {
      toast.error('Erro ao listar encomendas');
    }
    setLoading(false);
  }, [page, q]);

  useEffect(() => {
    loadItens();
  }, [loadItens]);

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Tem certeza que deseja apagar encomenda?')) {
      setLoading(true);
      try {
        await api.delete(`deliveries/${id}`);
        toast.success('Encomenda apagada com sucesso');
        loadItens();
      } catch (error) {
        toast.error('Erro ao apagar encomenda');
      }
      setLoading(false);
    }
  };

  const handleDelivery = (item) => {
    setCurrentItem(item);
    setOpenModal(true);
  };

  return (
    <Container loading={loading}>
      <FieldGroupList
        title="Gerenciando encomendas"
        location="/encomenda.cadastrar"
        handleInput={setQ}
        inputPlaceholder="Buscar por encomendas"
      />

      <List>
        <li>
          <div>
            <strong>
              ID
              {q}
            </strong>
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
        {itens.map((item) => (
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
              <Status name={item.status}>
                <span>&nbsp;</span>
                <span>{item.statusDesc}</span>
              </Status>
            </div>
            <div>
              <Options
                handleInfo={() => handleDelivery(item)}
                linkEdit={`encomenda.editar/${item.id}`}
                handleDelete={() => handleDelete(item.id)}
              />
            </div>
          </li>
        ))}
      </List>
      <Pagination current={page} total={pageTotal} setPage={setPage} />

      <Modal open={openModal} reset={() => setOpenModal(false)}>
        <DeliveryPreview data={currentItem} />
      </Modal>
    </Container>
  );
}
