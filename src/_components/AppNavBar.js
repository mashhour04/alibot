import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import MenuIcon from 'mdi-react/MenuIcon';
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import SettingsIcon from 'mdi-react/SettingsIcon';
import LogoutIcon from 'mdi-react/LogoutIcon'
import ArrowCollapseDownIcon from 'mdi-react/ArrowCollapseDownIcon'
import {
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import { navigationActions } from '../_actions/navigation.actions';
class AppNavbar extends Component {
  state = {
    isOpen: false,
    iconOnly: false,
    dropdownOpen: false
  };

  componentDidMount() {
    this.props.dispatch(navigationActions.ChangeSideBar(false));
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  toggleProfile = () => {
    this.setState({
      dropdownOpen: !this.state.isOpen
    });
  }

  sideBarToggle = () => {
    const { iconOnly } = this.state;
    if (iconOnly) {
      document.body.classList.add('sidebar-icon-only');
      this.props.dispatch(navigationActions.ChangeSideBar(true));
      return this.setState({ iconOnly: false });
    }
    document.body.classList.remove('sidebar-icon-only');
    this.props.dispatch(navigationActions.ChangeSideBar(false));
    this.setState({ iconOnly: true });
  }

  // offCanvasChange = () => {
  //   const { iconOnly } = this.state;
  //   this.props.dispatch(navigationActions.ChangeSideBar(true));
  // }

  render() {
    return (
      <Nav className="navbar col-lg-12 col-12 p-0 fixed-top  d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <a className="navbar-brand brand-logo" href="../../index.html"><img src="/images/logo.svg" alt="logo" /></a>
          <a className="navbar-brand brand-logo-mini" href="../../index.html"><img src="/images/logo-mini.svg" alt="logo" /></a>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end justify-content-lg-start">
          <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize" onClick={this.sideBarToggle}>
            <MenuIcon></MenuIcon>
          </button>
          <ul className="navbar-nav navbar-nav-right">
            <Dropdown className="nav-profile" nav isOpen={this.state.dropdownOpen} toggle={this.toggleProfile}>
              <DropdownToggle className="nav-link" nav>
                <span className="nav-profile-name">Samy Boujbel</span>
                <span>
                  <ArrowCollapseDownIcon size={18}></ArrowCollapseDownIcon>
                </span>
              </DropdownToggle>
              <DropdownMenu right className="navbar-dropdown" aria-labelledby="profileDropdown">
                <DropdownItem>
                  <SettingsIcon className="text-primary"></SettingsIcon>
                  Settings
              </DropdownItem>
                <div className="dropdown-divider"></div>
                <DropdownItem>
                  <LogoutIcon className="text-primary"></LogoutIcon>
                  Logout
              </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <NavItem className="nav-settings d-none d-lg-flex">
              <NavLink href="#">
                <i className="mdi mdi-dots-horizontal"></i>
              </NavLink>
            </NavItem>
          </ul>
            <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={this.sideBarToggle}>
              <MenuIcon></MenuIcon>
            </button>
        </div>
      </Nav>
    );
  }
}


function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(AppNavbar);

/* 
 // Old Code 
       <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">Ali Dashboard</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="https://www.facebook.com/3amekAli/">
                    Facebook Page
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
*/