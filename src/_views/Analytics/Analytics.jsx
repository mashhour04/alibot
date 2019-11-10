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
                            <Icon>content_copy</Icon>
                        </CardIcon>
                        <p className={classes.cardCategory}>Used Space</p>
                        <h3 className={classes.cardTitle}>
                            49/50 <small>GB</small>
                        </h3>
                    </CardHeader>
                    <CardFooter stats>
                        <div className={classes.stats}>
                            <Danger>
                                <Warning />
                            </Danger>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                Get more space
                  </a>
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="success" stats icon>
                        <CardIcon color="success">
                            <Store />
                        </CardIcon>
                        <p className={classes.cardCategory}>Revenue</p>
                        <h3 className={classes.cardTitle}>$34,245</h3>
                    </CardHeader>
                    <CardFooter stats>
                        <div className={classes.stats}>
                            <DateRange />
                            Last 24 Hours
                </div>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="danger" stats icon>
                        <CardIcon color="danger">
                            <Icon>star</Icon>
                        </CardIcon>
                        <p className={classes.cardCategory}>Fixed Issues</p>
                        <h3 className={classes.cardTitle}>75</h3>
                    </CardHeader>
                    <CardFooter stats>
                        <div className={classes.stats}>
                            <LocalOffer />
                            Tracked from Github
                </div>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="info" stats icon>
                        <CardIcon color="info">
                            <Accessibility />
                        </CardIcon>
                        <p className={classes.cardCategory}>Followers</p>
                        <h3 className={classes.cardTitle}>+245</h3>
                    </CardHeader>
                    <CardFooter stats>
                        <div className={classes.stats}>
                            <Update />
                            Just Updated
                </div>
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
