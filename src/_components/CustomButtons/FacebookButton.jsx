import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

import buttonStyle from "../../_assets/jss/material-dashboard-react/components/buttonStyle.jsx";
function FacebookButton({ ...props }) {
    return (
        <a className="btn-fb" href="/auth/facebook">
            <Button className="fb-content btn-round" color="secondary" size="lg" block>
                <div className="logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
                        version="1">
                        <path fill="#FFFFFF" d="M32 30a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v28z" />
                        <path fill="#4267b2" d="M22 32V20h4l1-5h-5v-2c0-2 1.002-3 3-3h2V5h-4c-3.675 0-6 2.881-6 7v3h-4v5h4v12h5z" />
                    </svg>
                </div>
                <p>Sign in with Facebook</p>
            </Button>
        </a>
    );
}

RegularButton.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf([
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "rose",
        "white",
        "transparent"
    ]),
    size: PropTypes.oneOf(["sm", "lg"]),
    simple: PropTypes.bool,
    round: PropTypes.bool,
    disabled: PropTypes.bool,
    block: PropTypes.bool,
    link: PropTypes.bool,
    justIcon: PropTypes.bool,
    className: PropTypes.string,
    // use this to pass the classes props from Material-UI
    muiClasses: PropTypes.object
};

export default withStyles(buttonStyle)(RegularButton);
