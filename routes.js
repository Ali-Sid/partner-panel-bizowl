import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdWork,
  MdSearch,

} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/partner/default";
import ServiceRequest from "views/partner/service Request";
// import Profile from "views/partner/profile";
import DataTables from "views/partner/dataTables";
import RTL from "views/partner/rtl";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import Project from "views/partner/project";
import Profile from "views/partner/partnerProfile";
import { GoProject } from "react-icons/go";
import { IoBagOutline } from "react-icons/io5";
import Portfolio from 'views/partner/portfolio';
import { CgProfile } from "react-icons/cg";
import Dashboard from 'views/partner/dashboard'
import QuotePrice from "views/partner/quotePrice";
import Inbox from "views/partner/inbox";
import { TbMessageDots } from "react-icons/tb";

const routes = [
  // {
  //   name: "Main Dashboard",
  //   layout: "/partner",
  //   path: "/home",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: MainDashboard,
  // },

  // {
  //   name: "Service Request",
  //   layout: "/partner",
  //   path: "/services",
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width='20px'
  //       height='20px'
  //       color='inherit'
  //     />
  //   ),
  //   component: ServiceRequest,
  //   secondary: true,
  // },
  {
    name: "Dashboard",
    layout: "/partner",
    path: "/home",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Dashboard,
  },
  {
    name: "Project",
    layout: "/partner",
    path: "/project",
    icon: <Icon as={GoProject} width='20px' height='20px' color='inherit' />,
    component: Project,
    secondary: true,
  },
  {
    name: "Portfolio",
    layout: "/partner",
    path: "/portfolio",
    icon: <Icon as={IoBagOutline} width='20px' height='20px' color='inherit' />,
    component: Portfolio,
    secondary: true,
  },
  {
    name: "Inbox",
    layout: "/partner",
    path: "/inbox",
    icon: <Icon as={TbMessageDots} width='20px' height='20px' color='inherit' />,
    component: Inbox,
    secondary: true,
  },
  {
    name: "Profile",
    layout: "/partner",
    path: "/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
    secondary: true,
  },
  {
    name: "Quote",
    layout: "/partner",
    path: "/quote",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: QuotePrice,
    secondary: true,
  },

  // {
  //   name: "Bookings and Reservations",
  //   layout: "/admin",
  //   icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
  //   path: "/data-tables",
  //   component: DataTables,
  // },
  // {
  //   name: "Profile",
  //   layout: "/partner",
  //   path: "/profile",
  //   icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
  //   component: Profile,
  // },
  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "/sign-in",
  //   icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
  //   component: SignInCentered,
  // },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "/rtl-default",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: RTL,
  // },
];

export default routes;
