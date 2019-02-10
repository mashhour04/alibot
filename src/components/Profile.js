import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input/';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { FormGroup, Input, Label } from 'reactstrap';

import { registerActions } from '../_actions/register.actions';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.handleBlur = this.handleBlur.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    handleBlur(e) {
        console.log('this in handleblur', this);
        const { name, value } = e.target;
        const { step } = this.props;
        const property = this.props[step];
        property[name] = value;

        this.setState({ [step]: property }, () => this.validateField(name, value));
    }

    validateField(fieldName, value) {
   
        let { profileErrors } = this.props;
        switch (fieldName) {
            case 'firstName':
            case 'lastName':
                const isNameValid = value.length >= 4;
                profileErrors[fieldName] = isNameValid ? '' : `${fieldName} is too short`;
                break;
            case 'email':
                const isEmailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                profileErrors.email = isEmailValid ? '' : 'invalid email';
                break;
            case 'phone':
                if (typeof value !== 'string') { return profileErrors.phone = ' is invalid phone number'; }
                const isPhoneValid = isValidPhoneNumber(value);
                profileErrors.phone = isPhoneValid ? '' : ' is invalid phone number';
                break;
            default:
                break;
        }
        console.log('validating');
        // reset login status
        // this.props.dispatch(registerActions.error('profile', profileErrors));
        this.setState({
            profileErrors,
        });
    }

    render() {
        console.log('profile props', this.props);
        const { step } = this.props;
        const { profileErrors, profile } = this.props;
        const className = `body ${step === 'profile' && 'current'}`;
        const isActive = (step === 'profile') ? { display: 'block' } : { display: 'none' };
        const validations = {
            firstName: ["required", "min:3", "max:15"],
            lastName: ["required", "min:3", "max:15"],
            email: ["required", "email"],
        }
        console.log('errors', profileErrors);
        return (
            <section id="steps-uid-1-p-0" role="tabpanel" aria-labelledby="steps-uid-1-h-0" className={className} aria-hidden="true" style={isActive}>
                <h3>Profile</h3>
                <form id="profile">
                    <FormGroup>
                        <Label for="name">First name *</Label>
                        <Input id="name" name="firstName" type="text" className={profileErrors.firstName ? 'form-control text-input error' : 'form-control text-input'} onBlur={this.handleBlur} required />
                        {profileErrors.firstName && <Label id="lname-error" className="error mt-2 text-danger" htmlFor="email">{profileErrors.firstName}</Label>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="surname">Last name *</Label>
                        <Input id="surname" name="lastName" type="text" className={profileErrors.lastName ? 'form-control text-input error' : 'form-control text-input'} onBlur={this.handleBlur} required />
                        {profileErrors.lastName && <label id="lname-error" className="error mt-2 text-danger" htmlFor="email">{profileErrors.lastName}</label>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email *</Label>
                        <Input id="email" name="email" type="text" className={profileErrors.email ? 'text-input error' : 'text-input'} onBlur={this.handleBlur} required />
                        {profileErrors.email && <label id="email-error" className="error mt-2 text-danger" htmlFor="email">{profileErrors.email}</label>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Phone *</Label>
                        <PhoneInput
                            name="phone"
                            placeholder="Enter phone number"
                            value={profile.phone}
                            className={profileErrors.phone ? 'text-input error' : 'text-input'}
                            onChange={phone => this.handleBlur({ target: { name: 'phone', value: phone } })} />
                        {profileErrors.phone && <Label id="email-error" className="error mt-2 text-danger" htmlFor="email">{profileErrors.phone}</Label>}
                    </FormGroup>
                </form>
                {/* <FormGroup>
                    <Label for="address">Address</Label>
                    <Input id="address" name="address" type="text" className="form-control" onBlur={this.handleBlur}/>
                    <small>(*) Mandatory</small>
                </FormGroup> */}
            </section>
        )
    }
}

function mapStateToProps(state) {
    const { profileErrors, profile } = state.register;
    console.log('initial props', state.register);
    return {
        profileErrors, profile
    };
}

export default connect(mapStateToProps)(Profile)