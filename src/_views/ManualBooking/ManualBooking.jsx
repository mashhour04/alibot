import React, { Component } from "react";
import { connect } from 'react-redux';
import moment from 'moment/min/moment-with-locales';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import { InputLabel, Input, MenuItem, ListItemText, FormControl, Select } from '@material-ui/core';

import { MuiPickersUtilsProvider, DatePicker, Day } from 'material-ui-pickers';

import MomentUtils from '@date-io/moment';
import { vendorActions } from '../../_actions/vendor.actions';
import { bookingActions } from '../../_actions/booking.actions';
import {default as ReactSelect} from 'react-select';
// core components
import GridItem from "../../_components/Grid/GridItem.jsx";
import GridContainer from "../../_components/Grid/GridContainer.jsx";
import Card from "../../_components/Card/Card.jsx";
import CardHeader from "../../_components/Card/CardHeader.jsx";
import CardBody from "../../_components/Card/CardBody.jsx";
import CardFooter from "../../_components/Card/CardFooter";
import CircularIndeterminate from '../../_components/CircularIndeterminate/Loading.jsx';
import CustomInput from "../../_components/CustomInput/CustomInput";
import { Toast } from "../../_helpers";

import statics from "../../_assets/statics/tables.json";

// Remember to include timepicker.css
// If you can import CSS in JS:
import 'react-timepicker/timepicker.css';
import { updateLocale } from "moment";

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
    // console.log('style', top);
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}



class ManualBooking extends Component {
    constructor() {
        super()

        this.state = {
            selectedTime: '',
            selectedDate: new Date(),
            selectedDay: moment().startOf('day').toDate(),
            table: undefined,
        }
    }
    handleChange = event => {
        console.log('the event', event.target.name, event.target.value);
        const { name, value } = event.target;
        this.setState({ [name]: value });
        if (name === 'capacity') {
            this.handleGettingAvailable({ numberOfPeople: value });
        }
    }

    handleTableChange = table => {
        this.setState({ tableId: table._id, table });
    }

    handleGettingAvailable = ({ dateOfBooking, numberOfPeople }) => {
        let { vendor } = this.props;
        vendor = vendor.vendor || {};
        const vendorId = vendor._id;
        let timestamp, capacityValue;

        if (numberOfPeople) {
            const { selectedDate } = this.state;
            if (!selectedDate) { return; }
            timestamp = moment(selectedDate).format('x');
            capacityValue = numberOfPeople;
        }
        if (dateOfBooking) {
            const { capacity } = this.state;
            if (!capacity) { return; }
            capacityValue = capacity;
            timestamp = moment(dateOfBooking).format('x');
        }
        if (capacityValue && timestamp) {
            this.props.dispatch(vendorActions.getAvailableTables({ timestamp, capacity: capacityValue, vendorId }));
        }
    }

    handleDateChange = ({ hours, minutes, date, target }) => {
        console.log('the date', date);
        if (target) {
            const { value } = target;
            hours = parseInt(value.split(':')[0], 10);
            minutes = parseInt(value.split(':')[1], 10);
        }
        // const { selectedDate } = this.state;
        let { selectedDay } = this.state;
        let time = moment(selectedDay);
        const update = {};
        if (date) {
            selectedDay = moment(date).startOf('day').toDate();
            time = moment(date);
        }
        if (minutes >= 0) {
            update.minutes = minutes;
            time = time.add(minutes, 'minutes');
        }
        if (hours >= 0) {
            update.hours = hours;
            time = time.add(hours, 'hours');

        }
        console.log('the date after update', time.toDate());
        this.setState({ selectedDate: time.toDate(), table: undefined, selectedDay });

        this.handleGettingAvailable({ dateOfBooking: time.toDate() });
    };

    handleSubmit = () => {
        let { vendor, availableTables } = this.props;
        const { name, capacity, selectedDate, email } = this.state;


        vendor = vendor.vendor || {};
        const vendorId = vendor._id;

        const table = this.getChoosenTable(availableTables, capacity);
        const tableId = (table) ? table._id : null;
        if (!selectedDate) {
            return Toast.fire({
                type: 'error',
                title: 'you have to choose a date and time'
            });
        }

        if (!table) {
            return Toast.fire({
                type: 'error',
                title: 'you have to choose a table'
            });
        }

        if (!name) {
            return Toast.fire({
                type: 'error',
                title: 'you have to choose a name for the customer'
            });
        }

        if (!capacity) {
            return Toast.fire({
                type: 'error',
                title: 'you have to choose number of people'
            });
        }
        this.props.dispatch(bookingActions.addBooking({ vendorId, name, email, capacity, tableId, timestamp: moment(selectedDate).format('x') }));
    }

    getChoosenTable(tables, capacity) {
        capacity = parseInt(capacity, 10);
        if (tables && tables.length) {
            let closest = tables.reduce(function (prev, curr) {

                const currValue = parseInt(curr.capacity, 10), prevValue = parseInt(prev.capacity, 10);
                console.log('prev', prevValue, prev)
                console.log('current', currValue, 'abs', (Math.abs(currValue - capacity) < Math.abs(prevValue - capacity)), curr, prev)
                return (Math.abs(currValue - capacity) < Math.abs(prevValue - capacity) ? curr : prev);
            });
            return closest
        } else {
            console.log('choosen table', null)
            return null;
        }

    }
    render() {
        const { classes, availableTables } = this.props;
        const { selectedDate, capacity, selectedTime } = this.state;
        const availableOptions = (availableTables.length) ? availableTables.map((table) => {
            table.label = (table.name && table.name !== '') ? table.name : table.altId;
            table.value = table._id;
            return table;
        }) : [];
        const table = this.getChoosenTable(availableTables, capacity);
        const closeImg = { cursor: 'pointer', float: 'right', marginTop: '5px', width: '30px' };
        console.log('options', availableOptions, availableTables, table);
        return (<div style={getModalStyle()} className={classes.paper}>
            <Card>

                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Enter Booking</h4>
                    <p className={classes.cardCategoryWhite}>Enter Booking Data</p>
                    <img onClick={() => {
                        this.props.onClose();
                    }} src='https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png' style={closeImg} />
                </CardHeader>
                <CardBody>
                    <GridContainer>
                        <GridItem xs={6} sm={6} md={6}>
                            <CustomInput
                                labelText={'Name (required)'}
                                id="Name"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    name: 'name',
                                    type: 'text',
                                    onChange: this.handleChange
                                }}
                            />
                        </GridItem>
                        <GridItem xs={6} sm={6} md={6}>
                            <CustomInput
                                labelText={'Email (optional)'}
                                id="email"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    name: 'email',
                                    type: 'email',
                                    onChange: this.handleChange
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                labelText={'Number Of People (required)'}
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
                                    onChange={(date) => { this.handleDateChange({ date }) }}
                                    minDate={new Date()}
                                    style={{ width: "100%" }}
                                />
                            </MuiPickersUtilsProvider>
                        </GridItem>
                    </GridContainer>
                    {/* <MuiPickersUtilsProvider utils={MomentUtils}>
                        <Grid container className={classes.grid} justify="space-around" style={{ width: "100%" }}>
                            <Timepicker
                                margin="normal"
                                label="Time"
                                value={selectedDate}
                                onChange={(hours, minutes) => { this.handleDateChange({ hours, minutes }) }}
                                hours={new Date().getHours()}
                                minutes={new Date().getMinutes()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider> */}
                    <GridContainer>
              <GridItem xs={12} xm={12} md={12}>
                <FormControl
                  fullWidth={true}
                  className={classes.formControl}
                  style={{ width: "100%" }}
                >
                  <InputLabel
                    className={classes.labelRoot}
                    htmlFor="select-multiple-checkbox"
                  >
                    Time
                  </InputLabel>
                  <Select
                    name={"time"}
                    value={selectedTime}
                    onChange={this.handleDateChange}
                    input={<Input id="select-hours" />}
                    style={{ width: "100%" }}
                  >
                    {statics.hoursOfDay.map((value, key) => (
                      <MenuItem key={key} value={value}>
                        <ListItemText primary={value} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>
            </GridContainer>
         
                    <GridContainer>
                        {
                            (availableTables && availableTables.length >= 0) ? <GridItem xs={12} sm={12} md={12} style={{ marginTop: '10px' }}>
                                <FormControl
                                    fullWidth={true}
                                    className={classes.formControl}
                                >
                                    <ReactSelect
                                        multiple
                                        value={availableOptions.length ? (table) : ''}
                                        name={'table'}
                                        onChange={this.handleTableChange}
                                        input={<Input id="select-tables" />}
                                        placeholder={availableOptions.length ? 'Available Table' : (table) ? (table.name || table.altId) : 'No available tables at this time'}
                                        // renderValue={selected => selected.join(', ')}
                                        options={availableOptions}
                                        isDisabled={true}
                                    >
                                        {/* {availableTables.map((table, key) => (
                                            <MenuItem key={key} value={(table.name && table.name !== '') ? table.name : table.altId}>
                                                <Checkbox />
                                                <ListItemText primary={(table.name && table.name !== '') ? table.name : table.altId} />
                                            </MenuItem>
                                        ))} */}
                                    </ReactSelect>
                                </FormControl>
                            </GridItem> : (availableTables && availableTables.loading) ? <CircularIndeterminate></CircularIndeterminate> : <div></div>
                        }

                    </GridContainer>
                </CardBody>
                <CardFooter>
                    <Button onClick={this.handleSubmit} id="profile" color="primary" style={{ border: "1px solid #3f51b5 !important", borderRadius: "20px", width: "40%", marginLeft: "30%" }}>Add Booking</Button>
                </CardFooter>
            </Card>
        </div>)
    }
}

function mapStateToProps(state) {
    const { vendor, availableTables } = state;
    return { vendor, availableTables };
}
export default connect(mapStateToProps)(withStyles(styles)(ManualBooking));