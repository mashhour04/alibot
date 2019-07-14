import React, { Component } from 'react';

import connect from 'react-redux/lib/connect/connect';
import PlusBoxIcon from 'mdi-react/PlusBoxIcon';

import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';

// const styles = theme => ({ })


// import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import styles from './style.css';
// const { BootstrapTable } = ReactBsTable.BootstrapTable;
// var TableHeaderColumn = ReactBsTable.TableHeaderColumn;


import {
    Card,
    CardBody,
    CardTitle,
} from 'reactstrap';

// const daysOfWeek = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const daysOfWeek = [{
    value: 'saturday',
    label: 'Saturday',
    },
    {
        value: 'sunday',
        label: 'Sunday',
    },
    {
        value: 'monday',
        label: 'Monday',
    },
    {
        value: 'tuesday',
        label: 'Tuesday',
    },
    {
        value: 'wednesday',
        label: 'Wednesday',
    },
    {
        value: 'thursday',
        label: 'Thursday',
    },
    {
        value: 'friday',
        label: 'Friday',
    },
]
class Tables extends Component {
    state = {
        daysOfWeek: [],
        isOpen: false,
        iconOnly: false,
        dropdownOpen: false
    };

    handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({
            daysOfWeek: value,
        });
    };

    componentDidMount = () => {
        const { tables } = this.props;
        const addingRow = { name: 'input', capacity: 'input', availbility: 'input' };
        if (tables) {
            console.log('adding the input row', addingRow);
            tables.unshift(addingRow);
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }


    toggleProfile = () => {
        this.setState({
            dropdownOpen: !this.state.isOpen
        });
    }

    handleChange = (event) => {
        this.setState({ daysOfWeek: event.target });
    }


    availbilityFormat = (cell, row) => {
        return (
            <Select
                multiple
                value={this.state.daysOfWeek}
                onChange={this.handleChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                    <div className={{
                        display: 'flex',
                        flexWrap: 'wrap',
                    }}>
                        {selected.map(value => (
                            <Chip key={value} label={value} />
                        ))}
                    </div>
                )}
                MenuProps={MenuProps}
            >
                {daysOfWeek.map(day => (
                    <MenuItem key={day.value} value={day.value}>
                        {day.label}
                    </MenuItem>
                ))}
            </Select>
        )
    }

    render() {
        const { vendor } = this.props;
        const { loading } = vendor;
        const { selectDayOfWeek } = this.state;
        const tables = [{
            id: '12312321423t4g45',
            name: 'First',
            capacity: 4,
            type: 'A',
            week: 'Thursday',
        }]
        const columns = [{
            dataField: 'id',
            text: 'Table ID',
            sort: true
        }, {
            dataField: 'capacity',
            text: 'Capacity',
            sort: true
            // editable: { type: 'textarea' }
        }, {
            dataField: 'week',
            text: 'Week Days',
            editable: { type: 'select', options: daysOfWeek, multiple: 1, defaultValue: 'saturday' },
            sort: true,
        }];
        const options = {
            page: 1,  // which page you want to show as default
            sizePerPageList: [{
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: tables.length
            }], // you can change the dropdown list for size per page
            sizePerPage: 5,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 5,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: true,
            paginationPosition: 'bottom'
        };
        const cellEditProp = {
            mode: 'click'
        };
        return (
            <Card className={styles.jsgrid}>
                <CardBody>
                    <CardTitle>
                        Tables Management
                    </CardTitle>
                    <div className="jsgrid-grid-header jsgrid-header-scrollbar">
                        <BootstrapTable
                            cellEdit={cellEditProp}
                            data={tables}
                            insertRow={true}
                            options={options}
                            pagination
                        // cellEdit={cellEditFactory({ mode: 'click', blurToSave: true })}
                        >
                            <TableHeaderColumn dataField='altId' isKey={true} >Table ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='capacity' editable={{ type: 'text' }}>Capacity</TableHeaderColumn>
                            <TableHeaderColumn dataFormat={this.availbilityFormat} dataField='week' editable={false}>Week Days</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </CardBody>
            </Card >
        );
    }
}


function mapStateToProps(state) {
    const { user, vendor, tables } = state;
    return { user, vendor, tables };
}

export default connect(mapStateToProps)(Tables);
