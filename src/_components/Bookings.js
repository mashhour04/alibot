import React from 'react';
import {  Table } from 'reactstrap';
import { bookingActions } from '../_actions/booking.actions';
import connect from 'react-redux/lib/connect/connect';
class Bookings extends React.Component {
    componentDidMount() {
        const { token } = this.props.user;
        this.props.dispatch(bookingActions.getBookings(token));
    }

    render() {
        return (<div className="col-lg-10 mt-2">
            <div className="card table-card">
                <div className="card-body">
                    <h4 className="mt-0 header-title">Coming Bookings </h4>
                    <div id="fm-datables_wrapper" className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                        <Table id="fm-datables" className="table datatables bookings table-responsive  table-bordered  no-footer"
                            role="grid">
                            <thead>
                                <tr role="row">
                                    <th className="sorting_asc" rowSpan="1" colSpan="1" style={{ width: 1 + '%' }}></th>
                                    <th className="sorting_asc" rowSpan="1" colSpan="1" style={{ width: 215.8 + 'px' }}>Date</th>
                                    <th className="sorting" rowSpan="1" colSpan="1" style={{ width: 215.8 + 'px' }}>User Name</th>
                                    <th className="sorting" rowSpan="1" colSpan="1" style={{ width: 215.8 + 'px' }}>Hour</th>
                                    <th className="sorting" rowSpan="1" colSpan="1" style={{ width: 215.8 + 'px' }}>People Number</th>
                                    <th className="sorting" rowSpan="1" colSpan="1" style={{ width: 215.8 + 'px' }}>Phone</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr role="row" className="odd">
                                    <td className="sorting_1">18-Feb-2018</td>
                                    <td>192.168.1.252</td>
                                    <td>NewYork, (USA)</td>
                                    <td> Safari </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>)
    }
}

function mapStateToProps(state) {
    const { bookings } = state;
    return {
        bookings
    };
}

export default connect(mapStateToProps)(Bookings);
// export default connect()(Bookings)