import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  MdLocalShipping,
  MdPermIdentity,
  MdPersonPin,
  MdFeedback,
  MdExitToApp,
} from 'react-icons/md';

import { signOut } from '~/store/modules/auth/actions';
import logo from '~/assets/fastfeet-logo.svg';
import { Container, Content } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <article>
            <section>
              <img
                src={logo}
                alt="FastFeet"
              />
            </section>

            <section>
              <NavLink to="/encomenda" activeClassName="chosen" exact={false}>
                <span>ENCOMENDAS</span>
                <MdLocalShipping />
              </NavLink>
              <NavLink
                to="/entregador"
                activeClassName="chosen"
                exact={false}
              >
                <span>ENTREGADORES</span>
                <MdPermIdentity />
              </NavLink>
              <NavLink
                to="/destinatario"
                activeClassName="chosen"
                exact={false}
                strict={false}
              >
                <span>DESTINATÁRIOS</span>
                <MdPersonPin />
              </NavLink>
              <NavLink to="/problema" activeClassName="chosen" exact={false}>
                <span>PROBLEMAS</span>
                <MdFeedback />
              </NavLink>
            </section>
          </article>

          <aside>
            <p>{profile.name}</p>

            <button type="button" className="warning" onClick={handleSignOut}>
              <span>sair do sistema</span>
              <MdExitToApp />
            </button>
          </aside>
        </nav>
      </Content>
    </Container>
  );
}
