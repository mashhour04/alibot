/* eslint-disable default-case */
import React, { Component } from "react";
import { connect } from "react-redux";
// import moment from 'moment/min/moment-with-locales';
import moment from "moment";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";



import { vendorActions } from "../../_actions/vendor.actions";

// core components
import GridItem from "../../_components/Grid/GridItem.jsx";
import GridContainer from "../../_components/Grid/GridContainer.jsx";
import Table from "../../_components/Table/Table.jsx";
import Card from "../../_components/Card/Card.jsx";
import CardHeader from "../../_components/Card/CardHeader.jsx";
import CardBody from "../../_components/Card/CardBody.jsx";
import CircularIndeterminate from "../../_components/CircularIndeterminate/Loading.jsx";
import CustomerChat from '../../_components/CustomerChat/CustomerChat.jsx';

// Dialog Core Components
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

// View Components
import ManualBooking from "../ManualBooking/ManualBooking";


import { bookingActions } from "../../_actions/booking.actions";
import Analytics from "../Analytics/Analytics";

const styles = theme => ({
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
  },
  paper: {
    position: "relative",
    width: theme.spacing.unit * 60,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  pastBookingsButton: {
    marginRight: "10px",
    border: "1px solid",
    borderRadius: "65px",
    background: "#1775f1",
    color: "#FFFFFF",
    "&:hover, &.active": {
      background: "#FFFFFF !important",
      color: "#1775f1 !important"
    }
  },
  noData: {
    width: "100%",
    display: "flex",
    marginLeft: "28%",
    marginTop: "75px",
    color: "#81818181"
  },
  loadMoreButton: {
    width: "200px",
    color: "#fff",
    fontSize: "16px",
    display: "block",
    textAlign: "center",
    margin: "20px auto",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid transparent",
    backgroundColor: "#1975f0",
    transition: ".3s",
    "&:hover": {
      color: "blue",
      backgroundColor: "#fff",
      border: "1px solid blue",
      textDecoration: "none",
    }
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Bookings extends Component {
  state = {
    insertOpen: false,
    dialogOpen: false,
    dialogRow: null,
    actionValue: null,
    currentbookingStatus: "All Past"
  };

  componentDidMount() {

    this.props.dispatch(
      vendorActions.getBookings({ skip: 0, limit: 200, type: "past" })
    );
  }

  insertCloseHandler = () => {
    this.setState({
      insertOpen: false
    });
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleDialogClose = (e, row) => {
    const value = e.target.innerText;
    if (value === "YES" && this.state.dialogRow) {
      //   Toast.fire({
      //     type: "success",
      //     title: "okay doing that now"
      //   });
      const { actionValue, dialogRow } = this.state;
      const bookingId = dialogRow._id || dialogRow.id;
      console.log("thw row", dialogRow);
      const action = {
        status: actionValue === "remove" ? "unsuccessful" : "successful"
      };
      this.props.dispatch(bookingActions.updateBooking({ bookingId, action }));
      this.props.dispatch(
        vendorActions.getBookings({ skip: 0, limit: 200, type: "past" })
      );
    }
    this.setState({ dialogOpen: false });
  };

  loadMore = () => {
    const { location } = this.props;
    let type = location && location.pathname.includes("past") ? "past" : "coming";
    let skip = 0;

    if (type === 'past') {
      const { pastBookings } = this.props;
      skip = pastBookings.length;
    } else {
      const { bookings } = this.props;
      skip = bookings.length;
    }
    console.log('should skip', skip)
    this.props.dispatch(vendorActions.getBookings({ skip, limit: 200, pagination: true }))
  }

  getExtraActions = currentbookingStatus => {
    let actions = [];
    const removeAction = {
      value: "remove",
      label: "Mark Unsuccessful",
      callback: row => {
        this.setState({
          dialogOpen: true,
          dialogRow: row,
          actionValue: "remove"
        });
        return true;
      }
    };

    const addAction = {
      value: "add",
      label: "Mark Successful",
      callback: row => {
        this.setState({
          dialogOpen: true,
          dialogRow: row,
          actionValue: "add"
        });
        return true;
      }
    };
    switch (currentbookingStatus) {
      case "Successful":
        actions = [removeAction];
        break;
      case "Unsuccessful":
        actions = [addAction];
        break;
      case "All Past":
        actions = [addAction, removeAction];
        break;
    }
    return actions;
  };

  render() {
    const { location, classes } = this.props;
    const { currentbookingStatus } = this.state;
    const tableHead = [
      "#",
      "Name",
      "Date",
      "Number of People",
      "Table",
      "Status",
      "Phone",
      "Email"
    ];
    const bookingStatus = ["All Past", "Successful", "Unsuccessful"];
    let type =
      location && location.pathname.includes("past") ? "past" : "coming";
    let bookings;
    let extraActions = [];
    if (type && type === "past") {
      const { pastBookings } = this.props;
      console.log('all past', pastBookings)
      bookings =
        pastBookings && pastBookings.length
          ? pastBookings.filter(booking => {
            console.log(
              "booking",
              booking.status,
              "adn current",
              currentbookingStatus
            );
            switch (currentbookingStatus) {
              case bookingStatus[1]:
                return booking.status === "successful";
              case bookingStatus[2]:
                return booking.status === "unsuccessful";
              default:
                return (booking.status === "confirmed");
            }
          })
          : [];

      if (currentbookingStatus === bookingStatus[0]) {
        tableHead.push("Actions");
        extraActions = this.getExtraActions(currentbookingStatus);
      }

    } else {
      bookings = this.props.bookings;
    }

    let bookingsData = (bookings.loading || bookings.error) ? [] : bookings.filter(o => o.userId && o.vendorPathId);
    console.log('finale bookings', bookingsData, bookings)
    bookingsData = bookingsData.filter(({ vendorPathId }) => {
      return vendorPathId;
    });
    bookingsData = bookingsData.map(
      ({ userId, status, vendorPathId, date, _id }, index) => {
        const phone = userId.phone ? userId.phone : "N/A";
        const email = userId.email ? userId.email : "N/A";
        return {
          _id,
          id: index + 1,
          name: `${userId.firstName} ${userId.lastName || ""}`,
          date: moment(date).format("dddd, MMM D HH:mm"),
          capacity: vendorPathId.capacity,
          table: vendorPathId.name || vendorPathId.altId,
          status,
          phone,
          email
        };
      }
    );

    return (
      <div>
        {(type !== 'past') ? <Analytics /> : undefined}
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            {bookings.loading || bookings.error ? (
              <CircularIndeterminate />
            ) : (
                <Card plain>
                  <CardHeader plain color="primary">
                    <h4 className={classes.cardTitleWhite}>
                      {type == "past" ? currentbookingStatus : ''} Bookings Management
                </h4>
                    <p
                      className={classes.cardCategoryWhite}
                      style={
                        {
                          // color: `rgb(245, 231, 251)`,
                        }
                      }
                    >
                      {(() => {
                        switch (currentbookingStatus) {
                          case bookingStatus[1]:
                            return "Here are the the latest successful reservations to your vendor";
                          case bookingStatus[2]:
                            return "Here are the the latest unsuccessful reservations to your vendor";
                          default:
                            return "Here are the the latest reservations to your vendor";
                        }
                      })()}
                    </p>
                  </CardHeader>
                  <CardBody>
                    {type == "past" ? (
                      <div>
                        {bookingStatus.map((value, key) => {
                          return <Button
                            key={key}

                            className={classes.pastBookingsButton + `${currentbookingStatus === value ? ' active' : ''}`}
                            onClick={() =>
                              this.setState({
                                currentbookingStatus: value
                              })
                            }
                          >
                            {value}
                          </Button>;
                        })}

                        {/* <Button
                      className={classes.pastBookingsButton}
                      onClick={() =>
                        this.setState({
                          currentbookingStatus:
                            currentbookingStatus == bookingStatus[1]
                              ? bookingStatus[1]
                              : bookingStatus[1]
                        })
                      }
                    >
                      {currentbookingStatus == bookingStatus[1]
                        ? bookingStatus[1]
                        : bookingStatus[1]}
                    </Button> */}
                      </div>
                    ) : (
                        <Button onClick={() => this.setState({ insertOpen: true })}>
                          <Add />
                          Insert
                  </Button>
                      )}
                    <Table
                      tableHeaderColor="primary"
                      tableHead={tableHead}
                      tableData={bookingsData}
                      hasActions={(type == "past" && currentbookingStatus === bookingStatus[0]) ? true : false}
                      extraActions={type == "past" ? extraActions : []}
                      isReadOnly={true}
                    />
                    {bookingsData.length > 200 ? (<div><button onClick={this.loadMore} className={classes.loadMoreButton}>load more</button></div>) : null}
                    {bookings.length === 0 ? (
                      <div className={classes.noData}>
                        <h1 style={{ fontSize: "4rem" }}>Nothing here yet</h1>
                      </div>
                    ) : null}


                    <Dialog
                      open={this.state.dialogOpen}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={this.handleDialogClose}
                      aria-labelledby="alert-dialog-slide-title"
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle id="alert-dialog-slide-title">
                        {"Are you sure?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                          {(() => {
                            switch (this.state.actionValue) {
                              case "remove":
                                return "You'd like to mark this booking unsuccessful ?";
                              case "add":
                                return "You'd like to mark this booking successful ?";
                              default:
                                return "";
                            }
                          })()}
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={this.handleDialogClose}
                          color="secondary"
                          value="no"
                        >
                          No
                    </Button>
                        <Button
                          onClick={this.handleDialogClose}
                          color="primary"
                          value="yes"
                        >
                          Yes
                    </Button>
                      </DialogActions>
                    </Dialog>
                    <Modal
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                      open={this.state.insertOpen}
                      onClose={this.insertCloseHandler}
                    >
                      <ManualBooking onClose={() => {
                        this.setState({
                          insertOpen: false,
                        })
                      }} />
                    </Modal>
                  </CardBody>
                </Card>
              )}
          </GridItem>
        </GridContainer>
        <CustomerChat shouldShowDialog = {false} />
      </div>
    );
  }
}

function changePastBookingStatus(booking, status) {
  console.log("we should change ", booking, "to be", status);
}
function mapStateToProps(state) {
  const { vendor, bookings, pastBookings, addBooking } = state;
  return { vendor, bookings, pastBookings, addBooking };
}
export default connect(mapStateToProps)(withStyles(styles)(Bookings));
