import React, { useEffect, useState, useCallback } from "react";
import { View } from 'react-native';
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
//import { withNavigationFocus } from "react-navigation";

import api from "~/services/api";
import ProblemItem from "~/components/ProblemItem";
import EmptyItem from "~/components/EmptyItem";
import Container from "~/components/Container";
import Button from "~/components/Button";
import { List } from "./styles";

export default function ProblemIndex({ navigation, route }) {
  //const { id } = useSelector(state => state.auth);
  const { deliveryData } = route.params;
  const [loadingNew, setLoadingNew] = useState(false);
  const listEmptyComponent = { description: 'Sem registros de problemas' };

  // list checkins
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(
    async (pageNumber = 1) => {
      setLoading(true);
      try {
        ///deliverymen/:deliveryman_id/deliveries
        const url = `/delivery/${deliveryData.id}/problems`;
        const response = await api.get(url);
        const { problems } = response.data;

        const formatDate = (date) => {
          return date
            ? format(parseISO(date), "dd'/'MM'/'yy", { locale: pt, })
            : '--/--/--'
        }

        setData(
          problems.map(item => ({ ...item, createdAtFormated: formatDate(item.created_at) }))
        )
      } catch (error) {
        alert(error);
      }
      setLoading(false);
    },
    []
  );

  // when starting page
  useEffect(() => {
    load();
  }, [load]);

  return (
    <Container loading={loading} scrollable spaced>
      <Button onPress={() => { }}>
        Encomenda {deliveryData.id}
      </Button>
      <List
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <ProblemItem data={item} />}
        ListEmptyComponent={<EmptyItem data={listEmptyComponent} />}
      />
    </Container>
  );
}
