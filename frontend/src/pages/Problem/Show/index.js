import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import {
  Container,
  FieldGroupList,
  List,
  Modal,
  Options,
  Pagination,
} from '../../../components';
import ProblemPreview from './Preview';

export default function ProblemShow() {
  const [itens, setItens] = useState([]);
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [loading, setLoading] = useState(true);

  const [currentItem, setCurrentItem] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const loadItens = useCallback(async () => {
    setLoading(true);
    try {
      const {
        data: { docs, pages },
      } = await api.get(`problem?page=${page}`);
      setPageTotal(pages);
      setItens(docs);
    } catch (error) {
      toast.error('Erro ao listar problemas');
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    loadItens();
  }, [page, loadItens]);

  const handleProblem = (item) => {
    setCurrentItem(item);
    setOpenModal(true);
  };

  async function handleDelete(item) {
    if (window.confirm('Tem certeza que deseja cancelar encomenda?')) {
      setLoading(true);
      try {
        await api.delete(`/problem/${item.id}/cancel-delivery`);
        toast.success('Encomenda cancelada com sucesso');
        loadItens();
      } catch (error) {
        toast.error('Erro ao cancelar encomenda');
      }
      setLoading(false);
    }
  }

  return (
    <Container loading={loading}>
      <FieldGroupList title="Problemas de entrega" />

      <List>
        <li>
          <div>
            <strong>Entrega</strong>
          </div>
          <div>
            <strong>Problema</strong>
          </div>
          <div>
            <strong>Ações</strong>
          </div>
        </li>
        {itens.map((item) => (
          <li key={item.id}>
            <div>
              #
              {item.delivery_id}
            </div>
            <div>{item.description}</div>
            <div>
              <Options
                handleInfo={() => { handleProblem(item); }}
                handleDelete={item.delivery.canceled_at ? null : () => { handleDelete(item); }}
                deleteLabel="Cancelar encomenda"
              />
            </div>
          </li>
        ))}
      </List>
      <Pagination current={page} total={pageTotal} setPage={setPage} />

      <Modal open={openModal} reset={() => setOpenModal(false)}>
        <ProblemPreview data={currentItem} cbAnswer={loadItens} />
      </Modal>
    </Container>
  );
}
