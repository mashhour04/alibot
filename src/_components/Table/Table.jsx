import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from 'react-redux';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import { InputLabel, Input, Select, MenuItem, Checkbox, ListItemText, FormControl } from '@material-ui/core';
import { toastr } from 'react-redux-toastr';
// core components
import tableStyle from "../../_assets/jss/material-dashboard-react/components/tableStyle.jsx";
import CustomInput from "../CustomInput/CustomInput";
import GridItem from "../Grid/GridItem.jsx";
import GridContainer from "../Grid/GridContainer.jsx";
import CustomTableCell from "../CustomTableCell/CustomTableCell";
import CardBody from "../Card/CardBody.jsx";
import CardHeader from "../Card/CardHeader.jsx";
import CardFooter from "../Card/CardFooter";

import statics from "../../_assets/statics/tables.json";
import { vendorActions } from '../../_actions/vendor.actions';

function getModalStyle() {
  const top = 50 + Math.random();
  const left = 50 + Math.random();
  console.log('top', top);
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class CustomTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      daysOfWeek: [],
      daysOfMonth: [],
      hoursOfDay: [],
    }
  }

  componentDidMount() {
    this.setState({ modalOpen: false, errors: {} });
  }

  handleSubmit = () => {
    const { capacity, hoursOfDay, daysOfWeek, daysOfMonth } = this.state;
    if (!capacity) { return toastr.error('you have to enter table capacity'); }

    if (hoursOfDay.length === 0) { return toastr.error('at least pick on timeslot in the day'); }

    if (daysOfWeek.length === 0) { return toastr.error('at least pick one week day'); }
    console.log('dispactching insertion', { capacity, hoursOfDay, daysOfWeek, daysOfMonth });
    this.props.dispatch(vendorActions.insertTable({ capacity, hoursOfDay, daysOfWeek, daysOfMonth}));
  }
  handleChange = (event) =>{
    const { name, value } = event.target;
    console.log('value given', value);
    this.setState({
      [name]: value
    })
    console.log('name', name, 'value', value);
  }
  render() {
    
    const { classes, tableHead, tableData, tableHeaderColor } = this.props;
    const { modalOpen } = this.state;

    return (
      <div className={classes.tableResponsive}>
        <Button onClick={() => this.setState({ modalOpen: true })}><Add></Add>Insert</Button>
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
              <TableRow>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={classes.tableCell + " " + classes.tableHeadCell}
                      key={key}
                    >
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData.map((row, key) => {
              console.log('row', row, 'key', key);
              return (
                <TableRow key={key}>
                  {Object.keys(row).map((prop, key) => {
                    return (
                      <CustomTableCell cellProps={{
                        key,
                        className: classes.tableCell
                      }} row={row} prop={prop} key={key} >

                      </CustomTableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
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
                        {statics.daysOfWeek.map((day, key) => (
                          <MenuItem key={day.value} value={day.value}>
                            <Checkbox />
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
                            <Checkbox />
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
                        {statics.hoursOfDay.map((value, key) => (
                          <MenuItem key={key} value={value}>
                            <Checkbox />
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
      </div>
    );
  }
}


CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.array,
  onCellClick: PropTypes.func
};

function mapStateToProps(state) {
  const { vendor } = state;
  const { tables } = vendor;

  return {
    vendor,
    tables
  }
}
export default connect(mapStateToProps)(withStyles(tableStyle)(CustomTable));
