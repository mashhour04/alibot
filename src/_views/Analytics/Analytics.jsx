import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Autorenew from "@material-ui/icons/Autorenew";
import Assignment from "@material-ui/icons/Assignment";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import AccountBox from "@material-ui/icons/AccountBox";

// core components
import GridItem from "../../_components/Grid/GridItem.jsx";
import GridContainer from "../../_components/Grid/GridContainer.jsx";

import Card from "../../_components/Card/Card.jsx";
import CardHeader from "../../_components/Card/CardHeader.jsx";
import CardIcon from "../../_components/Card/CardIcon.jsx";

import CardFooter from "../../_components/Card/CardFooter.jsx";

import dashboardStyle from "../../_assets/jss/material-dashboard-react/views/dashboardStyle.jsx";


class Analytics extends React.Component {
    render() {
        const { classes,  analytics } = this.props;
        let bookings = 0; let visitors = 0; let loyalUsers = 0; let newUsers = 0; let fans = 0;
        
        if (analytics && typeof analytics.bookings !== "undefined" ) {
            bookings = analytics.bookings;
            visitors = analytics.visitors;
            loyalUsers = analytics.loyalUsers;
            newUsers = analytics.newUsers;
        }
        return (
        <GridContainer>

            <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="warning" stats icon>
                        <CardIcon color="warning">
                            <Assignment />
                        </CardIcon>
                        <p className={classes.cardCategory}>Todays' Expected Bookings</p>
                        <h3 className={classes.cardTitle}>
                            {bookings}
                        </h3>
                    </CardHeader>
                    <CardFooter stats>

                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="success" stats icon>
                        <CardIcon color="success">
                            <AssignmentInd />
                        </CardIcon>
                        <p className={classes.cardCategory}>Todays' Expected Visitors</p>
                        <h3 className={classes.cardTitle}>{visitors}</h3>
                       </CardHeader>
                    <CardFooter stats>

                    </CardFooter>
                </Card>
            </GridItem>
            {/* <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="danger" stats icon>
                        <CardIcon color="danger">
                            <AccessibilityNew />
                        </CardIcon>
                        <p className={classes.cardCategory}>Fans liked your FB page</p>
                        <h3 className={classes.cardTitle}>{fans}</h3>
                    </CardHeader>
                    <CardFooter stats>

                    </CardFooter>
                </Card>
            </GridItem> */}
            <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="info" stats icon>
                        <CardIcon color="info">
                            <AccountBox />
                        </CardIcon>
                        <p className={classes.cardCategory}>New Users</p>
                        <h3 className={classes.cardTitle}>{newUsers}</h3>
                    </CardHeader>
                    <CardFooter stats>

                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="info" stats icon>
                        <CardIcon color="info">
                            <Autorenew />
                        </CardIcon>
                        <p className={classes.cardCategory}>Loyal Users</p>
                        <h3 className={classes.cardTitle}>{loyalUsers}</h3>
                    </CardHeader>
                    <CardFooter stats>

                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>)
    }
}


Analytics.propTypes = {
    classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const { user, vendor, analytics } = state;
    return { user, vendor, analytics };
}
export default connect(mapStateToProps)(withStyles(dashboardStyle)(Analytics));
