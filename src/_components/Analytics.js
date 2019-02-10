import React, { Component}  from 'react';
import { Col } from 'reactstrap';
import { connect } from 'react-redux';

class Analytics extends Component {
    
    componentDidMount() {
        // const { token } = this.props.user;
    }

    render() {
        return (
            <Col className="mt-2" size="lg-4">
                <div className="card">
                    <div className="card-body">
                        <h4 className="header-title">Bookings Chart</h4>
                        <ul className="list-inline widget-chart text-center">
                            <li>
                                <h4 className="">
                                    <b>past</b>
                                </h4>
                                <p className="text-muted m-b-0">Total Past</p>
                            </li>
                            <li>
                                <h4 className="">
                                    <b>pastWeek</b>
                                </h4>
                                <p className="text-muted m-b-0">Last week</p>
                            </li>
                            <li>
                                <h4 className="">
                                    <b>thisWeek</b>
                                </h4>
                                <p className="text-muted m-b-0">This Week</p>
                            </li>
                        </ul>
                        <div id="morris-donut-example"></div>
                    </div>
                </div>
            </Col>
        )
    }
}

function mapStateToProps(state) {
    const { analytics } = state;
    return {
        analytics
    };
}


export default connect(mapStateToProps)(Analytics);
