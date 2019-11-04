import React from 'react';
import { chatPlugin } from '../../_helpers';


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import customerChatStyle from "../../_assets/jss/material-dashboard-react/components/customerChatStyle";

class CustomerChat extends React.PureComponent {
  componentDidMount() {
    this.timeout = setTimeout(() => {
       chatPlugin(FB => this.timeout && FB.XFBML.parse());
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    delete this.timeout;
  }

  render() {
    return (
          <div
            className="fb-customerchat"
            attribution="setup_tool"
            color="#FF7B00"
            page_id={process.env.REACT_APP_FACEBOOK_PAGE_ID}
            // ref={JSON.stringify({  user: JSON.parse(localStorage.user) })}
            ref="Sdsadsa"
            x="yy"
            // theme_color="..."
            // logged_in_greeting="..."
            // logged_out_greeting="..."
            // greeting_dialog_display="..."
            // greeting_dialog_delay="..."
            // minimized="false"
            // ref="..."
          />
       
    );
  }
}

export default withStyles(customerChatStyle)(CustomerChat);