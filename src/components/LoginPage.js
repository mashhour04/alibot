import React, { Component } from 'react';
import { connect } from 'react-redux';

import { userActions } from '../_actions/user.actions';
import './login.css'
import { Container, Button, Form, FormGroup, Input, Label } from 'reactstrap';
class LoginPage extends Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            console.log('logging in');
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const { user } = this.props;
        return (
            <div className="login-pages">
                <Container>
                    <div className="login-block-header">
                        <div className="login-logo">
                            <img src="images/Logo.png" alt="" className="img-fluid" /> </div>
                        <h1>Welcome back to Aliboard</h1>
                    </div>
                    <div className="login-block">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="username">username:</Label>
                                <Input type="text" name="username" onChange={this.handleChange} ref="username" id="username" placeholder="ali" required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password:</Label>
                                <Input type="password" className="form-control form-control-lg" placeholder="" name="password" onChange={this.handleChange} ref="password"
                                    required />
                            </FormGroup>
                            <FormGroup>
                                <span className="pull-right">
                                    <Button className="btn-round" type="submit" color="primary" size="lg" block>LOGIN</Button>
                                </span>
                            </FormGroup>

                            <FormGroup>


                                {/* <FacebookButton></FacebookButton> */}

                            </FormGroup>

                        </Form>
                        <FormGroup>
                            <span className="pull-right">
                                <Button className="btn-round" type="submit" color="secondary" size="lg" onClick={() => window.location.href = '/register'} block>Sign Up</Button>
                            </span>
                        </FormGroup>
                    </div>
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

export default connect(mapStateToProps)(LoginPage)