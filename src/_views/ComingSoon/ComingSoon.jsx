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
        backgroundColor: "#1875f0",
        width: "138px",
        height: "47px",
        borderRadius: "25px",
        color: "white",
        border: "none",
        "&:hover,&:focus": {
            backgroundColor: "#0b438e",
        }
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
        
        if(deals.allDeals && deals.allDeals.length !== 0) {
            deals.allDeals.map((deal) => {
                deal.daysOfWeek = [];
                if(deal.availability.type == 'anytime') {
                    deal.duration = '-';
                    deal.status = 'active';
                } else {
                    const from = new Date(deal.availability.period.from);
                    const to = new Date(deal.availability.period.to);
                    const diffTime = Math.abs(to - from);
                    const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                    deal.duration = duration + ' day(s)';
                    if(to.getTime() >= new Date().getTime()) deal.status = 'active';
                    else deal.status = 'stopped';
                }
                deal.availability.daysOfWeek.map((day, key) => {
                    deal.daysOfWeek.push(statics.daysOfTheWeek[day].label);
                })
            })
            return (
                <div>
                    <a className="nav-link" href="/create-deal">
                        <button className={classes.createDeal}>Create deal</button>
                    </a>
                    <table className={classes.table}>
                        <tr>
                            <th className={classes.th}>Deal name</th>
                            <th className={classes.th}>Deal type</th>
                            <th className={classes.th}>Duration</th>
                            <th className={classes.th}>Days of the week</th>
                            <th className={classes.th}>Status</th>
                        </tr>
                        {
                            deals.allDeals.map((deal, key) => {
                                return (
                                    <tr key={key}>           
                                        <td className={classes.td}>{deal.name}</td>
                                        <td className={classes.td}>{deal.type}</td>
                                        <td className={classes.td}>{deal.duration}</td>
                                        <td className={classes.td}>{deal.daysOfWeek.join(', ')}</td>
                                        <td className={classes.td}>{deal.status}</td>                            
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
                        <tr>           
                            <td className={classes.td}>-</td>
                            <td className={classes.td}>-</td>
                            <td className={classes.td}>-</td>
                            <td className={classes.td}>-</td>
                            <td className={classes.td}>-</td>                            
                        </tr>
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