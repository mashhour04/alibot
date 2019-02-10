import React, { Component } from "react";
import { connect } from 'react-redux';
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { FormControl, Select, MenuItem, Checkbox, ListItemText } from '@material-ui/core';
import Input from "@material-ui/core/Input";
// @material-ui/icons
import TableCell from "@material-ui/core/TableCell";

import { vendorActions } from "../../_actions/vendor.actions";
import statics from "../../_assets/statics/tables.json";
import CustomInput from "../CustomInput/CustomInput";

class CustomTableCell extends Component {

    onCellClick = (row, prop, key) => {
        if (prop === 'capacity') {
            let { row } = this.props;
            row.editing = prop;

            this.setState({
                row
            })
        }
    }

    handleValueChange = (event) => {
        console.log('done with', event.target.name);
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
        } = this.props;
        return (

            <TableCell
                onClick={() => this.onCellClick(row, prop, key)}
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
            return (element)
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
                            <Checkbox />
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
};

const mapStateToProps = (state) => {
    return {}
}
export default connect(mapStateToProps)(CustomTableCell);
