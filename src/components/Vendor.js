import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, Input, Label, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';


import { registerActions } from '../_actions/register.actions';

class Vendor extends Component {
    constructor(props) {
        super(props);
        this.handleBlur = this.handleBlur.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    componentDidMount() {
        // this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})

        // this.autocomplete.addListener("place_changed", this.handlePlaceSelect)
    }

    handleBlur(e) {
        const { name, value } = e.target;
        const { step } = this.props;
        console.log('this in handleblur', this);
        const property = this.props[step];
        property[name] = value;
        // this.props.dispatch(registerActions.change('profile', property));
        // this.validateField(name, value);
        this.setState({ [step]: property }, () => this.validateField(name, value));
    }

    validateField(fieldName, value) {

        let { vendorErrors } = this.props;
        switch (fieldName) {
            case 'name':
                const isNameValid = value.length >= 4;
                vendorErrors[fieldName] = isNameValid ? '' : `${fieldName} is too short`;
                break;
            case 'street_address':
                const isAddressValid = value.length >= 4;
                vendorErrors.street_address = isAddressValid ? '' : 'Address can\'t be that short';
                break;
            case 'type':
                const isTypeValid = (value === 'restaurant' || value === 'cinema');
                vendorErrors.type = isTypeValid ? '' : 'Invalid type';
                break;
            case 'city':
                const isCityValid = value.length >= 4;
                vendorErrors.city = isCityValid ? '' : 'City can\'t be that short';
                break;
            case 'state':
                const isStateValid = value.length >= 4;
                vendorErrors.state = isStateValid ? '' : 'State can\'t be that short';
                break;
            case 'zip_code':
                const isCodeValid = value.length >= 4 && !isNaN(value);
                vendorErrors.zip_code = isCodeValid ? '' : 'Invalid Zip Code';
                break;
            case 'priceLevel':
                const isPriceValid = !isNaN(value);
                vendorErrors.priceLevel = isPriceValid ? '' : 'Invalid Price Level';
                break;
            default:
                break;
        }
        this.setState({
            vendorErrors,
        });
    }

    render() {
        console.log('vendor props', this.props);
        const { step } = this.props;
        const { vendorErrors, street_address, name, city, state, zip_code } = this.props;
        const className = `body ${step === 'vendor' && 'current'}`;
        const isActive = (step === 'vendor') ? { display: 'block' } : { display: 'none' };
        console.log('errors', vendorErrors);
        return (
            <section id="steps-uid-1-p-0" role="tabpanel" aria-labelledby="steps-uid-1-h-0" className={className} aria-hidden="true" style={isActive}>
                <h3>Vendor</h3>
                <form id="vendor">
                    {/* <FormGroup>
                        <Label for="title">Ttitle *</Label>
                        {vendorErrors.name && <Label id="lname-error" className="error mt-2 text-danger" htmlFor="email">{vendorErrors.name}</Label>}
                    </FormGroup> */}
                    <FormGroup>
                        <Label for="name"> Name </Label>
                        <Input
                            name={"name"}
                            value={name}
                            placeholder={"Name"}
                            onBlur={this.handleBlur}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="type"> Type </Label>
                        <Input
                            name={"type"}
                            type="select"
                            placeholder={"Type"}
                            onBlur={this.handleBlur}
                        >
                            <option value="restaurant">Restaurant</option>
                            <option value="cinema">Cinema</option>
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="priceLevel"> Price Level </Label>
                        <InputGroup>
                            <Input name="priceLevel" placeholder="Please Enter Price Level!" type="number" onBlur={this.handleBlur} />
                            <InputGroupAddon addonType="append">
                                <InputGroupText>$</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="street_address">Street Address</Label>
                        <Input
                            name={"street_address"}
                            value={street_address}
                            placeholder={"Street Address"}
                            onBlur={this.handleBlur}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="city">City</Label>
                        <Input
                            name={"city"}
                            value={city}
                            onBlur={this.handleBlur}
                            placeholder={"City"}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="state">State</Label>
                        <Input
                            name={"state"}
                            value={state}
                            placeholder={"State"}
                            onBlur={this.handleBlur}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="zip_code">Zip Code</Label>
                        <Input
                            name={"zip_code"}
                            value={zip_code}
                            placeholder={"Zipcode"}
                            onBlur={this.handleBlur}
                        />
                    </FormGroup>
                </form>
            </section>
        )
    }
}

function mapStateToProps(state) {
    const { vendorErrors, vendor } = state.register;
    return {
        vendorErrors, vendor
    };
}

export default connect(mapStateToProps)(Vendor)