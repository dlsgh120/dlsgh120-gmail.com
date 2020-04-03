import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MainListItems from './listItems';

import Boards from '../boards/boards';
import BoardRead from '../boards/boardRead';
import BoardWrite from '../boards/boardWrite';
import BoardUpdate from '../boards/boardUpdate';

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/authAction';
import Login from '../user/login';
import Register from '../user/register';
import Todos from '../../component/todos/todos';
import Profile from '../../component/user/profile';
import Github from '../../component/etc/github';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 800,
  },
}));

const Dashboard = (props) =>{
  const {auth, logout} = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
///////////////////////////////
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () =>{
    logout();
    window.location="/";
  }
////////////////////////////////
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
         <Router>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              <Link to="/" style={{"color":"white", "textDecoration":"none"}}>Portpolio</Link>
          </Typography>
          
          {auth.loginCheck?
          <div style={{'display':'flex'}}>
          {auth.user.file!==""&&auth.user.file?
          <Avatar src={process.env.PUBLIC_URL+auth.user.file} alt="" />
          :
          <AccountCircleIcon fontSize="large" style={{'verticalAlign':'middle'}} />}
            <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              {auth.user.userName}님
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </Menu>
          </div>
          :
          <Typography color="inherit">
            <Link to="/register" style={{"color":"white", "marginRight":"20px", "textDecoration":"none"}}>Register</Link>
            <Link to="/login" style={{"color":"white", "textDecoration":"none"}}>Login</Link>
          </Typography>}

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><MainListItems /></List>

      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
          <Container maxWidth="xl">
          <Grid container spacing={1} className={classes.container}>
            {/* Chart */}
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
              <Switch>
            <Route path="/" exact component={Boards}/>
            <Route path="/read/:id" component={BoardRead} />
            <Route path='/write' component={BoardWrite} />
            <Route path='/update' component={BoardUpdate} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/todos' component={Todos} />
            <Route path='/profile' component={Profile} />
            <Route path='/github' component={Github} />
            </Switch>
              </Paper>
            </Grid>
          </Grid>
          </Container>
      </main>
      </Router>
    </div>
    
       
  );
}
const mapStateToProps = state =>({
    auth: state.auth
});

export default connect(mapStateToProps,{logout})(Dashboard);