import React, { useEffect, useState, useCallback, Profiler } from "react";
import { Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useDispatch, useSelector } from "react-redux";

import { signOut } from "~/store/modules/auth/actions";
import api from "~/services/api";
import DeliveryItem from "~/components/DeliveryItem";
import EmptyItem from "~/components/EmptyItem";
import Button from "~/components/Button";
import Container from "~/components/Container";

import { color } from "~/styles/values";
import { Identification, ImageWrap, Image, WelcomeWrap, Label, Value, Box, List, FilterWrap, FilterTitle, FilterOptions, FilterLabel } from "./styles";

function DeliveryIndex({ navigation }) {
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(signOut());

  const { id } = useSelector(state => state.auth);
  const { profile } = useSelector(state => state.auth);
  const listEmptyComponent = { description: 'Sem registros de entregas' };

  // list deliveries
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('not_delivered');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  async function load() {
    // awaits previous loading
    if (loading) {
      console.log('awaits-loading');
      return;
    }

    // already listed everything
    if (total > 0 && data.length === total) {
      console.log('everything');
      return;
    }

    setLoading(true);

    try {
      ///deliverymen/:deliveryman_id/deliveries
      const url = `/deliverymen/${id}/deliveries?page=${page}&filter=${filter}`;
      //alert('request');
      const response = await api.get(url);
      const { docs, pages, total: totalCount } = response.data;

      const desc = {
        pending: 'Pendente', withdrawal: 'Retirada', delivered: 'Entregue', canceled: 'Cancelada',
      };

      const steps = {
        pending: 0, withdrawal: 1, delivered: 2, canceled: 2,
      };

      const formatDate = (date) => {
        return date
          ? format(parseISO(date), "dd'/'MM'/'yy", { locale: pt, })
          : '--/--/--'
      }

      //setRefreshing(false);
      setPage(page + 1);
      setTotal(totalCount);

      setData(list =>
        // eslint-disable-next-line no-plusplus
        list.concat(docs).map((item, key) => ({
          ...item,
          counter: key + 1,
          statusDesc: desc[item.status],
          step: steps[item.status],
          createdAtFormated: formatDate(item.createdAt),
          startDateFormated: formatDate(item.start_date),
          endDateFormated: formatDate(item.end_date)
        }))
      );

    } catch (error) {
      alert(error);
    }
    setLoading(false);
  }

  // when starting page
  useEffect(() => {
    load();
  }, []);

  function handleFilter(value){
    if(value != filter){
      setData([]);
      setPage(1);
      setTotal(0)
      setFilter(value);
    }  
  }

  useEffect(() => {
    load();
  }, [filter]);

  return (
    <Container loading={loading}>
      <>
        <Box style={{ marginVertical: 10 }}>
          <Identification>
            <ImageWrap>
              <Image
                source={{ uri: `http://192.168.1.7:3333/files/${profile.avatar_id}` }}
              />
            </ImageWrap>

            <WelcomeWrap>
              <Label>Bem vindo de volta,</Label>
              <Value>{profile.name}</Value>
            </WelcomeWrap>

            <TouchableOpacity onPress={handleLogout}>
              <MaterialIcons name={'exit-to-app'} size={24} color={'red'} />
            </TouchableOpacity>
          </Identification>
        </Box>

        <FilterWrap>
          <FilterTitle>Entregas</FilterTitle>
          <FilterOptions>
            <TouchableOpacity onPress={() => { handleFilter('not_delivered') }}>
              <FilterLabel selected={filter==='not_delivered'}>Pendentes</FilterLabel>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { handleFilter('delivered') }}>
            <FilterLabel selected={filter==='delivered'}>Entregues</FilterLabel>
            </TouchableOpacity>
          </FilterOptions>
        </FilterWrap>

        <Box>
          <List
            data={data}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <DeliveryItem data={item} navigation={navigation} />}
            ListEmptyComponent={<EmptyItem data={listEmptyComponent} />}
            onEndReached={() => {
              console.log('more');
              load();
            }}
            onEndReachedThreshold={0.2}
          /*onEndReachedThreshold={0.2}
          onEndReached={loadMore}
          onRefresh={refreshList}
          refreshing={refreshing}*/
          />
        </Box>
      </>
    </Container>
  );
}

export default DeliveryIndex;
