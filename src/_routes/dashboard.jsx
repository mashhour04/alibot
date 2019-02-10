// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";


// core components/views

import UserProfile from "../_views/UserProfile/UserProfile.jsx";
import MyTables from "../_views/MyTables/MyTables.jsx";
import OldTables from "../_components/tables/index";
const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    component: MyTables
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
  }
];

export default dashboardRoutes;
