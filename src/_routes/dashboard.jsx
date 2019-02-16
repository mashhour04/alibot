// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";


// core components/views

import UserProfile from "../_views/UserProfile/UserProfile.jsx";
import MyTables from "../_views/MyTables/MyTables.jsx";
import BookingsTable from "../_views/BookingsTable/BookingsTable.jsx";
import ComingSoon from "../_views/ComingSoon/ComingSoon.jsx"
const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    component: BookingsTable
  },
  {
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },
  {
    path: "/my-tables",
    sidebarName: "Table List",
    navbarName: "Table List",
    icon: "content_paste",
    component: MyTables
  },
  {
    path: "/create-deal",
    sidebarName: "Create Deal",
    navbarName: "Create-Deal",
    icon: Person,
    component: ComingSoon
  }
];

export default dashboardRoutes;
