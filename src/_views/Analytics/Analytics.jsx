import React from 'react';
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";

import Accessibility from "@material-ui/icons/Accessibility";
import LiveHelpRounded from "@material-ui/icons/LiveHelpRounded";
import Star from "@material-ui/icons/Star";
import PaymentRounded from "@material-ui/icons/PaymentRounded";
import AccessibilityNew from "@material-ui/icons/AccessibilityNew";
import ShoppingCartSharp from "@material-ui/icons/ShoppingCartSharp";
import Textsms from "@material-ui/icons/Textsms";

// core components
import GridItem from "../../_components/Grid/GridItem.jsx";
import GridContainer from "../../_components/Grid/GridContainer.jsx";

import Danger from "../../_components/Typography/Danger.jsx";
import Card from "../../_components/Card/Card.jsx";
import CardHeader from "../../_components/Card/CardHeader.jsx";
import CardIcon from "../../_components/Card/CardIcon.jsx";

import CardFooter from "../../_components/Card/CardFooter.jsx";

import dashboardStyle from "../../_assets/jss/material-dashboard-react/views/dashboardStyle.jsx";


class Analytics extends React.Component {
    render() {
        const { classes } = this.props;
        return (<GridContainer>

            <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="warning" stats icon>
                        <CardIcon color="warning">
                            <PaymentRounded  />
                        </CardIcon>
                        <p className={classes.cardCategory}>NEXT PAYOUT</p>
                        <h3 className={classes.cardTitle}>
                            4,250 <small>$</small>
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
                            <ShoppingCartSharp />
                        </CardIcon>
                        <p className={classes.cardCategory}>TOTAL PRODUCTS</p>
                        <h3 className={classes.cardTitle}>$12,500</h3>
                    </CardHeader>
                    <CardFooter stats>
                      
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="danger" stats icon>
                        <CardIcon color="danger">
                            <AccessibilityNew />
                        </CardIcon>
                        <p className={classes.cardCategory}>TODAYS VISITORS</p>
                        <h3 className={classes.cardTitle}>230</h3>
                    </CardHeader>
                    <CardFooter stats>
                        
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="info" stats icon>
                        <CardIcon color="info">
                            <Textsms />
                        </CardIcon>
                        <p className={classes.cardCategory}>WATCHING NOW</p>
                        <h3 className={classes.cardTitle}>+245</h3>
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

export default withStyles(dashboardStyle)(Analytics);
