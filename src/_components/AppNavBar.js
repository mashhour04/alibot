import React, { Component } from "react";
import connect from "react-redux/lib/connect/connect";
import MenuIcon from "mdi-react/MenuIcon";
import MagnifyIcon from "mdi-react/MagnifyIcon";
import SettingsIcon from "mdi-react/SettingsIcon";
import LogoutIcon from "mdi-react/LogoutIcon";
import ArrowCollapseDownIcon from "mdi-react/ArrowCollapseDownIcon";
import {
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import { navigationActions } from "../_actions/navigation.actions";
import { userActions } from "../_actions/user.actions";
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
  };

  toggleProfile = () => {
    this.setState({
      dropdownOpen: !this.state.isOpen
    });
  };
  goToSettings = () => {
    window.location.href = "/user";
  };

  logout = () => {
    this.props.dispatch(userActions.logout());
  };

  sideBarToggle = () => {
    const { iconOnly } = this.state;
    if (iconOnly) {
      document.body.classList.add("sidebar-icon-only");
      this.props.dispatch(navigationActions.ChangeSideBar(true));
      return this.setState({ iconOnly: false });
    }
    document.body.classList.remove("sidebar-icon-only");
    this.props.dispatch(navigationActions.ChangeSideBar(false));
    this.setState({ iconOnly: true });
  };

  // offCanvasChange = () => {
  //   const { iconOnly } = this.state;
  //   this.props.dispatch(navigationActions.ChangeSideBar(true));
  // }

  render() {
    let { profile } = this.props;
    console.log('profile in nav bar', profile)
    
    return (
      <Nav className="navbar col-lg-12 col-12 p-0 fixed-top  d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <a className="navbar-brand brand-logo" href="../../index.html">
            <img src="/images/nav-logo-back-2.png" alt="logo" />
          </a>
          <a className="navbar-brand brand-logo-mini" href="../../index.html">
            <img src="/images/nav-logo-back-2.png" alt="logo" />
          </a>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end justify-content-lg-start">
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            data-toggle="minimize"
            onClick={this.sideBarToggle}
          >
            <MenuIcon />
          </button>
          <ul className="navbar-nav navbar-nav-right">
            <Dropdown
              className="nav-profile"
              nav
              isOpen={this.state.dropdownOpen}
              toggle={this.toggleProfile}
            >
              <DropdownToggle className="nav-link" nav>
                <span className="nav-profile-name">{ profile.firstName ? `${profile.firstName} ${profile.lastName}` : 'Wicked Ninja' }</span>
                <span>
                  <ArrowCollapseDownIcon
                    style={{ marginLeft: "5px" }}
                    size={18}
                  />
                </span>
              </DropdownToggle>
              <DropdownMenu
                right
                className="navbar-dropdown"
                aria-labelledby="profileDropdown"
              >
                <DropdownItem onClick={this.goToSettings}>
                  <SettingsIcon className="text-primary" />
                  Settings
                </DropdownItem>
                <div className="dropdown-divider" />
                <DropdownItem onClick={this.logout}>
                  <LogoutIcon className="text-primary" />
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <NavItem className="nav-settings d-none d-lg-flex">
              <NavLink href="#">
                <i className="mdi mdi-dots-horizontal" />
              </NavLink>
            </NavItem>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            onClick={this.sideBarToggle}
          >
            <MenuIcon />
          </button>
        </div>
      </Nav>
    );
  }
}

function mapStateToProps(state) {
  const { profile, vendor } = state;
  return { profile };
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
