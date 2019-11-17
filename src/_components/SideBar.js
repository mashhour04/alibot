import React, { Component } from 'react';
import ViewQuiltIcon from 'mdi-react/ViewQuiltIcon';
import SettingsApplicationsIcon from 'mdi-react/SettingsApplicationsIcon';
import MessagePlusIcon from 'mdi-react/MessagePlusIcon';
import ClockEndIcon from 'mdi-react/ClockwiseIcon';
import SilverwareForkIcon from 'mdi-react/SilverwareForkIcon';
import connect from 'react-redux/lib/connect/connect';
import {
    Nav,
    NavItem
} from 'reactstrap';

import './SideBar.css'
class SideBar extends Component {
    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const { iconOnly } = this.props;
        const sideNavClass = `sidebar sidebar-offcanvas ${iconOnly && "active"}`;
        console.log('icon ', iconOnly);
        return (
            <nav className={sideNavClass}>
                <Nav>
                    <NavItem>
                        <a className="nav-link" href="/">
                            <ViewQuiltIcon className="menu-icon"></ViewQuiltIcon>
                            <span className="menu-title"> Dashboard</span>
                        </a>
                    </NavItem>
                    <NavItem>
                        <a className="nav-link" href="/past-bookings">
                            <ClockEndIcon className="menu-icon"></ClockEndIcon>
                            <span className="menu-title"> Past Bookings</span>
                        </a>
                    </NavItem>
                    <NavItem>
                        <a className="nav-link" href="/my-tables">
                            <SilverwareForkIcon className="menu-icon"></SilverwareForkIcon>
                            <span className="menu-title"> My Tables</span>
                        </a>
                    </NavItem>
                    <NavItem>
                        <a className="nav-link" href="/get-deals">
                            <MessagePlusIcon className="menu-icon"></MessagePlusIcon>
                            <span className="menu-title"> Create a Deal</span>
                        </a>
                    </NavItem>
                    <NavItem>
                        <a className="nav-link" href="/user">
                            <SettingsApplicationsIcon className="menu-icon"></SettingsApplicationsIcon>
                            <span className="menu-title"> Settings</span>
                        </a>
                    </NavItem>
                </Nav>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    const { iconOnly } = state.sideBar;
    return {
        iconOnly
    };
}
export default connect(mapStateToProps)(SideBar);