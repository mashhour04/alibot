import React, { Component } from "react";
import { connect } from 'react-redux';
// @material-ui/core ../../_components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core ../../_components
import GridItem from "../../_components/Grid/GridItem.jsx";
import GridContainer from "../../_components/Grid/GridContainer.jsx";
import CustomInput from "../../_components/CustomInput/CustomInput.jsx";
import Button from "../../_components/CustomButtons/Button.jsx";
import Card from "../../_components/Card/Card.jsx";
import CardHeader from "../../_components/Card/CardHeader.jsx";
import CardAvatar from "../../_components/Card/CardAvatar.jsx";
import CardBody from "../../_components/Card/CardBody.jsx";
import CardFooter from "../../_components/Card/CardFooter.jsx";

import avatar from "../../_assets/img/faces/marc.jpg";

import { userActions } from '../../_actions/user.actions';
const styles = {
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
};

class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.onProfileChange = this.onProfileChange.bind(this);
    this.onVendorChange = this.onVendorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onProfileChange(event) {
    const { name, value } = event.target;
    console.log('state', this.state);
    // const { profile } = this.state;
    // profile[name] = value;
    // this.setState({
    //   profile
    // })
  }

  onVendorChange(event) {
    const { name, value } = event.target;
    // const { vendor } = this.state;
    // vendor[name] = value;
    // this.setState({
    //   vendor: value
    // })
  }

  handleSubmit(event) {
    event.preventDefault();
    const { id } = event.target;
    const update = this.state[id];
    console.log('log state', update);
    this.setState({ submitted: true });
    this.props.dispatch(userActions.update(update, id));
}
  render() {
    const { classes, profile } = this.props;
    let { vendor } = this.props;
    vendor = vendor.vendor || {}; 
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>Edit info about yourself</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText={profile.username ? `Username (${profile.username})` : 'Username'}
                      id="username"
                      placeholder = { profile.username }
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        name: 'username',
                        onChange: this.onProfileChange,
                        default: profile.username
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={profile.email ? `Email address (${profile.email})` : 'Email address'}
                      id="email-address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps = {{
                        name: 'email',
                        onChange: this.onProfileChange
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={profile.firstName ? `First Name (${profile.firstName})` : 'First Name'}
                      placeholder = { profile.firstName }
                      id="first-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps = {{
                        name: 'firstName',
                        onChange: this.onProfileChange
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={profile.lastName ? `Last Name (${profile.lastName})` : 'Last Name'}
                      id="last-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps = {{
                        name: 'lastName',
                        onChange: this.onProfileChange
                      }}
                    />
                  </GridItem>
                </GridContainer>
        
              </CardBody>
              <CardFooter>
                <Button onClick={this.handleSubmit} id="profile" color="primary">Update Profile</Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}> </h6>
                <h4 className={classes.cardTitle}>{profile.firstName} {profile.lastName}</h4>
                <p className={classes.description}>
                  Don't be scared of the truth because we need to restart the
                  human foundation in truth And I love you like Kanye loves Kanye
                  I love Rick Owens’ bed design but the back is...
                </p>
              
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Edit Vendor</h4>
                <p className={classes.cardCategoryWhite}>Edit Info about your vendor</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={vendor.name ? `Vendor Name (${vendor.name})`: 'Vendor Name'}
                      id="vendor-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={vendor.address && vendor.address.city ? `City (${vendor.name})`: 'City'}
                      id="city"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Country"
                      id="country"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Postal Code"
                      id="postal-code"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>About vendor</InputLabel>
                    <CustomInput
                      labelText={vendor.description && vendor.description ? `${vendor.description}`: 'Here you write a description about your vendor and what it does.' }
                      id="about-me"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="success">Update Vendor</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { profile, vendor } = state;
  return {
    profile,
    vendor
  }
}
export default connect(mapStateToProps)(withStyles(styles)(UserProfile));
