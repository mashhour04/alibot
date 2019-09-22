import React, { Component } from "react";
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
import Modal from '@material-ui/core/Modal';
import { InputLabel, Input, Select, MenuItem, Checkbox, ListItemText, FormControl } from '@material-ui/core';

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


import statics from "../../_assets/statics/tables.json";

// Dialog Core Components
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

// Redux Actions
import { vendorActions } from "../../_actions/vendor.actions";

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

const closeImg = { cursor: 'pointer', float: 'right', marginTop: '5px', width: '30px' };

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

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

class MyTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      selectAll: false,
      daysOfWeek: [],
      daysOfMonth: [],
      hoursOfDay: [],
    }
  }

  render() {
    const { classes, tables, bookings, vendor } = this.props;
    const { modalOpen } = this.state;

    const tablesData = tables.map(({ name, capacity, availability, altId, _id }, index) => {
      name = (name) ? name : `Table${index + 1}`;
      name = name.replace(/\s+/g, '');
      delete availability.daysOfMonth;
      return { name, capacity, ...availability, altId, _id };
    });


    console.log('inital bookings', bookings);
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {vendor.loading ? <CircularIndeterminate></CircularIndeterminate> :
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Tables Management</h4>
                <p className={classes.cardCategoryWhite}>
                  Here you can check your restaurant tables and manage them
              </p>
              </CardHeader>
              <CardBody>
                <Button onClick={() => this.setState({ modalOpen: true })}><Add></Add>Insert</Button>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Table", "Capacity", "Hours", "Week Days", "ID", "Action"]}
                  tableData={tablesData}
                  scrollable={true}
                  hasActions={true}
                  extraActions={this.actions}
                />
              </CardBody>
            </Card>
          }
        </GridItem>
        <Dialog
          open={this.state.dialogOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleDialogClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Are you sure?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Would you like to remove this item from the list ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="secondary" value="no">
              No
            </Button>
            <Button onClick={this.handleDialogClose} color="primary" value="yes">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={modalOpen}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Enter Table</h4>
                <p className={classes.cardCategoryWhite}>Enter Table Data</p>
                <img onClick={() => {
                  this.setState({
                    modalOpen: false
                  })
                }} src='https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png' style={closeImg} />
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText={'Capacity'}
                      id="capacity"
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
                  <GridItem xs={12} sm={10} md={6}>
                    <FormControl fullWidth={true}>
                      <InputLabel style={{ paddingRight: '2%' }} htmlFor="select-multiple-checkbox">Days Of Week</InputLabel>
                      <Select
                        multiple
                        value={this.state.daysOfWeek}
                        name={'daysOfWeek'}
                        onChange={this.handleChange}
                        input={<Input id="select-weekdays" />}
                        renderValue={selected => selected.join(', ')}
                      >
                        <MenuItem key="-1" value={this.state.selectAll ? "Unselect" : "Select All"}>

                          <ListItemText primary={this.state.selectAll ? "Unselect" : "Select All"} />
                        </MenuItem>

                        {statics.daysOfWeek.map((day, key) => (
                          <MenuItem key={day.value} value={day.value}>

                            <ListItemText primary={day.label} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                  </GridItem>
                  <GridItem xs={12} sm={10} md={6}>
                    <FormControl fullWidth={true}>
                      <InputLabel style={{ paddingRight: '2%' }} htmlFor="select-multiple-checkbox">Month Days</InputLabel>
                      <Select
                        multiple
                        value={this.state.daysOfMonth}
                        name={'daysOfMonth'}
                        onChange={this.handleChange}
                        input={<Input id="select-month" />}
                        renderValue={selected => selected.join(', ')}
                      >
                        {statics.daysOfMonth.map((day, key) => (
                          <MenuItem key={key} value={day.value}>

                            <ListItemText primary={day.label} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>

                <GridContainer>

                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl
                      fullWidth={true}
                      className={classes.formControl}
                    >
                      <InputLabel className={classes.labelRoot} htmlFor="select-multiple-checkbox">Available Hours</InputLabel>
                      <Select
                        multiple
                        value={this.state.hoursOfDay}
                        name={'hoursOfDay'}
                        onChange={this.handleChange}
                        input={<Input id="select-hours" />}
                        renderValue={selected => selected.join(', ')}
                      >
                        <MenuItem key="-1" value={this.state.selectAll ? "Unselect" : "Select All"}>

                          <ListItemText primary={this.state.selectAll ? "Unselect" : "Select All"} />
                        </MenuItem>
                        {statics.hoursOfDay.map((value, key) => (
                          <MenuItem key={key} value={value}>

                            <ListItemText primary={value} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button onClick={this.handleSubmit} id="profile" color="primary">Add Table</Button>
              </CardFooter>
            </Card>
          </div>
        </Modal>
      </GridContainer>
    );
  }

  state = {
    dialogOpen: false
  }
  actions = [{
    value: 'delete',
    label: 'Delete Table',
    callback: (row) => {
      this.dialogRow = row;
      this.setState({ dialogOpen: true });
    }
  }]

  handleDialogClose = (e, row) => {
    console.log('event', e.target.innerText);
    const value = e.target.innerText;
    if (value === 'YES' && this.dialogRow) {
      this.props.dispatch(vendorActions.deleteTable({ row: this.dialogRow }))
      this.props.dispatch(vendorActions.getVendor({ skip: 0, limit: 200 }));
    }
    this.setState({ dialogOpen: false });
  };

  handleSubmit = () => {
    const { capacity, hoursOfDay, daysOfWeek, daysOfMonth } = this.state;
    if (!capacity) { return toastr.error('you have to enter table capacity'); }

    if (hoursOfDay.length === 0) { return toastr.error('at least pick on timeslot in the day'); }

    if (daysOfWeek.length === 0) { return toastr.error('at least pick one week day'); }
    console.log('dispactching insertion', { capacity, hoursOfDay, daysOfWeek, daysOfMonth });
    this.props.dispatch(vendorActions.insertTable({ capacity, hoursOfDay, daysOfWeek, daysOfMonth }));
    this.props.dispatch(vendorActions.getVendor({ skip: 0, limit: 200 }));
    this.setState({
      modalOpen: false
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    console.log('value given', value);
    if (value && value.includes('Select All')) {
      let save = statics[name];
      if(name === 'daysOfWeek' || name === 'daysOfMonth') {
        save = statics[name].map(o => o.value)
      }
      this.setState({
        [name]: save,
        selectAll: true
      })
    } else if (value && value.includes('Unselect')) {
      console.log('setting name to', name)
      this.setState({
        [name]: [],
        selectAll: false
      })
    } else {
      this.setState({
        [name]: value,
      })
    }

    console.log('name', name, 'value', value);
  }

  handleClose = () => {
    this.setState({
      modalOpen: false
    })
  }
}

function mapStateToProps(state) {
  const { user, vendor, bookings } = state;
  const tables = vendor.tables || [];
  return { user, vendor, tables, bookings };
}
export default connect(mapStateToProps)(withStyles(styles)(MyTables));