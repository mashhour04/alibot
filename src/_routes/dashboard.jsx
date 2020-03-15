// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person"; 


// core components/views

import UserProfile from "../_views/UserProfile/UserProfile.jsx";
import MyTables from "../_views/MyTables/MyTables.jsx";
import BookingsTable from "../_views/BookingsTable/BookingsTable.jsx";
import ComingSoon from "../_views/ComingSoon/ComingSoon.jsx"
import createDeal from "../_views/ComingSoon/createDeal"
const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Spoon.ai Dashboard",
    icon: Dashboard,
    component: BookingsTable,
    extra: {
      type: 'coming'
    }
  },
  {
    path: "/past-bookings",
    sidebarName: "Past Bookings",
    navbarName: "Past Bookings",
    icon: "content_paste",
    component: BookingsTable,
    extra: { 
      type: 'past'
    }
  
  },
  {
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile,
    extra: { 
      
    }
  },
  {
    path: "/my-tables",
    sidebarName: "Table List",
    navbarName: "Table List",
    icon: "content_paste",
    component: MyTables,
    extra: { 
      
    }
  },
  {
    path: "/get-deals",
    sidebarName: "Create Deal",
    navbarName: "Create-Deal",
    icon: Person,
    component: ComingSoon,
    extra: { 
      
    }
  },
  {
    path: "/create-deal",
    sidebarName: "Create Deal",
    navbarName: "Create-Deal",
    icon: Person,
    component: createDeal,
    extra: { 
      
    }
  }
];

export default dashboardRoutes;
