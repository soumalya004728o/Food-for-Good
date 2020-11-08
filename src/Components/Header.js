import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import DepartureBoardIcon from "@material-ui/icons/DepartureBoard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import color from "../Theme/Color";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
const drawerWidth = 240;

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [{ basket, wishlist, user }] = useStateValue();
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
          <Link to="/">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon style={{ fontSize: 40 }} />
              </ListItemIcon>
              <ListItemText className={clsx(classes.link)}>Home</ListItemText>
            </ListItem>
          </Link>
          <Link to="/cart">
            <ListItem button>
              <ListItemIcon>
                <Badge badgeContent={basket?.length} color="secondary">
                  <AddShoppingCartIcon style={{ fontSize: 40 }} />
                </Badge>
              </ListItemIcon>
              <ListItemText className={clsx(classes.link)}>Orders</ListItemText>
            </ListItem>
          </Link>
          <Link to="/delivery">
            <ListItem button>
              <ListItemIcon>
                <DepartureBoardIcon style={{ fontSize: 40 }} />
              </ListItemIcon>
              <ListItemText className={clsx(classes.link)}>
                Delivery
              </ListItemText>
            </ListItem>
          </Link>
          <Link to="/user_auth">
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon style={{ fontSize: 40 }} />
              </ListItemIcon>
              <ListItemText className={clsx(classes.link)}>
                Signup/Login
              </ListItemText>
            </ListItem>
          </Link>
          <Link to="/alert">
            <ListItem button>
              <ListItemIcon>
                <NotificationsIcon style={{ fontSize: 40 }} />
              </ListItemIcon>
              <ListItemText className={clsx(classes.link)}>
                Notifications
              </ListItemText>
            </ListItem>
          </Link>
          <Link to="/wishlist">
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
