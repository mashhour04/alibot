import React from 'react';

import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { Switch, Route, Redirect } from "react-router-dom";

// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";


import { PrivateRoute } from '../components/PrivateRoute';

// core components
import Footer from "../_components/Footer/Footer.jsx";

import dashboardRoutes from "../_routes/dashboard.jsx";


import AppNavbar from '../_components/AppNavBar';
// import Bookings from '../_components/Bookings';
// import Tables from '../_components/tables/index';
import SideBar from '../_components/SideBar';
import MyTables from '../_views/MyTables/MyTables';
import { vendorActions } from '../_actions/vendor.actions';
import { userActions } from '../_actions/user.actions';

import './HomePage.css';

const switchRoutes = (
    <Switch>
        {dashboardRoutes.map((prop, key) => {
            if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key} />;
            return <PrivateRoute path={prop.path} component={prop.component} key={key} />;
        })}
        <PrivateRoute component={MyTables} key={2} />;
    </Switch>
);

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false
        };
        this.resizeFunction = this.resizeFunction.bind(this);
    }
    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };
    getRoute() {
        return this.props.location.pathname !== "/maps";
    }
    resizeFunction() {
        if (window.innerWidth >= 960) {
            this.setState({ mobileOpen: false });
        }
    }
    componentDidMount() {
        this.props.dispatch(vendorActions.getVendor({ skip: 0, limit: 20 }));
        this.props.dispatch(userActions.getUser());
        if (navigator.platform.indexOf("Win") > -1) {
            // const ps = new PerfectScrollbar(this.refs.mainPanel);
        }
        window.addEventListener("resize", this.resizeFunction);
    }
    componentDidUpdate(e) {
        if (e.history.location.pathname !== e.location.pathname) {
            // this.refs.mainPanel.scrollTop = 0;
            if (this.state.mobileOpen) {
                this.setState({ mobileOpen: false });
            }
        }
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeFunction);
    }


    render() {
        // const { user } = this.props;
        return (
            <div className="container-scroller">

                <AppNavbar />
                <Container fluid className="page-body-wrapper">
                    <SideBar></SideBar>

                    <div className="main-panel">
                        <div className="content-wrapper">
                            {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
                            {this.getRoute() ? (
                                <div>
                                    <div>{switchRoutes}</div>
                                </div>
                            ) : (
                                    <div>{switchRoutes}</div>
                                )}
                            { this.getRoute() ? <div><Footer /></div> : null}
                            {/* <Row className="grid-margin">
                                <Col size={12}>
                                    <Tables></Tables>
                                </Col>
                            </Row> */}
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { vendor, tables, authentication } = state;
    const { user } = authentication;
    console.log('vendor', vendor);
    return {
        user,
        vendor,
        tables,
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };