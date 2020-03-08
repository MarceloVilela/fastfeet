import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

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
      <Route path="/" exact component={SignIn} />

      <Route path="/recipient.new" component={RecipientNew} isPrivate />
      <Route path="/recipient" component={Recipient} isPrivate exact />
      <Route path="/recipient.edit/:id" component={RecipientEdit} isPrivate />

      <Route path="/delivery.new" component={DeliveryNew} isPrivate />
      <Route path="/delivery" component={Delivery} isPrivate exact />
      <Route path="/delivery.edit/:id" component={DeliveryEdit} isPrivate />

      <Route path="/deliveryman.new" component={DeliverymanNew} isPrivate />
      <Route path="/deliveryman" component={Deliveryman} isPrivate exact />
      <Route
        path="/deliveryman.edit/:id"
        component={DeliverymanEdit}
        isPrivate
        exact
      />

      <Route path="/problem" component={Problem} isPrivate />
    </Switch>
  );
}
