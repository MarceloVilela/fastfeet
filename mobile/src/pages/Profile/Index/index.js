import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import PropTypes from 'prop-types';

import { signOut } from "~/store/modules/auth/actions";
import Container from '~/components/Container';
import Button from '~/components/Button';

import { Field, Label, Value, ImageWrap, Image, Box } from './styles';

export default function ProfileIndex({ route, navigation }) {
  const { profile: auth } = useSelector(state => state.auth);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const authFormated = {
      ...auth,
      created_at: format(parseISO(auth.created_at), "dd'/'MM'/'yy", { locale: pt, })
    }
    setProfile(authFormated);
  }, [])

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
    <>
      <ImageWrap>
        <Image source={{ uri: `http://192.168.1.7:3333/files/${profile.avatar_id}` }} />
      </ImageWrap>

      <Box>
        {createField('Nome', profile.name)}
        {createField('Email', profile.email)}
        {createField('Data de cadastro', profile.created_at)}
      </Box>

      <Button onPress={handleLogout} color="danger">
        Logout
      </Button>
    </>
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
