import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import 'react-under-construction/build/css/index.css';
import { defaultFont } from "../../../src/_assets/jss/material-dashboard-react";

import statics from "../../_assets/statics/tables.json";

import { dealsActions } from "../../_actions/deals.actions";


const styles = {
    createDeal: {
        backgroundColor: "#f3d81d",
        width: "138px",
        height: "47px",
        borderRadius: "25px",
        color: "white",
        border: "none",
    },
    table: {
        fontFamily: "arial, sans-serif",
        borderCollapse: "collapse",
        width: "100%",
        marginTop: "25px",
    },
      
    td: {
        textAlign: "center",
        padding: "8px",
        fontSize: "16px",
        backgroundColor: "white",
    },
    th : {
        textAlign: "center",
        padding: "8px",
        fontSize: "16px",
        backgroundColor: "#1875f0",
        color: "white",
    }
}


class ComingSoon extends Component {

    componentDidMount(){
        this.getDeals();

    }

    state = {
        allDeals: [{
            name: 'first deal',
            type: 'inBot',
            duration: '20',
            daysOfWeek: 'sunday',
            status: 'active',
        }] 
    }

    getDeals = () => {
        this.props.dispatch(dealsActions.getDeals({skip: 0, limit: 20}));
    }

    createDeal = (event) => {
        const { name, value } = event.target;
        console.log('value given', value);
    }
    render() {
        const { classes, deals } = this.props;
        
        if(deals && deals.length !== 0) {
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
            console.log(deals.allDeals);
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
            return (
                <div>
                    <button className={classes.createDeal}>Create deal</button>
                    <table className={classes.table}>
                        <tr>
                            <th className={classes.th}>Deal name</th>
                            <th className={classes.th}>Deal type</th>
                            <th className={classes.th}>Duration</th>
                            <th className={classes.th}>Days of the week</th>
                            <th className={classes.th}>Status</th>
                        </tr>
                        {
                            this.state.allDeals.map((deal, key) => {
                                return (
                                    <tr>           
                                        <td className={classes.td} key={key}>{deal.name}</td>
                                        <td className={classes.td} key={key}>{deal.name}</td>
                                        <td className={classes.td} key={key}>{deal.name}</td>
                                        <td className={classes.td} key={key}>{deal.name}</td>
                                        <td className={classes.td} key={key}>{deal.name}</td>                            
                                    </tr>
                                );
                            })
                        }
                    </table>
                </div>
            );
        } else {
            return (
                <div>
                    <button className={classes.createDeal}>Create deal</button>
                    <table className={classes.table}>
                        <tr>
                            <th className={classes.th}>Deal name</th>
                            <th className={classes.th}>Deal type</th>
                            <th className={classes.th}>Duration</th>
                            <th className={classes.th}>Days of the week</th>
                            <th className={classes.th}>Status</th>
                        </tr>
                        {
                            <tr>           
                                <td className={classes.td}>-</td>
                                <td className={classes.td}>-</td>
                                <td className={classes.td}>-</td>
                                <td className={classes.td}>-</td>
                                <td className={classes.td}>-</td>                            
                            </tr>
                        }
                    </table>
                </div>
            );
        }
    }
}

// export default withStyles(styles)(ComingSoon);
function mapStateToProps(state) {
    const { deals } = state;
    return { deals };
}
export default connect(mapStateToProps)(withStyles(styles)(ComingSoon));