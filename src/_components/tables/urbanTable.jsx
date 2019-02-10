import React, { Component } from 'react';

import connect from 'react-redux/lib/connect/connect';
import PlusBoxIcon from 'mdi-react/PlusBoxIcon'
import styles from './style.css';

// import Select from 'react-select';
import {
    Card,
    CardBody,
    CardTitle,
    Container,
    Input,
    FormGroup,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import ReactTable from "react-table";


// const daysOfWeek = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
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
        isOpen: false,
        iconOnly: false,
        dropdownOpen: false
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

    handleChange = (selectDayOfWeek) => {
        this.setState({ selectDayOfWeek });
    }

    render() {
        const { vendor, tables } = this.props;
        const { loading } = vendor;
        const { selectDayOfWeek } = this.state;
        const columns = ['name', 'availibilty'];
        return (
            <Card className={styles.jsgrid}>
                <CardBody>
                    <CardTitle>
                        Tables Management
               </CardTitle>
                    <div className="jsgrid-grid-header jsgrid-header-scrollbar">
                        <table className="jsgrid-table">

                            <tr className="jsgrid-header-row">
                                <th className="jsgrid-header-cell jsgrid-header-sortable jsgrid-header-sort jsgrid-header-sort-asc" style={{ width: '150px' }}>Name</th>
                                <th className="jsgrid-header-cell jsgrid-align-right jsgrid-header-sortable" style={{ width: '50px' }}>Age</th>
                                <th className="jsgrid-header-cell jsgrid-header-sortable" style={{ width: '200px' }}>Address</th>
                                <th className="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style={{ width: '200px' }}>Country</th>
                                <th className="jsgrid-header-cell jsgrid-header-sortable" style={{ width: '100px' }}>Is Married</th>
                                <th className="jsgrid-header-cell jsgrid-control-field jsgrid-align-center" style={{ width: '50px' }}>
                                    <PlusBoxIcon className="jsgrid-button jsgrid-mode-button jsgrid-insert-mode-button" />
                                    {/* <input className="jsgrid-button jsgrid-mode-button jsgrid-insert-mode-button" type="button" title="Switch to inserting" /> */}
                                </th>
                            </tr>

                            <tr className="jsgrid-filter-row">
                                <td className="jsgrid-cell" style={{ width: '150px' }}>
                                    <input type="text" /></td>
                                <td className="jsgrid-cell jsgrid-align-right" style={{ style: '50px' }}>
                                    <input type="number" /></td><td className="jsgrid-cell" style={{ width: '200px' }}>
                                    <input type="text" />
                                </td>
                                <td className="jsgrid-cell jsgrid-align-center" style={{ style: '200px' }}>
                                    <select style={{
                                    padding: '.4375rem .75rem',
                                    border: 0,
                                    outline: '1 px solid #f3f3f3',
                                    color: '#c9c8c8'
                                }}>
                                        <option value="0"></option>
                                    <option value="7">Russia</option>
                                    </select>
                                </td>
                            <td className="jsgrid-cell" style={{ style: '100px' }}></td>
                            <td className="jsgrid-cell jsgrid-control-field jsgrid-align-center" style={{ style: '50px' }}>
                                <input className="jsgrid-button jsgrid-search-button" type="button" title="Search" />
                                <input className="jsgrid-button jsgrid-clear-filter-button" type="button" title="Clear filter" />
                            </td>
                            </tr>

                        </table>
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
