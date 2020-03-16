import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-phone-number-input/style.css';
import { Toast } from '../_helpers';
import { Container, FormFeedback, Input, Label, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';


import { userActions } from '../_actions/user.actions';
import Profile from './Profile';
import Account from './Account';
import Vendor from './Vendor';
import './register.css';

const steps = ['profile', 'account', 'vendor', 'finish'];
class RegisterPage extends Component {
    constructor(props) {
        super(props);

        // reset login status
        // this.props.dispatch(userActions.logout());

        this.state = {
            ...this.state,
            pastStep: '',
            step: 'profile',
            nextStep: 'account',
            submitted: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.setParentState = this.setParentState.bind(this);
    }

    handleClick(step, action) {
        console.log('CLICKEEED', step);
        const stepIndex = steps.findIndex(o => o === step);
        const nextStepIndex = stepIndex + 1;
        const pastStepIndex = stepIndex - 1;

        const pastIndex = (action === 'previous') ? nextStepIndex : pastStepIndex;

        if (action !== 'previous') {
            const errorKey = `${steps[pastIndex]}Errors`;
            const errors = this.props[errorKey];

            console.log('error key', errorKey);
            if (!errors) {
                console.log('to the end here', this.props);
                if (steps[stepIndex] !== 'finish') return;
            }
            let valid = true;

            if (Object.keys(errors).length === 0) {
                Toast.fire({ type: 'error', title: 'you must enter the required fields'})
                return;
            }

            Object.keys(errors).map((key) => {
                if (errors[key] !== '') {
                    valid = false;
                }
            })
            if (!valid) {
                Toast.fire({ type: 'error', title: 'some fields are incorrect'})
                return;
            }

        }
        this.setState({
            pastStep: steps[pastStepIndex] || '',
            step,
            nextStep: steps[nextStepIndex] || '',
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const { dispatch, profile, account, vendor } = this.props;
        this.setState({ submitted: true });
        dispatch(userActions.register({ profile, account, vendor }));
    }

    validateForm(t) {
        const target = this.props[t];
        const keys = Object.keys(target);
        target.formValid = true;
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (key.includes('Valid') && target[key] !== true) {
                target.formValid = false;
                return this.setState({ [t]: target });
            }
        }
        this.setState({ [t]: target });
    }

    render() {
        const { step, nextStep, pastStep } = this.state;
        const finishButton = { display: 'none' };
        const nextButton = { display: 'block' };
        const previousButton = { display: 'block' };
        if (nextStep === '') {
            nextButton.display = 'none';
            finishButton.display = 'block';
        }

        if (pastStep === '') {
            previousButton.display = 'none';
        }
        return (
            <div className="login-pages">
                <Container>
                    <div className="login-block-header">
                        <div className="login-logo">
                            <img src="images/Logo.png" alt="" className="img-fluid" /> </div>
                        <h1>Welcome to Spoon.ai Dashboard</h1>
                    </div>

                    <div className="col-12 grid-margin">
                        <Card>
                            <CardBody>
                                <CardTitle>register as a vendor of your choice in Alibot</CardTitle>
                                <CardSubtitle>Spoon.ai is the virtual assistant and hub for both restaurant owners and their customers where for the customers it shows them different restaurants to reserve a table or many tables at time they want</CardSubtitle>

                                <div role="application" className="wizard clearfix vertical" id="steps-uid-1">
                                    <div className="steps clearfix">
                                        <ul role="tablist">
                                            <li role="tab" className={step === 'profile' ? 'first current' : 'first disabled'} aria-disabled="true" aria-selected="true">
                                                <a id="steps-uid-1-t-1" href="#steps-uid-1-h-1" aria-controls="steps-uid-1-p-1">
                                                    <span className="number">1.</span> Profile</a>
                                            </li>
                                            <li role="tab" className={step === 'account' ? 'account current' : 'disabled'} aria-disabled="false">
                                                <a id="steps-uid-1-t-0" href="#steps-uid-1-h-0" aria-controls="steps-uid-1-p-0">
                                                    <span className="current-info audible">current step: </span><span className="number">2.</span> Account</a></li>

                                            <li role="tab" className={step === 'vendor' ? 'current' : 'disabled'} aria-disabled="true">
                                                <a id="steps-uid-1-t-2" href="#steps-uid-1-h-2" aria-controls="steps-uid-1-p-2">
                                                    <span className="number">3.</span> Vendor</a>
                                            </li>

                                            <li role="tab" className={step === 'finish' ? 'last current' : 'disabled last'} aria-disabled="true">
                                                <a id="steps-uid-1-t-2" href="#steps-uid-1-h-2" aria-controls="steps-uid-1-p-2">
                                                    <span className="number">3.</span> Finish</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="content clearfix">
                                        <h3 id="steps-uid-1-h-0" tabIndex="-1" className="title">Profile</h3>
                                        <Profile step={step}></Profile>
                                        <h3 id="steps-uid-1-h-1" tabIndex="-1" className="title current">Account</h3>
                                        <Account step={step}></Account>
                                        <h3 id="steps-uid-1-h-2" tabIndex="-1" className="title">Vendor</h3>
                                        <Vendor step={step}></Vendor>
                                        <h3 id="steps-uid-1-h-3" tabIndex="-1" className="title">Finish</h3>
                                        <Finish step={step}></Finish>
                                    </div>
                                    <div className="actions clearfix">
                                        <ul role="menu" aria-label="Pagination">
                                            <li style={previousButton} className="disabled" aria-disabled="true"><a href="#previous" role="menuitem" onClick={this.handleClick.bind(this, pastStep, 'previous')}>Previous</a></li>
                                            <li aria-hidden="false" style={nextButton} aria-disabled="false"><a type="submit" href="#next" role="menuitem" onClick={this.handleClick.bind(this, nextStep, 'next')}>Next</a></li>
                                            <li aria-hidden="true" style={finishButton}><a href="#finish" role="menuitem" onClick={this.handleSubmit}>Finish</a></li>
                                        </ul>
                                    </div>
                                </div>

                            </CardBody>
                        </Card>
                    </div>

                </Container>
            </div>
        )
    }
}

class Finish extends RegisterPage  {
    render() {
        const { step } = this.props;
        const className = `body ${step === 'finish' && 'current'}`;
        const isActive = (step === 'finish') ? { display: 'block' } : { display: 'none' };
        return (
            <section id="steps-uid-1-p-2" role="tabpanel" aria-labelledby="steps-uid-1-h-2" className={className} aria-hidden="true" style={isActive}>
                <h3>Finish</h3>
                <div className="form-check">
                    <Label className="form-check-Label">
                        <Input className="checkbox" type="checkbox" />
                        I agree with the Terms and Conditions. <i className="Input-helper"></i>
                        <FormFeedback>You have to agree</FormFeedback>
                    </Label>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    const { profile, account, vendor, vendorErrors, profileErrors, accountErrors } = state.register;
    return {
        loggingIn,
        profile,
        account,
        vendor,
        vendorErrors,
        profileErrors,
        accountErrors
    };
}

export default connect(mapStateToProps)(RegisterPage)