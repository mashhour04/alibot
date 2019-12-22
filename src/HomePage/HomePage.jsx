import React from 'react'
import moment from 'moment'

import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Toast } from '../_helpers'
import NotificationComponent from '../_components/Notification/Notification.jsx'
import io from 'socket.io-client'

// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import CustomerChat from '../_components/CustomerChat/CustomerChat.jsx';
import 'perfect-scrollbar/css/perfect-scrollbar.css'

import { PrivateRoute } from '../components/PrivateRoute'

// core components
import Footer from '../_components/Footer/Footer.jsx'

import dashboardRoutes from '../_routes/dashboard.jsx'

import AppNavbar from '../_components/AppNavBar'
// import Bookings from '../_components/Bookings';
// import Tables from '../_components/tables/index';
import SideBar from '../_components/SideBar'
import BookingsTable from '../_views/BookingsTable/BookingsTable'
import { vendorActions } from '../_actions/vendor.actions'
import { userActions } from '../_actions/user.actions'

import './HomePage.css'

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect) {
        return <Redirect from={prop.path} to={prop.to} key={key} />
      }
      return (
        <PrivateRoute
          path={prop.path}
          component={prop.component}
          key={key}
          extra={prop.extra}
        />
      )
    })}
    <PrivateRoute component={BookingsTable} key={0} />;
  </Switch>
)

class HomePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mobileOpen: false,
      endpoint: process.env.REACT_APP_API_URL,
      notification_body: '',
      notification_title: '',
      notification_ignore: true
    }
    this.resizeFunction = this.resizeFunction.bind(this)
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }
  getRoute () {
    return this.props.location.pathname !== '/maps'
  }
  resizeFunction () {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false })
    }
  }
  componentDidMount () {
    this.props.dispatch(vendorActions.getVendor({ skip: 0, limit: 200 }))
    this.props.dispatch(vendorActions.getBookings({ skip: 0, limit: 200 }))
    this.props.dispatch(vendorActions.getAnalytics({}))
    this.props.dispatch(userActions.getUser())
    if (navigator.platform.indexOf('Win') > -1) {
      // const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener('resize', this.resizeFunction)

    let { endpoint } = this.state
    let socket = io(endpoint)
    console.log('proccess env', process.env)

    socket.on('new booking', bookingHandler.bind(this))
  }
  componentDidUpdate (e) {
    if (e.history.location.pathname !== e.location.pathname) {
      // this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false })
      }
    }
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.resizeFunction)
  }

  playSound (filename) {
    document.getElementById('sound').play()
  }
  render () {
    // const { user } = this.props;
    return (
      <div className='container-scroller'>
        <AppNavbar />
        <Container fluid className='page-body-wrapper'>
          <SideBar />
          <NotificationComponent
            body={this.state.notification_body}
            ignore={this.state.notification_ignore}
            title={this.state.notification_title}
          />
          <div className='main-panel'>
            <div className='content-wrapper'>
              {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
              {this.getRoute() ? (
                <div>
                  <div>{switchRoutes}</div>
                </div>
              ) : (
                <div>{switchRoutes}</div>
              )}
              {this.getRoute() ? (
                <div>
                  {/* TODO: Add Footer */}
                  {/* <Footer /> */}
                </div>
              ) : null}
              <CustomerChat />
            </div>
          </div>
        </Container>
      </div>
    )
  }
}

function bookingHandler (data) {
  let { vendor } = this.props
  vendor = vendor.vendor || {}
  const booking = data.user
  if (!booking) {
    return
  }

  if (booking.vendor && booking.vendor._id !== vendor._id) {
    console.log('wrong routed', booking.vendor, vendor)
    return
  }

  const title = 'New Booking ⚠️⚠️';
  const hours = parseInt(booking.time.split(':')[0], 10)
  const minutes = parseInt(booking.time.split(':')[1], 10)
  const dateTime = moment(parseInt(booking.day)).startOf('day')
    .locale('fr')
    .add(hours, 'hours')
    .add(minutes, 'minutes')
    .format('dddd, MMM D HH:mm');
  
  const body = `${booking.firstName} ${booking.lastName} has booked table for ${
    booking.tables[0].capacity
  }\nat ${dateTime}`

  Toast.fire({
    title,
    type: 'success',
    text: body,
    footer: '<a href="/">Show Details</a>',
    timer: 50 * 60 * 1000
  })

  this.setState({
    notification_title: title,
    notification_body: body,
    notification_ignore: false
  });
  this.props.dispatch(vendorActions.getBookings({ skip: 0, limit: 200 }))
  // const { bookins } = ;
  console.log('received new booking', data)
}
function mapStateToProps (state) {
  const { vendor, tables, authentication } = state
  const { user } = authentication
  console.log('vendor', vendor)
  return {
    user,
    vendor,
    tables
  }
}

const connectedHomePage = connect(mapStateToProps)(HomePage)
export { connectedHomePage as HomePage }
