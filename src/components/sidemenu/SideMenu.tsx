import { CSSObject } from "@mui/material/styles";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScienceIcon from '@mui/icons-material/Science';
import ReportIcon from '@mui/icons-material/Report';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import PaymentIcon from '@mui/icons-material/Payment';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import NextLink from "next/link";
import scss from "@/styles/SideMenu.module.scss"



import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { signOut } from "next-auth/react";

const drawerWidth = 240; //px
const openedMixin = (theme: Theme): CSSObject => ({ //when the drawer is open
  width: drawerWidth, //width of the drawer
  transition: theme.transitions.create("width", { //transition
    easing: theme.transitions.easing.sharp, //transition easing function
    duration: theme.transitions.duration.enteringScreen, //duration of the transition
  }),
  overflowX: "hidden", //overflow of the drawer
});
const closedMixin = (theme: Theme): CSSObject => ({ //when the drawer is closed
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp, //transition easing function
    duration: theme.transitions.duration.leavingScreen, //duration of the transition
  }),
  overflowX: "hidden",  //overflow of the drawer
  width: `calc(${theme.spacing(7)} + 1px)`, //width of the drawer
  [theme.breakpoints.up("sm")]: { //breakpoint
    width: `calc(${theme.spacing(8)} + 1px)`, //width of the drawer
  },
});
const menuRouteList = [
  "", //list of routes
  "profile",
  "patients",
  "tests",
  "lab",
  "reports",
  "agents",
  "billing",
  "user-control",
  "statistics",
  "settings",
  "",
];
const menuListTranslations = [
  "Dashboard", //list of translations
  "Profile",
  "Patients",
  "Tests",
  "Lab",
  "Reports",
  "Agents",
  "Billing",
  "User Control",
  "Statistics",
  "Settings",
  "Sign Out",
];
const menuListIcons = [
  <DashboardIcon />,
  <PersonIcon />,
  <PeopleIcon />,
  <CheckCircleIcon />,
  <ScienceIcon />,
  <ReportIcon />,
  <GroupWorkIcon />,
  <PaymentIcon />,
  <SupervisedUserCircleIcon />,
  <BarChartIcon />,
  <SettingsIcon />,
  <LogoutIcon />,
];
const SideMenu = () => { //side menu component
  const theme = useTheme(); //theme of the app
  const [open, setOpen] = React.useState(false); //state of the drawer
  const mobileCheck = useMediaQuery("(min-width: 600px)"); //check if the device is mobile
  const handleDrawerToggle = () => { //handle drawer toggle
    setOpen(!open); //set the state of the drawer
  };
  const handleListItemButtonClick = (text: string) => { //handle list item button click
    text === "Sign Out" ? signOut() : null; //if the text is sign out, sign out
    setOpen(false); //close the drawer
  };
  // Chevron icon determined before return statement
  const ChevronIcon = theme.direction === "rtl" ? ChevronRightIcon : ChevronLeftIcon;
  return (
    // drawer component from material ui with custom styles and props
    <Drawer
      variant="permanent" //permanent drawer
      anchor="left" //anchor to the left
      open={open} //open state
      className={scss.SideMenu} //custom class
      sx={{ //custom styles
        width: drawerWidth, //width of the drawer
        [`& .MuiDrawer-paper`]: { //custom styles for the drawer paper
          left: 0, //left position
          top: mobileCheck ? 64 : 60, //top position
          flexShrink: 0, //flex shrink
          whiteSpace: "nowrap", //white space
          boxSizing: "border-box", //box sizing
          ...(open && { //if the drawer is open
            ...openedMixin(theme), //use the opened mixin
            "& .MuiDrawer-paper": openedMixin(theme), //use the opened mixin
          }),
          ...(!open && { //if the drawer is closed
            ...closedMixin(theme), //use the closed mixin
            "& .MuiDrawer-paper": closedMixin(theme), //use the closed mixin
          }), //custom styles for the drawer paper
        }, //custom styles for the drawer paper
      }} //custom styles
    >
      <div className={scss.drawerHeader}>
        <IconButton onClick={handleDrawerToggle}>
        <ChevronIcon />
        </IconButton>
      </div>
      <Divider />
      <Divider />
      <List>
        {menuListTranslations.map((text, index) => ( //map through the menu list translations
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <NextLink
              className={scss.link} //custom class
              href={`/dashboard/${menuRouteList[index]}`} //href of the link
            >
              <ListItemButton
                onClick={() => handleListItemButtonClick(text)} //handle list item button click
                title={text} //title of the list item button
                aria-label={text} //aria label of the list item button
                sx={{
                  minHeight: 48, //min height of the list item button
                  justifyContent: open ? "initial" : "center", //justify content of the list item button
                  px: 2.5, //padding x of the list item button
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0, //min width of the list item icon
                    mr: open ? 3 : "auto", //margin right of the list item icon
                    justifyContent: "center",   //justify content of the list item icon
                  }}
                >
                  {menuListIcons[index]}
                </ListItemIcon>
                <ListItemText
                  primary={text} //primary text of the list item text
                  sx={{
                    color: theme.palette.text.primary, //color of the list item text
                    opacity: open ? 1 : 0, //opacity of the list item text
                  }}
                />{" "}
              </ListItemButton>
            </NextLink>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideMenu; //export the side menu component
