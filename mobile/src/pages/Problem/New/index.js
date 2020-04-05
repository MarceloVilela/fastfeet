import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import Button from '~/components/Button';
import Container from '~/components/Container';
import api from '~/services/api';
import { Form, FormInput } from './styles';

export default function HelpNew({ navigation, route }) {
  const { deliveryData } = route.params;
  const [description, setDescription] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = async () => {
    if (!description || description.length < 7) {
      alert('Forneça uma descrição para o problema');
      return false;
    }

    setLoadingSubmit(true);
    
    try {
      const response = await api.post(`/delivery/${deliveryData.id}/problems`, {
        description,
      });

      if (response.data.id) {
        navigation.navigate('Details', {deliveryData});
      }
    } catch (error) {
      alert(error);
    }
    setLoadingSubmit(false);
  };

  return (
    <Container loading={loadingSubmit} scrollable spaced>
      <Form>
        <FormInput
          autoCorrect={false}
          multiline
          numberOfLines={10}
          textAlignVertical="top"
          placeholder="Inclua aqui o problema que ocorreu na entrega"
          returnKeyType="next"
          value={description}
          onChangeText={setDescription}
        />

        <Button onPress={handleSubmit} loading={loadingSubmit}>
          Enviar
        </Button>
      </Form>
    </Container>
  );
}

HelpNew.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('HelpIndex');
      }}
    >
      <Icon name="chevron-left" size={20} color="#444" />
    </TouchableOpacity>
  ),
});

HelpNew.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
