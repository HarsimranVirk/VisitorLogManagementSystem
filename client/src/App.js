import React from 'react';
import clsx from 'clsx';
import Home from "./components/Home";
import Form from "./components/Form.jsx";
import Faculty from "./components/Faculty.jsx";
import { makeStyles } from '@material-ui/core/styles';
import { Menu, ChevronLeft } from '@material-ui/icons';
import { Divider, List, ListItem, ListItemText, AppBar, Toolbar, Typography, IconButton, Drawer, CssBaseline, Button } from '@material-ui/core';
import { Link, Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import download from "./assets/images/download.jpeg";
import Dashboard from './components/Dashboard';
import AdminSignup from "./components/AdminSignup";
import AdminLogin from "./components/AdminLogin";
import Report from './components/Report';
import constants from "./constants";

const drawerWidth = 240;
const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [userToken, setUserToken] = React.useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAdmin = () => {
    history.push('/AdminLogin');
  }

  function handleUserToken(userToken) {
    sessionStorage.setItem("adminToken", userToken);
    setUserToken(userToken);
  }

  return (
    <Router history={history}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          style={{ display: 'flex' }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}

            >
              <Menu />
            </IconButton>
            <Typography variant="h6" className={classes.title} noWrap style={{ flex: 1 }}>
              Visitor Log - VJTI
          </Typography>
            <IconButton
              edge="end"
              color="inherit"
            >
              <Button variant="contained" color="primary" disableElevation onClick={handleAdmin}>
                <Typography variant="h6" className={classes.title}>
                  Admin
              </Typography>
              </Button>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeft />
            </IconButton>
          </div>
          <ListItem>
            <a href="http://www.vjti.ac.in/" target="_blank" rel="noopener noreferrer"><img src={download} alt="VJTI_Logo" /></a>
          </ListItem>
          < Divider />
          <List>
            <ListItem button component={Link} to="/">
              <ListItemText>Home</ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/form">
              <ListItemText>Visitor</ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/faculty">
              <ListItemText>Faculty</ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/dashboard">
              <ListItemText>Dashboard</ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/report">
              <ListItemText>Report</ListItemText>
            </ListItem>
          </List>

          <Divider />
          <ListItem button>
            <ListItemText>Support Us</ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>Contribute</ListItemText>
          </ListItem>
        </Drawer>

        <main className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>

          <div className={classes.drawerHeader} />
          {/* <p>{(userToken) ? userToken : "No user token"}</p> */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/form" component={Form} />
            <Route path="/faculty" render={(props) => <Faculty {...props} userToken={userToken} />} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/report" render={(props) => <Report {...props} userToken={userToken} />} />
            <Route path="/adminSignup" render={(props) => <AdminSignup {...props} userToken={userToken} handleUserToken={handleUserToken} />} />
            <Route path="/adminLogin" render={(props) => <AdminLogin {...props} userToken={userToken} handleUserToken={handleUserToken} />} />
            <Route path="*"> <Redirect to="/" /> </Route>
          </Switch>
        </main>
      </div>
    </Router>

  );
}

export default App;
