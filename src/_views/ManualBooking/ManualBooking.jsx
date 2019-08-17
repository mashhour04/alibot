import React, { Component } from "react";
import { connect } from 'react-redux';
import moment from 'moment/min/moment-with-locales';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import { InputLabel, Input, MenuItem, Checkbox, ListItemText, FormControl } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { vendorActions } from '../../_actions/vendor.actions';
import { bookingActions } from '../../_actions/booking.actions';
import Select from 'react-select';
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
            selectedDate: undefined,
            table: undefined,
        }
    }
    handleChange = event => {

        console.log('the event', event.target.name, event.target.value);
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleTableChange = table => {
        this.setState({ tableId: table._id, table });
    }

    handleDateChange = date => {
        this.setState({ selectedDate: date, table: undefined });
        let { vendor } = this.props;
        vendor = vendor.vendor || {};
        const timestamp = moment(date).format('x');
        const vendorId = vendor._id;
        const { capacity } = this.state;
        if (capacity) {
            this.props.dispatch(vendorActions.getAvailableTables({ timestamp, capacity, vendorId }));
        }
    };

    handleSubmit = () => {
        let { vendor } = this.props;
        const { name, capacity, selectedDate, tableId, email } = this.state;


        vendor = vendor.vendor || {};
        const vendorId = vendor._id;
        if (!selectedDate) {
            return Toast.fire({
                type: 'error',
                title: 'you have to choose a date and time'
            });
        }

        if (!tableId) {
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
    render() {
        const { classes, availableTables } = this.props;
        const { selectedDate } = this.state;
        const availableOptions = (availableTables.length) ? availableTables.map((table) => {
            table.label = (table.name && table.name !== '') ? table.name : table.altId;
            table.value = table._id;
            return table;
        }) : [];
        console.log('options', availableOptions, availableTables);
        return (<div style={getModalStyle()} className={classes.paper}>
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Enter Booking</h4>
                    <p className={classes.cardCategoryWhite}>Enter Booking Data</p>
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
                                    onChange={this.handleDateChange}
                                    minDate={new Date()}
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
                                minDate={new Date()}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <GridContainer>
                        {
                            (availableTables && availableTables.length >= 0) ? <GridItem xs={12} sm={12} md={12} style={{ marginTop: '10px' }}>
                                <FormControl
                                    fullWidth={true}
                                    className={classes.formControl}
                                >
                                    <Select
                                        multiple
                                        value={this.state.table}
                                        name={'table'}
                                        onChange={this.handleTableChange}
                                        input={<Input id="select-tables" />}
                                        placeholder={availableOptions.length ? 'Available Table' : (this.state.table) ? (this.state.table.name || this.state.table.altId) : 'No available tables at this time'}
                                        // renderValue={selected => selected.join(', ')}
                                        options={availableOptions}
                                    >
                                        {/* {availableTables.map((table, key) => (
                                            <MenuItem key={key} value={(table.name && table.name !== '') ? table.name : table.altId}>
                                                <Checkbox />
                                                <ListItemText primary={(table.name && table.name !== '') ? table.name : table.altId} />
                                            </MenuItem>
                                        ))} */}
                                    </Select>
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