import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    // margin: theme.spacing.unit * 2,
    width: "60px",
    height: "60px",
    marginLeft: "50%",
    marginTop: "250px",
    color: "#1975f0",
  },
  position: {
    center: 1,
    margin: 'auto'
  }
});

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <div className={classes.position}>
      <CircularProgress className={classes.progress} />
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);