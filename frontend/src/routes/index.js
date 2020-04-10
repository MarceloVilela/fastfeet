import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignOut from '../pages/SignOut';

import RecipientNew from '../pages/Recipient/Create';
import Recipient from '../pages/Recipient/Show';
import RecipientEdit from '../pages/Recipient/Update';

import DeliveryNew from '../pages/Delivery/Create';
import Delivery from '../pages/Delivery/Show';
import DeliveryEdit from '../pages/Delivery/Update';

import Deliveryman from '../pages/Deliveryman/Show';
import DeliverymanEdit from '../pages/Deliveryman/Update';
import DeliverymanNew from '../pages/Deliveryman/Create';

import Problem from '../pages/Problem/Show';

export default function Routes() {
  return (
    <Switch>
      <Route path="/entrar" component={SignIn} />
      <Route path="/sair" component={SignOut} isPrivate />
      <Route path="/" component={Delivery} isPrivate />

      <Route path="/destinatario.cadastrar" component={RecipientNew} isPrivate />
      <Route path="/destinatario" component={Recipient} isPrivate exact />
      <Route path="/destinatario.editar/:id" component={RecipientEdit} isPrivate />

      <Route path="/encomenda.cadastrar" component={DeliveryNew} isPrivate />
      <Route path="/encomenda" component={Delivery} isPrivate exact />
      <Route path="/encomenda.editar/:id" component={DeliveryEdit} isPrivate />

      <Route path="/entregador.cadastrar" component={DeliverymanNew} isPrivate />
      <Route path="/entregador" component={Deliveryman} isPrivate exact />
      <Route
        path="/entregador.editar/:id"
        component={DeliverymanEdit}
        isPrivate
        exact
      />

      <Route path="/problema" component={Problem} isPrivate />
    </Switch>
  );
}
