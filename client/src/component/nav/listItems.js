import React,{Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import GitHubIcon from '@material-ui/icons/GitHub';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

import { Link } from 'react-router-dom';
import '../../App.css';

import {connect} from 'react-redux';

class MainListItems extends Component{
  render(){
    return(
      <div>
     <Link to="/" style={{"textDecoration": "none"}}>
    <ListItem button>
      <ListItemIcon>
       <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    </Link>

    {this.props.auth.loginCheck?
    <Link to="/todos" style={{"textDecoration":"none"}}>
    <ListItem button>
      <ListItemIcon>
        <ListAltIcon />
      </ListItemIcon>
      <ListItemText primary="Todo" />
    </ListItem>
    </Link>
    :
    <Link to="/login" style={{"textDecoration":"none"}}>
    <ListItem button>
      <ListItemIcon>
        <ListAltIcon />
      </ListItemIcon>
      <ListItemText primary="Todo" />
    </ListItem>
    </Link>}

    {this.props.auth.loginCheck?
    <Link to="/profile" style={{"textDecoration":"none"}}>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIndIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    </Link>
    :
    <Link to="/login" style={{"textDecoration":"none"}}>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIndIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    </Link>}

    <Link to="/github" style={{"textDecoration": "none"}}>
    <ListItem button>
      <ListItemIcon>
       <GitHubIcon />
      </ListItemIcon>
      <ListItemText primary="Github" />
    </ListItem>
    </Link>
  </div>
    );
  }
}

const mapStatetoProps = state => ({
  auth: state.auth
});
export default connect(mapStatetoProps,{})(MainListItems);