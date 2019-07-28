/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import { StyledDropZone } from 'react-drop-zone'
import 'react-drop-zone/dist/styles.css';
// @material-ui/core ../../_components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import { Select, MenuItem, Checkbox, ListItemText, FormControl } from '@material-ui/core';
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

import statics from "../../_assets/statics/tables.json";
//Upload
import Avatar from 'react-avatar-edit'
import avatar from "../../_assets/img/faces/marc.jpg";

import { userActions } from '../../_actions/user.actions';
import { vendorActions } from '../../_actions/vendor.actions';

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
    this.handleProfileSubmit = this.handleProfileSubmit.bind(this);
    this.handleVendorSubmit = this.handleVendorSubmit.bind(this);
    this.state = {
      avatar,
      preview: null,
      version: 1,
      selectedFile: null,
      willUpload: false,
      categories: [],
      vendorUpdate: {},
      profileUpdate: {},
      vendorErrors: {},
      profileErrors: {},
    }
  }

  onProfileChange(event) {
    const { name, value } = event.target;
    const { profileUpdate } = this.state;
    console.log('state', this.state);
    profileUpdate[name] = value;
    this.setState({ profileUpdate });
  }

  onVendorChange(event) {
    const { name, value } = event.target;
    console.log('vendor changed', name, value)
    const { vendorUpdate } = this.state;
    if(!value || (value && value === '')) {
      console.log('changing to an empty value', value);
      return;
    }

    if(['street_address', 'city', 'state', 'zip_code'].includes(name)) { 
      if(!vendorUpdate.address) {
        vendorUpdate.address = {
          [name]: value
        };
      } else {
        vendorUpdate.address[name] = value;
      }
    }
    //TODO: FIX THAT IT DOESN'T REMOVE A CATEGORY
    if(name == 'categories') {

      if(value.length > 0) {
        const isExists = vendorUpdate['categories'] ? vendorUpdate['categories'].find(o => o == value) : false;
        if(!isExists && vendorUpdate['categories']) { 
          vendorUpdate['categories'].push(value[0]);
        } else if (!vendorUpdate['categories']) {
          vendorUpdate['categories'] = [value[0]];
        }
      }
    } else {
      vendorUpdate[name] = value;
    }
    
    console.log('caegories value', vendorUpdate['categories']);
    this.setState({ vendorUpdate, categories: value });
  }
  onClose = () => {
    this.setState({ preview: null })
  }

  onCrop = (preview) => {
    this.setState({ preview })
  }


  fileChangedHandler = async (selectedFile) => {
    console.log('updating cover photo')
    let { vendor } = this.props;
    vendor = vendor.vendor || {};
    const vendorId = vendor._id;
    if (!vendorId) { return; }
    // const selectedFile = event.target.files[0];
    // this.setState({ selectedFile: event.target.files[0] });
    if (!selectedFile) { return; }
    const formData = new FormData()
    formData.append(
      'myFile',
      selectedFile,
      selectedFile.name,
    )
    try {
      const response = await axios.post(`backend/upload/profile/${vendorId}`, formData);
      if(response.data) {
        console.log('successfull updated vendor profile pic', response.data);
        const { version } = this.state;
    
        const newVersion = version + 1;
        console.log('new version', version);
        this.setState({ willUpload: false, version: newVersion })
        }
        // if (response.data && response.data.file) {
        //   this.setState({
        //     avatar: `/backend/avatar/${response.data.file.filename}`
        //   })
        //   console.log('changed avatar from uplading', this.state.avatar);
        // }
    } catch(err) {

    }
   
  }

  handleChangeMultiple = (event) => {
    const { options } = event.target;
    console.log('target', event.target)
    // const value = [];
    // for (let i = 0, l = options.length; i < l; i += 1) {
    //   if (options[i].selected) {
    //     value.push(options[i].value);
    //   }
    // }
    this.onVendorChange(event);
  }

  

  handleProfileSubmit(event) {
    event.preventDefault();
    const { profileUpdate } = this.state;
    const { profile } = this.props;
    // this.setState({ submitted: true });
    this.props.dispatch(userActions.update({ update: profileUpdate, userId: profile._id }));
  }

  handleVendorSubmit(event) {
    event.preventDefault();
    const { vendorUpdate } = this.state;
    let { vendor } = this.props;
    vendor = vendor.vendor || {};
    // this.setState({ submitted: true });
    this.props.dispatch(vendorActions.update({ update: vendorUpdate, vendorId: vendor._id }));
  }
  render() {
    const { categories } = this.state;
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
                      placeholder={profile.username}
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
                      inputProps={{
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
                      placeholder={profile.firstName}
                      id="first-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
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
                      inputProps={{
                        name: 'lastName',
                        onChange: this.onProfileChange
                      }}
                    />
                  </GridItem>
                </GridContainer>

              </CardBody>
              <CardFooter>
                <Button onClick={this.handleProfileSubmit} id="profile" color="primary">Update Profile</Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>

            {/*
            <Card profile>

              <CardBody profile>
                <h6 className={classes.cardCategory}> </h6>
                <h4 className={classes.cardTitle}>{profile.firstName} {profile.lastName}</h4> 

                
              </CardBody>
            </Card>
            */}
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Edit Vendor</h4>
                <p className={classes.cardCategoryWhite}>Edit Info about your vendor</p>
                {(!this.state.willUpload && vendor.avatarData) ?  <CardAvatar profile>
                   {/* <input
                    ref={fileInput => this.fileInput = fileInput}
                    accept="image/*"
                    className={classes.input}
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={this.fileChangedHandler}
                  /> */}
                  <a href="#pablo" onClick={e => {
                    e.preventDefault();
                    this.setState({ willUpload: true })
                  }}>
                    <img src={`/backend/avatar/${vendor._id}?v=${this.state.version}`} alt="Upload Cover Image" style={{
                      // width: "100%",
                      // height: "auto",
                      // maxHeight: "130px",
                      // maxWidth: "130px",
                      // borderRadius: "50%",
                      // color: "#fff",
                      // padding: "18%",
                      // fontWeight: "500",
                      // margin: "auto",
                      // lineHeight: "20px"
                    }} />
                  </a> 

                </CardAvatar>: <div className="DropZone-Container"><StyledDropZone label="Select Or Drop Your Cover Image Here" onDrop={(file, text) => this.fileChangedHandler(file)} /> </div>}
               
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={vendor.name ? `Vendor Name (${vendor.name})` : 'Vendor Name'}
                      id="vendor-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: 'name',
                        onChange: this.onVendorChange
                      }}
                    />
                  </GridItem>

                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={vendor.address && vendor.address.city ? `City (${vendor.name})` : 'City'}
                      id="city"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: 'city',
                        onChange: this.onVendorChange
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText= {vendor.address && vendor.address.state ? `State (${vendor.address.state})` : 'State'}
                      id="state"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: 'state',
                        onChange: this.onVendorChange
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={vendor.address && vendor.address.zip_code ? `Postal Code (${vendor.address.zip_code})` : 'Postal Code'}
                      id="postal-code"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: 'zip_code',
                        onChange: this.onVendorChange
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={vendor.address && vendor.address.street_address ? `Address (${vendor.address.street_address})` : 'Address'}
                      id="city"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: 'street_address',
                        onChange: this.onVendorChange
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl style={{ minWidth: 120, margin: "auto" }}>
                      <InputLabel htmlFor="age-simple">Categories</InputLabel>
                      <Select
                        multiple
                        value={categories.length > 0 ? categories : vendor.categories ? vendor.categories : []}
                        name={'categories'}
                        onChange = {this.handleChangeMultiple}
                        renderValue={(selected) => {
                          console.log('rendering selected', selected)
                          return selected.map(item => item.label ? item.label : item).join(', ');
                        }}
                        style={{minWidth: "120px"}}
                      >
                        {statics['categories'].map((category, key) => (
                          <MenuItem key={key} value={category.value ? category.value : category}>
                            <Checkbox />
                            <ListItemText primary={category.label ? category.label : category} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl style={{ minWidth: 120, margin: "auto" }}>
                      <InputLabel htmlFor="age-simple">Price</InputLabel>
                      <Select
                        name={'priceLevel'}
                        value={''}
                        onChange = {this.onVendorChange}
                        // input={<Input id="select-weekdays" />}
                        renderValue={selected => selected.label}
                        style={{minWidth: "120px"}}
                      >
                        {statics['prices'].map((price, key) => (
                          <MenuItem key={key} value={price.value ? price.value : price}>
                             <Checkbox />
                            <ListItemText primary={price.label ? price.label : price} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>


                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>About vendor</InputLabel>
                    <CustomInput
                      labelText={vendor.description && vendor.description ? `${vendor.description}` : 'Here you write a description about your vendor and what it does.'}
                      id="about-me"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5
                      }}
                      onChange = {this.onVendorChange}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button onClick={this.handleVendorSubmit} color="success">Update Vendor</Button>
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
