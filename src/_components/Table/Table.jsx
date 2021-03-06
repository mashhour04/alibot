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

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Done from '@material-ui/icons/Done';
import HighlightOff from '@material-ui/icons/HighlightOff';
import Tooltip from '@material-ui/core/Tooltip';


import PerfectScrollbar from 'react-perfect-scrollbar';
// core components
import tableStyle from "../../_assets/jss/material-dashboard-react/components/tableStyle.jsx";

import CustomTableCell from "../CustomTableCell/CustomTableCell";


import { vendorActions } from '../../_actions/vendor.actions';



class CustomTable extends Component {

  componentDidMount() {
    this.setState({ modalOpen: false, errors: {} });
  }

  render() {

    const { classes, tableHead, tableData, tableHeaderColor, hasActions, extraActions, isReadOnly } = this.props;

    return (
      <PerfectScrollbar>
        <div className={classes.tableResponsive}>
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
                return (
                  <TableRow key={key}>
                    {Object.keys(row).map((prop, key) => {
                      if (prop === '_id' || prop === 'payload') { return; }
                      return (
                        <CustomTableCell cellProps={{
                          key,
                          className: classes.tableCell,
                        
                        }} row={row} prop={prop} key={key} isReadOnly={isReadOnly}>
                        </CustomTableCell>
                      );
                    })}
                    {hasActions ?
                      extraActions.map((action, indexKey) => {

                        return (
                          <td key={indexKey}>
                            <Tooltip title={action.label}>
                              <IconButton onClick={() => { action.callback(row) }} aria-label={action.label || "Delete"} className={classes.actionButton.margin}>
                                {(() => {
                                  switch (action.value ) {
                                    case 'delete':
                                      return <DeleteIcon fontSize="small"></DeleteIcon>;
                                    case 'remove':
                                      return <HighlightOff fontSize="small"></HighlightOff>;
                                    case 'add':
                                      return <Done fontSize="small"></Done>;
                                    default:
                                      return null;
                                  }
                                })()


                                  // (action.value === 'delete') ?
                                  //   <DeleteIcon fontSize="small"></DeleteIcon> :
                                  //   (action.value === 'remove') ?
                                  //     <HighlightOff fontSize="small"></HighlightOff> :
                                  //     (action.value === 'add') ?
                                  //       <Done fontSize="small"></Done> :
                                  //       <div></div>
                                }
                              </IconButton>
                            </Tooltip>

                          </td>
                        )
                      })
                      : null}
                  </TableRow>
                );
              })
              }
            </TableBody>
          </Table>
        </div>
      </PerfectScrollbar>

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
  hasActions: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  extraActions: PropTypes.array,
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
