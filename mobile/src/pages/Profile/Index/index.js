import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';

import { signOut } from "~/store/modules/auth/actions";
import Container from '~/components/Container';
import Button from '~/components/Button';

import { Field, Label, Value, ImageWrap, Image, Box } from './styles';

export default function ProfileIndex({ route, navigation }) {
  const { profile } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const handleLogout = () => dispatch(signOut());

  const createField = (label, value) => {
    return (
      <Field>
        <Label>{label}</Label>
        <Value>{value}</Value>
      </Field>
    )
  };

  return (
    <Container scrollable spaced>
      <ImageWrap>
        <Image source={{ uri: `http://192.168.1.7:3333/files/${profile.avatar_id}` }} />
      </ImageWrap>

      <Box>
        {createField('Nome', 'Marcelo Vilela')}
        {createField('Email', 'marcelo.vilela.s@gmail.com')}
        {createField('Data de cadastro', '01/01/2020')}
      </Box>

      <Button onPress={handleLogout} color="danger">
        Logout
      </Button>
    </Container>
  );
}

ProfileIndex.propTypes = {
  data: PropTypes.shape({
    created_at: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    answer: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
