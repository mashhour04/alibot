import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-phone-number-input/style.css'
import { FormGroup, Input, Label } from 'reactstrap';
import { registerActions } from '../_actions/register.actions';


class Account extends Component {
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
        let { accountErrors } = this.props;
        switch (fieldName) {
            case 'password':
                const passwordValid = value.length >= 6;
                accountErrors.password = passwordValid ? '' : 'password is too short';
                break;
            case 'username':
                const usernameValid = value.length >= 2;
                accountErrors.username = usernameValid ? '' : 'username is too short';
                break;
            case 'confirm':
                console.log('password value', this.props.account.password);
                const confirmValid = value.length >= 6 && value === this.props.account.password;
                accountErrors.confirm = confirmValid ? '' : 'passwords don\'t match';
                break;
            default:
                break;
        }
        this.props.dispatch(registerActions.error('account', accountErrors));
        this.setState()
    }

    render() {
        const { step } = this.props;
        const { accountErrors } = this.props;
        const className = `body ${step === 'account' && 'current'}`;
        const isActive = (step === 'account') ? { display: 'block' } : { display: 'none' };
        return (
            <section id="steps-uid-1-p-1" role="tabpanel" aria-labelledby="steps-uid-1-h-1" className={className} aria-hidden="false" style={isActive}>
                <h3>Account</h3>
                <FormGroup>
                    <Label for="userName">User name *</Label>
                    <Input type="text" id="userName" name="username" className="required form-control" onBlur={this.handleBlur} required />
                    {accountErrors.username && <label id="email-error" className="error mt-2 text-danger" htmlFor="email">{accountErrors.username}</label>}
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password *</Label>
                    <Input type="password" id="password" name="password" className="required form-control" onChange={this.handleBlur} required />
                    {accountErrors.password && <label id="email-error" className="error mt-2 text-danger" htmlFor="email">{accountErrors.password}</label>}
                </FormGroup>
                <FormGroup>
                    <Label for="confirm">Confirm Password *</Label>
                    <Input id="confirm" name="confirm" type="password" className="required form-control" onChange={this.handleBlur} required />
                    {accountErrors.confirm && <label id="email-error" className="error mt-2 text-danger" htmlFor="email">{accountErrors.confirm}</label>}
                    <small>(*) Mandatory</small>
                </FormGroup>
            </section>
        )
    }
}

function mapStateToProps(state) {
    const { accountErrors, account } = state.register;
    return {
        accountErrors, account
    };
}

export default connect(mapStateToProps)(Account)