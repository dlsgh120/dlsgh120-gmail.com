import React,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {connect} from 'react-redux'
import { register } from '../../actions/authAction';
import { clearErrors } from '../../actions/errorAction';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import './user.css';

const useStyles = makeStyles((theme) => ({
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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = (props) =>{
  const classes = useStyles();
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPassword2, setUserPassword2] = useState('');
  const [file, setFile] = useState(null);

  
  let{error, registerCheck} = props;
  const {register, clearErrors} = props;

  const onChange = e =>{
    setFile(e.target.files[0]);
  }

  const submitHandler = e =>{
    e.preventDefault();


    if(userPassword!==userPassword2){
        alert("패스워드가 일치하지 않습니다.");
    }else{
        const formdata = new FormData();
        formdata.append('userEmail',userEmail);
        formdata.append('userName',userName);
        formdata.append('userPassword',userPassword);
        formdata.append('file',file);
        register(formdata);
    }
  }

  useEffect(()=>{
    if(error.id==='REGISTER_FAIL'){
        alert(error.msg);
        clearErrors();
    }
    if(registerCheck){
        alert("회원가입 되었습니다.");
        window.location="/login";
    }
  },[error, registerCheck, clearErrors]);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form onSubmit={submitHandler}>
          <Grid container spacing={2}>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userEmail"
                label="Email Address"
                name="userEmail"
                autoComplete="email"
                value={userEmail}
                onChange={({ target: { value } }) => setUserEmail(value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="Your Name"
                name="userName"
                autoComplete="userName"
                value={userName}
                onChange={({ target: { value } }) => setUserName(value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={userPassword}
                onChange={({ target: { value } }) => setUserPassword(value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="ConfirmPassword"
                label="Confirm Password"
                type="password"
                name="ConfirmPassword"
                autoComplete="ConfirmPassword"
                value={userPassword2}
                onChange={({ target: { value } }) => setUserPassword2(value)}
              />
            </Grid>

            <Grid item xs={12}>
            <div className="input-file">
            <CloudUploadIcon style={{'verticalAlign':'middle', 'marginRight':'15px'}} /> 
            <input
               file={file}
              name="file" 
              type="file" 
              onChange={onChange} />  
            </div>
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Log-in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = state =>({
    error: state.error,
    registerCheck: state.auth.registerCheck
});

export default connect(mapStateToProps,{register,clearErrors})(Register);