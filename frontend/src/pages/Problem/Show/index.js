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

  const handleAnswer = (item) => {
    setCurrentItem(item);
    setOpenModal(true);
  };

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
              <Options handleInfo={() => { handleAnswer(item); }} handleDelete={() => { }} />
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
