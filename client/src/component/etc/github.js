import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Github() {
    const classes = useStyles();

  return (
    <div className={classes.root}>
         <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1">
           https://github.com/dlsgh120/dlsgh120-gmail.com
        </Typography>

        <Typography component="h1" style={{'marginTop':'30px'}}>   
        <Button variant="contained" color="primary" href="https://github.com/dlsgh120/dlsgh120-gmail.com" startIcon={<GitHubIcon />}>
        go to github
      </Button>
        </Typography>
      </div>
    </Container>
     
    </div>
  );
}
