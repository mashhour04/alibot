import React from "react";
import { Component } from "react";
import { dealsActions } from "../../_actions/deals.actions";
import { connect } from 'react-redux';

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import "react-under-construction/build/css/index.css";
import Check from "@material-ui/icons/Check";

import Calendar from "rc-calendar";

import InputLabel from "@material-ui/core/InputLabel";

import { Label } from "reactstrap";
// core ../../_components
import GridItem from "../../_components/Grid/GridItem.jsx";
import GridContainer from "../../_components/Grid/GridContainer.jsx";
import CustomInput from "../../_components/CustomInput/CustomInput.jsx";
import Button from "../../_components/CustomButtons/Button.jsx";
import Card from "../../_components/Card/Card.jsx";
import CardHeader from "../../_components/Card/CardHeader.jsx";
import CardBody from "../../_components/Card/CardBody.jsx";
import CardFooter from "../../_components/Card/CardFooter.jsx";

//material ui component
import {
  Select,
  MenuItem,
  Checkbox,
  Input,
  ListItemText,
  FormControl,
  Radio,
  RadioGroup,
  FormHelperText,
  FormControlLabel,
  FormLabel
} from "@material-ui/core";

import statics from "../../_assets/statics/tables.json";

const styles = {
  label: {
    color: "black",
    fontSize: "18px"
  },
  dealName: {
    width: "300px",
    border: "2px solid #4692f7",
    height: "37px",
    borderRadius: "6px"
  },
  createDeal: {
    backgroundColor: "#1875f0",
    width: "185px",
    height: "47px",
    borderRadius: "25px",
    color: "white",
    border: "none",
    marginTop: "74px",
    marginLeft: "620px",
    "&:hover,&:focus": {
      backgroundColor: "#0b438e"
    }
  },
  checkedIcon: {
    width: "24px",
    height: "24px",
    border: "2px solid #4692f7",
    borderRadius: "3px"
  },
  checkedRadioIcon: {
    // border: "2=px solid #4692f7",
  },
  uncheckedRadioIcon: {
    // border: "2px solid #4692f7",
  },
  uncheckedIcon: {
    width: "7px",
    height: "7px",
    padding: "10px",
    border: "2px solid #4692f7",
    borderRadius: "3px"
  },
  firstAvailabilityType: {
    background: "white",
    outline: "none",
    border: "none",
    width: "220px",
    height: "50px",
    fontWeight: "bold"
  },
  secondAvailabilityType: {
    background: "white",
    outline: "none",
    border: "none",
    width: "220px",
    height: "50px",
    fontWeight: "bold"
  },
  availabilityTypes: {
    marginLeft: "300px"
  }
};

const date = "2015-06-26";
class createDeal extends Component {
  state = {
    dealType: "deal-of-the-week",
    daysOfWeek: [
      { key: 0, value: "Sunday" },
      { key: 1, value: "Monday" },
      { key: 2, value: "Tuesday" },
      { key: 3, value: "Wednesday" },
      { key: 4, value: "Thursday" },
      { key: 5, value: "Friday" },
      { key: 6, value: "Saturday" }
    ],
    dealOfTheWeekChecked: false,
    inBotDealChecked: false,
    showCalendar: false,
    limitedChecked: false,
    noLimitChecked: false,
    dealData: {
      name: "",
      type: "",
      availability: {
        daysOfWeek: [],
        type: ""
      },
      description: "",
      limit: {
        type: ''
      },
    }
  };
  changeDealType = event => {
    let { dealData, dealOfTheWeekChecked, inBotDealChecked } = this.state;
    dealData.type = event.target.value;

    if (event.target.value == "in-bot_deal") {
      inBotDealChecked = !this.state.inBotDealChecked;
      dealOfTheWeekChecked = false;
      this.setState({
        dealData,
        inBotDealChecked,
        dealOfTheWeekChecked
      });
    } else {
      dealOfTheWeekChecked = !this.state.dealOfTheWeekChecked;
      inBotDealChecked = false;
    }
    this.setState({
    dealData,
      inBotDealChecked,
      dealOfTheWeekChecked
    });
  };

  changeDealLimit = event => {
    let { dealData, limitedChecked, noLimitChecked } = this.state;

    if (event.target.value == "limited") {
        dealData.limit.type = 'limited';
        limitedChecked = true;
        noLimitChecked = false;
    } else {
      dealData.limit.type = 'noLimit';
      limitedChecked = false;
      noLimitChecked = true;
    }
    this.setState({
        dealData, limitedChecked, noLimitChecked
    });
  };
  
  stopDealAfter = event => {
    let { dealData } = this.state;
      dealData.limit.value = event.target.value;
    this.setState({
      dealData,
    });
  };
  changeAvailabilityType = typeClass => {
    if (document.getElementById(typeClass)) {
      document.getElementById(typeClass).style.background = "#1875f0";
      document.getElementById(typeClass).style.color = "white";
      const { dealData } = this.state;
      if (typeClass == "firstAvailabilityType") {
        dealData.availability.type = 'anytime';
        document.getElementById("secondAvailabilityType").style.background =
          "white";
        document.getElementById("secondAvailabilityType").style.color = "black";
        this.setState({
            showCalendar: false, dealData
        });
      } else {
        dealData.availability.type = 'specificPeriod';
        this.setState({
          showCalendar: true, dealData
        });
        document.getElementById("firstAvailabilityType").style.background =
          "white";
        document.getElementById("firstAvailabilityType").style.color = "black";
      }
    }
  };
  createDeal = () => {
    this.props.dispatch(dealsActions.createDeal(this.state.dealData));
  }
  selectFromDate(jsDate, dateString) {}
  selectToDate(jsDate, dateString) {}
  assignDealName = event => {
    const { dealData } = this.state;
    dealData.name = event.target.value;
    this.setState({
      dealData
    });
  };
  changeDealDescription = event => {
    const { dealData } = this.state;
    dealData.description = event.target.value;
    this.setState({
      dealData
    });
  };
  changeDaysOfWeek = event => {
    const { dealData } = this.state;
    if (!dealData.availability.daysOfWeek.includes(event.target.value)) {
      dealData.availability.daysOfWeek.push(event.target.value);
    } else {
      dealData.availability.daysOfWeek.splice(
        Number(dealData.availability.daysOfWeek.indexOf(event.target.value)),
        1
      );
    }
    this.setState({
      dealData
    });
  };
  render() {
    const { classes } = this.props;
    const cc = this.state.showCalendar ? (
      <div>
        <div className={classes.availabilityTypes}>
          <label className={classes.label}>From </label>
          <label style={{ marginLeft: "204px" }} className={classes.label}>
            Up to
          </label>
        </div>
        <div className={classes.availabilityTypes}>
          {/* <Calendar /> */}
          {/* <Calendar /> */}
          <input
            className={classes.dealName}
            style={{ width: "250px" }}
            type="text"
          ></input>
          <input
            className={classes.dealName}
            style={{ width: "250px" }}
            type="text"
          ></input>
        </div>
      </div>
    ) : null;
    return (
      <div>
        <div>
          <label className={classes.label}>
            What is the name of you Deal?{" "}
          </label>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <input
            className={classes.dealName}
            onChange={this.assignDealName}
            type="text"
            placeholder="Insert Deal Name"
          ></input>
        </div>
        <br />
        <br />
        <div>
          <label className={classes.label}>
            What is the type of you Deal?{" "}
          </label>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="radio"
            name="deal_of_the_week"
            value="deal_of_the_week"
            onChange={this.changeDealType}
            checked={this.state.dealOfTheWeekChecked}
          />{" "}
          Deal of the week &nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="radio"
            name="in-bot_deal"
            value="in-bot_deal"
            onChange={this.changeDealType}
            checked={this.state.inBotDealChecked}
          />{" "}
          In-Bot deal
        </div>
        <br />
        <br />
        <div>
          <label className={classes.label}>What does the Deal apply? </label>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {this.state.daysOfWeek.map((day, key) => {
            return (
              <span key={key}>
                {/* <input type="checkBox" name={day} value={day} onChange={this.changeDealType}/>{day.value} &nbsp;&nbsp; */}
                <Checkbox
                  tabIndex={-1}
                  name={day.value}
                  value={day.key}
                  onClick={this.changeDaysOfWeek}
                  checkedIcon={<Check className={classes.checkedIcon} />}
                  icon={<Check className={classes.uncheckedIcon} />}
                  classes={{
                    checked: classes.checked,
                    root: classes.root
                  }}
                />
                {day.value} &nbsp;&nbsp;
              </span>
            );
          })}
        </div>
        <br />
        <br />
        <div className={classes.availabilityTypes}>
          <button
            id="firstAvailabilityType"
            className={classes.firstAvailabilityType}
            onClick={() => this.changeAvailabilityType("firstAvailabilityType")}
          >
            Anytime
          </button>
          <button
            id="secondAvailabilityType"
            className={classes.secondAvailabilityType}
            onClick={() =>
              this.changeAvailabilityType("secondAvailabilityType")
            }
          >
            During a specific period
          </button>
        </div>

        <br />
        <br />
        {cc}
        <br />
        <br />
        <div>
          <label className={classes.label}>What is inside your Deal? </label>
          <input
            style={{ marginLeft: "72px", width: "300px", height: "100px" }}
            onChange={this.changeDealDescription}
            className={classes.dealName}
            type="text"
            placeholder="Example: get a free Desert and benefit from a 20% bill discount"
          ></input>
          <label
            style={{ marginLeft: "300px", marginTop: "10px" }}
            className={classes.label}
          >
            Not feeling inspired? <a href="/testing">Click here</a> to select
            one of our pre-set Deal templates
          </label>
        </div>
        <br />
        <br />
        <div>
          <label className={classes.label}>Deal limit </label>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            style={{ marginLeft: "175px" }}
            type="radio"
            name="limited"
            value="limited"
            onChange={this.changeDealLimit}
            checked={this.state.limitedChecked}
          />{" "}
          Stop my Deal after{" "}
          <input
            style={{ width: "125px" }}
            className={classes.dealName}
            type="text"
            onChange={this.stopDealAfter}
            placeholder="Insert number"
          />{" "}
          usage
          <br />
          <input
            style={{ marginLeft: "300px" }}
            type="radio"
            name="noLimit"
            value="noLimit"
            onChange={this.changeDealLimit}
            checked={this.state.noLimitChecked}
          />{" "}
          No limit
        </div>
        <button className={classes.createDeal} onClick={this.createDeal}>Submit for review</button>
      </div>
    );
  }
}
export default connect(null)(withStyles(styles)(createDeal));

