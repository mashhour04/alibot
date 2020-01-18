import React from 'react';
import { chatPlugin, createDiv } from '../../_helpers';
import MessengerCustomerChat from 'react-messenger-customer-chat';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import customerChatStyle from "../../_assets/jss/material-dashboard-react/components/customerChatStyle";

class CustomerChat extends React.PureComponent {
  componentDidMount() {
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    delete this.timeout;
  }

  render() {
    const signed = JSON.parse(localStorage.getItem('user'));
    const user = { vendorId: signed.vendorId, _id: signed.id, username: signed.username }
    console.log('user id', user._id)
    return (
      <MessengerCustomerChat
        shouldShowDialog={this.props.shouldShowDialog ? true : false}
        pageId={process.env.REACT_APP_FACEBOOK_PAGE_ID}
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        htmlRef={user._id}
        greetingDialogDisplay='show'
        greetingDialogDelay={30}
        version='4.0'
        loggedInGreeting='We made it even easier for you to recieve your bookings'
        loggedOutGreeting='Let ali reports you your daily bookings, log in messenger. Enjoy the experience'
      />
    );
  }
}

export default withStyles(customerChatStyle)(CustomerChat);