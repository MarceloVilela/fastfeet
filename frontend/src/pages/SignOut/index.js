import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

export default function SignOut() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signOut());
  }, [dispatch]);

  return (
    <div>Saindo...</div>
  );
}
