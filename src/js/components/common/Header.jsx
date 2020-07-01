import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hustLogo from '../../theme/imgs/hust_logo.png';
import {
  Navbar, Nav, UncontrolledDropdown, DropdownToggle,
  DropdownMenu, DropdownItem,
} from 'reactstrap';
import styled from 'styled-components';
import { NotificationManager } from 'react-notifications';

const NavbarCustom = styled(Navbar)`
  height: 40px;
`;

const WrapperLogo = styled.div`
  width: 100%;

  img {
    width: 100%;
  }
`;

class Header extends Component {
  componentDidMount() {}

  componentDidMount() {
    this.props.getMe(() => {}, (error) => {
      if (error.response && error.response.status === 401) {
        NotificationManager.error('Authentication', 'Lỗi', 3000);
        window.location.replace(`/signin`);
      }
    });
  }

  render() {
    const { me, logout } = this.props;
    return (
      <div>
        <NavbarCustom color="light" expand="md" light>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {me.email}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Profile
                </DropdownItem>
                <DropdownItem onClick={logout}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </NavbarCustom>
        <WrapperLogo>
          <img src={hustLogo} />
        </WrapperLogo>
      </div>
    );
  }
}

Header.propTypes = {
  me: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  getMe: PropTypes.func.isRequired,
};

export default Header;
