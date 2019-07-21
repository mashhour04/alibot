import React, { Component } from "react";
import { connect } from 'react-redux';
// import moment from 'moment/min/moment-with-locales';
import moment from 'moment';


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
import Modal from '@material-ui/core/Modal';
import { InputLabel, Input, Select, MenuItem, Checkbox, ListItemText, FormControl } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { vendorActions } from '../../_actions/vendor.actions';

// core components
import GridItem from "../../_components/Grid/GridItem.jsx";
import GridContainer from "../../_components/Grid/GridContainer.jsx";
import Table from "../../_components/Table/Table.jsx";
import Card from "../../_components/Card/Card.jsx";
import CardHeader from "../../_components/Card/CardHeader.jsx";
import CardBody from "../../_components/Card/CardBody.jsx";
import CardFooter from "../../_components/Card/CardFooter";
import CircularIndeterminate from '../../_components/CircularIndeterminate/Loading.jsx';
import CustomInput from "../../_components/CustomInput/CustomInput";


// View Components
import ManualBooking from '../ManualBooking/ManualBooking';
import { Toast } from "../../_helpers";

const styles = theme => ({
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
    },
    paper: {
        position: 'relative',
        width: theme.spacing.unit * 60,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    pastBookingsButton: {
        border: "1px solid",
        borderRadius: "65px",
        background: "#1775f1",
        color: "#FFFFFF",
        "&:hover": {
            background: "#FFFFFF !important",
            color: "#1775f1 !important",
        }
    }
});

class Bookings extends Component {

    state = {
        insertOpen: false,
        currentbookingStatus: 'Successful Bookings'
    }

    componentDidMount() {
        this.props.dispatch(vendorActions.getBookings({ skip: 0, limit: 20, type: 'past' }));
    }

    insertCloseHandler = () => {
        this.setState({
            insertOpen: false
        })
    }

    handleDateChange = date => {
        this.setState({ selectedDate: date });
    };

    render() {
        const { location, classes } = this.props;
        const { currentbookingStatus } = this.state;
        const tableHead = ["#", "Name", "Date", "Number of People", "Table", "Status", "Phone", "Email"];
        const bookingStatus = ['Successful Bookings', 'Unuccessful Bookings'];
        let type = (location && location.pathname.includes('past')) ? 'past' : 'coming';
        let bookings;
        let extraActions = [];
        if (type && type === 'past') {
            bookings = this.props.pastBookings;
            tableHead.push('Actions');
            extraActions = getExtraActions(currentbookingStatus);
        } else {
            bookings = this.props.bookings;
        }
        let bookingsData = (bookings.loading || bookings.error) ? [] : bookings.filter(o => o.userId && o.vendorPathId);
        bookingsData = bookingsData.filter(({ vendorPathId }) => {
            return vendorPathId;
        })
        bookingsData = bookingsData.map(({ userId, status, vendorPathId, date }, index) => {
            const phone = (userId.phone) ? userId.phone : 'N/A';
            const email = (userId.email) ? userId.email : 'N/A';
            return {
                id: index + 1,
                name: `${userId.firstName} ${userId.lastName || ''}`,
                date: moment(date).format('LLLL'),
                capacity: vendorPathId.capacity,
                table: vendorPathId.altId,
                status,
                phone,
                email,
            }
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
                            {type == 'past' ? <Button className={classes.pastBookingsButton} onClick={() => this.setState({ currentbookingStatus: (currentbookingStatus == bookingStatus[0] ? bookingStatus[1] : bookingStatus[0]) })}>{this.state.currentbookingStatus}</Button> :
                                <Button onClick={() => this.setState({ insertOpen: true })}><Add></Add>Insert</Button>
                            }
                            <Table
                                tableHeaderColor="primary"
                                tableHead={tableHead}
                                tableData={bookingsData}
                                hasActions={(type == 'past') ? true : false}
                                extraActions={(type == 'past') ? extraActions : []}
                            />
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.insertOpen}
                                onClose={this.insertCloseHandler}
                            >
                                <ManualBooking />
                            </Modal>
                        </CardBody>
                    </Card>}

                </GridItem>
            </GridContainer>
        )
    }
}
function getExtraActions(currentbookingStatus) {
    const first = (currentbookingStatus === 'Successful Bookings') ? {
        value: 'remove',
        label: 'Mark Unsuccessful',
        callback: (row) => {
            return changePastBookingStatus(row, 'remove')
        }
    } : {
            value: 'add',
            label: 'Mark Successful',
            callback: (row) => {
                return changePastBookingStatus(row, 'add')
            }
        };
    const actions = [first];
    return actions;
}

function changePastBookingStatus(booking, status) {
    console.log('we should change ', booking, 'to be', status);
}
function mapStateToProps(state) {
    const { vendor, bookings, pastBookings, addBooking } = state;
    return { vendor, bookings, pastBookings, addBooking };
}
export default connect(mapStateToProps)(withStyles(styles)(Bookings));