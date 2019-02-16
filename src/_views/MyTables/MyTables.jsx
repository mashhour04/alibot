import React, { Component } from "react";
import { connect } from 'react-redux';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "../../_components/Grid/GridItem.jsx";
import GridContainer from "../../_components/Grid/GridContainer.jsx";
import Table from "../../_components/Table/Table.jsx";
import Card from "../../_components/Card/Card.jsx";
import CardHeader from "../../_components/Card/CardHeader.jsx";
import CardBody from "../../_components/Card/CardBody.jsx";
import CircularIndeterminate from '../../_components/CircularIndeterminate/Loading.jsx';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class MyTables extends Component {

  render() {
    const { classes, tables, bookings, vendor } = this.props;
    const tablesData = tables.map(({ _id, capacity, availability }) => {
      return { id: _id, capacity, ...availability };
    });

   
    console.log('inital bookings', bookings);
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
        {vendor.loading ? <CircularIndeterminate></CircularIndeterminate> :
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Tables Management</h4>
              <p className={classes.cardCategoryWhite}>
                Here you can check your restaurant tables and manage them
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["#", "Capacity", "Hours", "Week Days", "Month Days"]}
                tableData={tablesData}

              />
            </CardBody>
          </Card>
        }
        </GridItem>

      </GridContainer>
    );
  }
}

function mapStateToProps(state) {
  const { user, vendor, bookings } = state;
  const tables = vendor.tables || [];
  return { user, vendor, tables, bookings };
}
export default connect(mapStateToProps)(withStyles(styles)(MyTables));
