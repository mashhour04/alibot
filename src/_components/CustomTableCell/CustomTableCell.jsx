import React, { Component } from "react";
import { connect } from 'react-redux';

import PropTypes from "prop-types";

import { FormControl, Select, MenuItem, Checkbox, ListItemText } from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";
import Input from "@material-ui/core/Input";
// @material-ui/icons
import TableCell from "@material-ui/core/TableCell";

import { vendorActions } from "../../_actions/vendor.actions";
import statics from "../../_assets/statics/tables.json";
import CustomInput from "../CustomInput/CustomInput";

//Style
import cellStyle from "../../_assets/jss/material-dashboard-react/components/cellStyle.jsx";

class CustomTableCell extends Component {

    onCellClick = (row, prop, isReadOnly) => {
        if(isReadOnly) { return; }
        if (prop === 'capacity' || prop === 'name') {
            let { row } = this.props;
            row.editing = prop;

            this.setState({
                row
            })
        }
    }

    handleValueChange = (event) => {
        const { name, value } = event.target;
        const { row } = this.props;
        row[name] = value;
        row.editing = false;
        this.setState({
            row
        }, () => {
            this.props.dispatch(vendorActions.updateTable({ row, name, value }));
        })

    }

    render() {
        const {
            row,
            prop,
            key,
            cellProps,
            isReadOnly,
        } = this.props;
        return (

            <TableCell
                onClick={() => this.onCellClick(row, prop, isReadOnly)}
                {...cellProps}
            >
                {row.editing === prop ? <CustomInput
                    id="username"
                    formControlProps={{
                        fullWidth: false
                    }}

                    inputProps={
                        {
                            onBlur: this.handleValueChange,
                            name: prop
                        }
                    }
                /> : this.renderCell(row[prop], prop)}
            </TableCell>

        );
    }

    renderCell = (element, prop) => {
        if (!Array.isArray(element)) {

            return element
        }
        return (
            <FormControl fullWidth={true}>
                <Select
                    multiple
                    value={element}
                    name={prop}
                    onChange={this.handleValueChange}
                    input={<Input id="select-weekdays" />}
                    renderValue={selected => selected.join(', ')}
                >
                    {statics[prop].map((item, key) => (
                        <MenuItem key={key} value={item.value ? item.value : item }>
                         
                            <ListItemText primary={item.label ? item.label : item} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )
    }
}



CustomTableCell.propTypes = {
    row: PropTypes.any,
    prop: PropTypes.node,
    key: PropTypes.node,
    isReadOnly: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {}
}
export default connect(mapStateToProps)(withStyles(cellStyle)(CustomTableCell));
