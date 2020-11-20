import React, { useState, useEffect } from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  fade,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  InputBase,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import DepartureBoardIcon from "@material-ui/icons/DepartureBoard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import color from "../Theme/Color";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { db, auth } from "../firebase";
const drawerWidth = 240;

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  var [Data, setData] = useState("");
  var [Name, setName] = useState("");
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [{ basket, wishlist, user }] = useStateValue();
  const fetchName = async () => {
    console.log("fetchName fired");
    const snapshot = await db
      .collection("Users")
      .doc(user?.uid)
      .collection("details")
      .doc("data")
      .get();
      setData(snapshot.data());
  };
  //Needs to be called when user is changed and fetching is done
  useEffect(() => {
    console.log("UseEffect Fired");
    if (user !== null) {
      console.log("User not NUll, User->", user);
      fetchName();
      cutString();
    }
  }, [user,fetchName]);
  const login = () => {
    history.push("/user_auth");
  };
  const logout = () => {
    auth.signOut();
    console.log("set data resetted");
  };
  const cutString = () => {
    console.log("cutString fired for: ", user?.uid);
    if (Data.Name !== undefined) {
      const name = Data.Name;
      const firstName = name.substr(0, name.indexOf(" "));
      setName(firstName);
    }
  };
  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{ background: color.primary }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon style={{ color: color.secondary }} />
          </IconButton>
          <Typography variant="h6" noWrap style={{ color: color.secondary }}>
            Food for Good
          </Typography>
          <FastfoodIcon />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon style={{ color: color.secondary }} />
            </div>
            <InputBase
              placeholder="Search"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx(classes.paper, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <Typography style={{ fontSize: 20, textAlign: "left" }}>
            Options
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/" style={{ textDecoration: "none" }}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon style={{ fontSize: 40 }} />
              </ListItemIcon>
              <ListItemText className={clsx(classes.link)}>Home</ListItemText>
            </ListItem>
          </Link>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <ListItem button>
              <ListItemIcon>
                <Badge badgeContent={basket?.length} color="secondary">
                  <AddShoppingCartIcon style={{ fontSize: 40 }} />
                </Badge>
              </ListItemIcon>
              <ListItemText className={clsx(classes.link)}>Orders</ListItemText>
            </ListItem>
          </Link>
          <Link to="/delivery" style={{ textDecoration: "none" }}>
            <ListItem button>
              <ListItemIcon>
                <DepartureBoardIcon style={{ fontSize: 40 }} />
              </ListItemIcon>
              <ListItemText className={clsx(classes.link)}>
                Delivery
              </ListItemText>
            </ListItem>
          </Link>
          {user ? (
            <ListItem button onClick={logout}>
              <ListItemIcon>
                <AccountCircleIcon style={{ fontSize: 40 }} />
              </ListItemIcon>
              <ListItemText className={clsx(classes.link)}>
                {Name !== undefined ? `${Name} Log Out` : "Log Out"}
              </ListItemText>
            </ListItem>
          ) : (
            <ListItem button onClick={login}>
              <ListItemIcon>
                <AccountCircleIcon style={{ fontSize: 40 }} />
              </ListItemIcon>
              <ListItemText className={clsx(classes.link)}>
                Login/SignUp
              </ListItemText>
            </ListItem>
          )}
          <Link to="/alert" style={{ textDecoration: "none" }}>
            <ListItem button>
              <ListItemIcon>
                <NotificationsIcon style={{ fontSize: 40 }} />
              </ListItemIcon>
              <ListItemText className={clsx(classes.link)}>
                Notifications
              </ListItemText>
            </ListItem>
          </Link>
          <Link to="/wishlist" style={{ textDecoration: "none" }}>
            <ListItem button>
              <ListItemIcon>
                <Badge badgeContent={wishlist?.length} color="secondary">
                  <FavoriteIcon style={{ fontSize: 40 }} />
                </Badge>
              </ListItemIcon>
              <ListItemText className={clsx(classes.link)}>
                Wish List
              </ListItemText>
            </ListItem>
          </Link>
          <Link to="/support" style={{ textDecoration: "none" }}>
            <ListItem button>
              <ListItemIcon>
                <SupervisorAccountIcon style={{ fontSize: 40 }} />
              </ListItemIcon>
              <ListItemText className={clsx(classes.link)}>
                Customer Support
              </ListItemText>
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    position: "absolute",
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3, 3, 3, 10),
  },
  inputRoot: {
    color: color.secondary,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    background: color.highlight,
  },
  link: {
    color: color.secondary,
    textDecoration: "none",
  },
}));
