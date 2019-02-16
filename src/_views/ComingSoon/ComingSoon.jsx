import React from 'react';
import UnderConstruction from 'react-under-construction';
import 'react-under-construction/build/css/index.css';
import withStyles from "@material-ui/core/styles/withStyles";

import comingSoonStyle from "../../_assets/jss/material-dashboard-react/components/comingSoonStyle";
import GridContainer from '../../_components/Grid/GridContainer';
import GridItem from '../../_components/Grid/GridItem';

const styles = {
    title: {
        margin: '9% 0 20% 27%',
    },
    image: {
        height: '200px',
        position: 'relative',
    },
    text: {
        fontSize: '35px',
        fontFamily: "'Press Start 2P', cursive"
    }
}

function ComingSoon({ ...props }) {
    const { classes } = props;
    return (
        <div>
            <div className={classes.title}>
                <img className={classes.image} src='/images/construction.svg'>
                </img>
               <span className={classes.text}> Under Construction</span>
            </div>
        </div>
    );
}

export default withStyles(styles)(ComingSoon);