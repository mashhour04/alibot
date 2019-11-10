import React from 'react';
import { Component } from 'react';
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import 'react-under-construction/build/css/index.css';


import InputLabel from "@material-ui/core/InputLabel";

import { Label } from 'reactstrap';
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
import { Select, MenuItem, Checkbox, Input, ListItemText, FormControl, Radio, RadioGroup, FormHelperText, FormControlLabel, FormLabel } from '@material-ui/core';


import statics from "../../_assets/statics/tables.json";

const styles = {
    title: {
        margin: '9% 0 20% 27%',
    },
    image: {
        height: '200px',
        position: 'relative',
    },
    text: {
        fontSize: '35px',
        fontFamily: "'Press Start 2P', cursive"
    },
    inputLabel: {
        fontSize: '18px',
        color: '#020202',
    },
    selectLabel: {
        fontSize: '18px',
        color: '#020202',
        marginTop: '5%'
    },
    radioSet: {
        marginLeft: '5%'
    },
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
}


class ComingSoon extends Component {

    state = {
        dealType: 'deal-of-the-week',
        daysOfWeek: []
    }

    handleDealTypeChange = (event, value) => {
        this.setState({ dealType: value });
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        console.log('value given', value);
        if (value && value.includes('Select All')) {
            let save = statics[name];
            if (name === 'daysOfWeek' || name === 'daysOfMonth') {
                save = statics[name].map(o => o.value)
            }
            this.setState({
                [name]: save,
                selectAll: true
            })
        } else if (value && value.includes('Unselect')) {
            this.setState({
                [name]: [],
                selectAll: false
            })
        } else {
            this.setState({
                [name]: value,
            })
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Create A Deal</h4>
                                <p className={classes.cardCategoryWhite}>Insert info about the deal</p>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText="Deal Name"
                                            labelProps={{
                                                className: classes.inputLabel
                                            }}
                                            id="dealName"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                name: 'dealName',
                                                onChange: this.onProfileChange,
                                                default: 'dealName'
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={12}>
                                        {/* style={{ paddingRight: '2%', marginBottom: '5%' }} */}
                                        <InputLabel className={classes.selectLabel} htmlFor="dealType"> Deal Type</InputLabel>
                                        <FormControl component="fieldset" className={classes.radioSet}>
                                            <RadioGroup aria-label="Deal-Type" name="dealType" value={this.state.dealType} onChange={this.handleDealTypeChange}>
                                                <FormControlLabel value='deal-of-the-week' control={<Radio value='deal-of-the-week' />} label="Deal of The Week" />
                                                <FormControlLabel value='in-bot-deal' control={<Radio value='in-bot-deal' />} label="In-Bot Deal" />
                                            </RadioGroup>
                                        </FormControl>
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={12}>
                                        <FormControl style={{ minWidth: '45%', marginTop: '1%', maxWidth: 220 }}>
                                            <InputLabel htmlFor="days-of-week">When Does This Deal Apply ?</InputLabel>
                                            <Select
                                                multiple
                                                value={this.state.daysOfWeek}
                                                name={'daysOfWeek'}
                                                onChange={this.handleChange}
                                                input={<Input id="select-weekdays" />}
                                                renderValue={selected => selected.join(', ')}
                                            >
                                                <MenuItem key="-1" value={this.state.selectAll ? "Unselect" : "Select All"}>

                                                    <ListItemText primary={this.state.selectAll ? "Unselect" : "Select All"} />
                                                </MenuItem>

                                                {statics.daysOfWeek.map((day, key) => (
                                                    <MenuItem key={day.value} value={day.value}>

                                                        <ListItemText primary={day.label} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                </GridContainer>

                            </CardBody>
                            <CardFooter>
                                <Button onClick={this.handleProfileSubmit} id="profile" color="primary">Create Deal</Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(styles)(ComingSoon);