import React, { Component } from "react";
import { connect } from 'react-redux';
import moment from 'moment/min/moment-with-locales';


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridItem from "../../_components/Grid/GridItem.jsx";
import GridContainer from "../../_components/Grid/GridContainer.jsx";
import Table from "../../_components/Table/Table.jsx";
import Card from "../../_components/Card/Card.jsx";
import CardHeader from "../../_components/Card/CardHeader.jsx";
import CardBody from "../../_components/Card/CardBody.jsx";
import CircularIndeterminate from '../../_components/CircularIndeterminate/Loading.jsx';


const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    }
};

class Bookings extends Component {
    render() {
        const { classes, bookings } = this.props;
        const bookingsData = (bookings.loading || bookings.error) ? [] : bookings.map(({ userId, status, vendorPathId, date, phone }, index) => {
            phone = (phone) ? phone : 'N/A';
            return {
                id: index + 1,
                name: `${userId.firstName} ${userId.lastName}`,
                date: moment(date).locale('fr').format('LLLL'),
                capacity: vendorPathId.capacity,
                table: vendorPathId._id,
                status,
                phone
            };
        });
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    {(bookings.loading || bookings.error) ? <CircularIndeterminate></CircularIndeterminate> : <Card plain>
                        <CardHeader plain color="primary">
                            <h4 className={classes.cardTitleWhite}>
                                Bookings Management
                            </h4>
                            <p className={classes.cardCategoryWhite}>
                                Here are the the latest reservations to your vendor
                            </p>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="primary"
                                tableHead={["#", "Name", "Date", "Number of People", "Table", "Status", "Phone"]}
                                tableData={bookingsData}
                            />
                        </CardBody>
                    </Card>}

                </GridItem>
            </GridContainer>
        )
    }
}

function mapStateToProps(state) {
    const { vendor, bookings } = state;
    return { vendor, bookings };
}
export default connect(mapStateToProps)(withStyles(styles)(Bookings));