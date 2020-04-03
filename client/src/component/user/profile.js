import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
//  {loginCheck?<Avatar alt="" src={process.env.PUBLIC_URL+user.file} className={classes.large} />:""} 
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {profileUpdate, reloadProfile} from '../../actions/authAction';

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

const Profile = (props) => {
  const classes = useStyles();

  const {loginCheck, user, update_profile} = props;
  const {profileUpdate, reloadProfile} = props;

  const [file, setFile] = useState(null);
  
  useEffect(()=>{
   if(!loginCheck){
       window.location="/";
   }
   if(update_profile){
     reloadProfile(user.id);
   }
  },[user,loginCheck,reloadProfile,update_profile]);

  const onChange = e =>{
    setFile(e.target.files[0]);
  }

  

  const submitHandler =e =>{
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('file',file);
          profileUpdate(user.id,formdata); 
  }
  return (
    <div className={classes.root}>
         <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
           Proile Input or Update
        </Typography>
        <div style={{'marginTop':'10px','marginBottom':'10px'}}>
        {loginCheck?<Avatar alt="" src={process.env.PUBLIC_URL+user.file} className={classes.large} />:""} 
        </div>
        <form onSubmit={submitHandler} encrypt="multipart/form-data">
          <Grid container spacing={2}>     
            <Grid item xs={12}>
            <div className="input-file">
            <CloudUploadIcon style={{'verticalAlign':'middle', 'marginRight':'15px'}} /> 
            <input
              name="file" 
              type="file"
              file={file}
              onChange={onChange}
             />  
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
            Update
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
     
    </div>
  );
}

const mapStateToProps = state =>({
    loginCheck: state.auth.loginCheck,
    user: state.auth.user,
    update_profile: state.auth.update_profile
})
export default connect(mapStateToProps,{profileUpdate, reloadProfile})(Profile);