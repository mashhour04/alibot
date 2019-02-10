import React from 'react';
import { Component } from 'react';
import { Table, Row, Col, Input } from 'reactstrap';
import Select from 'react-select';
import connect from 'react-redux/lib/connect/connect';
import { seatsActions } from '../_actions/seats.action';

import Analytics from './Analytics';
class Seats extends React.Component {
    componentDidMount() {
        // HERE DISPATCH TO GET ALL POSSIBLE OPTIONS
        this.props.dispatch(seatsActions.getAll());
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    }

    render() {
        const { selectedOption, options } = this.props.seats;
        console.log('options', options);
        return (
            <div>
                <Row>
                    <Col mt="2" size="lg-7">
                        <div className="card table-card">
                            <div className="card-body">

                                <h4 className="mt-0 header-title">Available Tables <button type="button" className="btn btn-primary modalOpen"
                                    data-toggle="modal" data-target="#manual-booking">Manual
                            Booking</button></h4>
                                <Col mt="2" >
                                    <Select
                                        value={selectedOption}
                                        onChange={this.handleChange}
                                        options={options}
                                    />
                                </Col>
                                <div id="fm-datables_wrapper" className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                                    <Table id="fm-datables" className="table datatables this-hour table-responsive  table-bordered  no-footer"
                                        role="grid">
                                        <thead>
                                            <tr role="row">
                                                <th className="sorting_asc" tabIndex="0" aria-controls="fm-datables"
                                                    rowSpan="1" colSpan="1" aria-label="Position: activate to sort column ascending"
                                                    style={{ width: 215 + 'px' }}></th>
                                                <th className="sorting" tabIndex="0" aria-controls="fm-datables"
                                                    rowSpan="1" colSpan="1" aria-label="Age: activate to sort column ascending"
                                                    style={{ width: 115 + 'px' }}>Booked</th>
                                                <th className="sorting" tabIndex="0" aria-controls="fm-datables"
                                                    rowSpan="1" colSpan="1" aria-label="Salary: activate to sort column ascending"
                                                    style={{ width: 115 + 'px' }}>Remaining</th>
                                                <th className="sorting" tabIndex="0" aria-controls="fm-datables"
                                                    rowSpan="1" colSpan="1" aria-label="Salary: activate to sort column ascending"
                                                    style={{ width: 115 + 'px' }}>Limit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr role="row" className="odd">
                                                <td className="sorting_1">18-Feb-2018</td>
                                                <td>anythin</td>
                                                <td>192.168.1.252</td>
                                                <td>NewYork, (USA)</td>
                                                <td> Safari </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

        )
    }
}

function mapStateToProps(state) {
    console.log('state', state);
    const { authentication, seats } = state;
    const { user } = authentication;
    return {
        seats,
        user,
    };
}

export default connect(mapStateToProps)(Seats);
// export default connect()(Bookings)