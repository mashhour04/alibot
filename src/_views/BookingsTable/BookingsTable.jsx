import React, { Component } from "react";
import { connect } from 'react-redux';
import moment from 'moment/min/moment-with-locales';



// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
import Modal from '@material-ui/core/Modal';
import { InputLabel, Input, Select, MenuItem, Checkbox, ListItemText, FormControl } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';


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
    }
});

function getModalStyle() {
    const top = 50 + Math.random();
    const left = 50 + Math.random();
    console.log('style', top);
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
class Bookings extends Component {

    state = {
        insertOpen: false,
        selectedDate: new Date()
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
        const { classes, bookings } = this.props;
        const { selectedDate } = this.state;
        let bookingsData = (bookings.loading || bookings.error) ? [] : bookings.filter(o => o.userId && o.vendorPathId);
        bookingsData = bookingsData.filter(({ vendorPathId }) => {
            return vendorPathId;
        })
        bookingsData = bookingsData.map(({ userId, status, vendorPathId, date }, index) => {
            const phone = (userId.phone) ? userId.phone : 'N/A';
            const email = (userId.email) ? userId.email : 'N/A';
            return {
                id: index + 1,
                name: `${userId.firstName} ${userId.lastName}`,
                date: moment(date).locale('fr').format('LLLL'),
                capacity: vendorPathId.capacity,
                table: vendorPathId.altId,
                status,
                phone,
                email
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
                            <Button onClick={() => this.setState({ insertOpen: true })}><Add></Add>Insert</Button>
                            <Table
                                tableHeaderColor="primary"
                                tableHead={["#", "Name", "Date", "Number of People", "Table", "Status", "Phone", "Email"]}
                                tableData={bookingsData}
                            />
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.insertOpen}
                                onClose={this.insertCloseHandler}
                            >
                                <div style={getModalStyle()} className={classes.paper}>
                                    <Card>
                                        <CardHeader color="primary">
                                            <h4 className={classes.cardTitleWhite}>Enter Booking</h4>
                                            <p className={classes.cardCategoryWhite}>Enter Booking Data</p>
                                        </CardHeader>
                                        <CardBody>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={12}>
                                                    <CustomInput
                                                        labelText={'Name'}
                                                        id="Name"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            name: 'capacity',
                                                            type: 'number',
                                                            onChange: this.handleChange
                                                        }}
                                                    />
                                                </GridItem>
                                            </GridContainer>
                                            <GridContainer>
                                                <GridItem xs={12} xm={12} md={12}>
                                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                                        <DatePicker
                                                            margin="normal"
                                                            label="Date"
                                                            value={selectedDate}
                                                            onChange={this.handleDateChange}
                                                            style={{ width: "100%" }}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                </GridItem>
                                            </GridContainer>
                                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                                <Grid container className={classes.grid} justify="space-around" style={{ width: "100%" }}>
                                                    <TimePicker
                                                        margin="normal"
                                                        label="Time"
                                                        value={selectedDate}
                                                        onChange={this.handleDateChange}
                                                        style={{ width: "100%" }}
                                                    />
                                                </Grid>
                                            </MuiPickersUtilsProvider>
                                            <GridContainer>

                                                <GridItem xs={12} sm={12} md={12}>
                                                    <FormControl
                                                        fullWidth={true}
                                                        className={classes.formControl}
                                                    >
                                                        {/* <InputLabel className={classes.labelRoot} htmlFor="select-multiple-checkbox">Available Hours</InputLabel>
                                                        <Select
                                                            multiple
                                                            value={element}
                                                            name={prop}
                                                            onChange={this.handleValueChange}
                                                            input={<Input id="select-weekdays" />}
                                                            renderValue={selected => selected.join(', ')}
                                                        >
                                                            {statics[prop].map((item, key) => (
                                                                <MenuItem key={key} value={item.value ? item.value : item}>
                                                                    <Checkbox />
                                                                    <ListItemText primary={item.label ? item.label : item} />
                                                                </MenuItem>
                                                            ))}
                                                        </Select> */}
                                                    </FormControl>
                                                </GridItem>
                                            </GridContainer>
                                        </CardBody>
                                        <CardFooter>
                                            <Button onClick={this.handleSubmit} id="profile" color="primary" style={{ border: "1px solid #3f51b5 !important", borderRadius: "20px", width: "40%", marginLeft: "30%" }}>Add Booking</Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </Modal>
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