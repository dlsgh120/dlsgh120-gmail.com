import React, {Component} from 'react';
import{
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import { login } from '../../actions/authAction';
import { clearErrors } from '../../actions/errorAction';


class LoginModal extends Component{
    constructor(props){
      super(props);
      this.state ={
        modal: false,
        userEmail:'',
        userPassword:'',
        msg:null
    };
    }
    static propTypes ={
        isAuthenticated:propTypes.bool,       
        auth: propTypes.object.isRequired,
        login: propTypes.func.isRequired,
        clearErrors: propTypes.func.isRequired,
        loginCheck:propTypes.bool
    }

    componentDidUpdate(prevProps){
      const {error} = this.props;
      const {auth} = this.props;

      if(error !==prevProps.error){
        if(error.id==='LOGIN_FAIL'){
          this.setState({msg:error.msg});
        }else{
          this.setState({msg:null});
        }
      }

      if(auth !==prevProps.auth){
          if(this.props.loginCheck){
              this.toggle();
          }
      }
  }
  toggle = () =>{
    // clear errors
    this.props.clearErrors();
    this.setState({modal:!this.state.modal});
    this.setState({userEmail:'',userPassword:''});
};

onChange = e =>{
    this.setState({[e.target.name]: e.target.value});
}

onSubmit = e =>{
    e.preventDefault();
    //create user object
   const {userEmail, userPassword} = this.state;
   
   const user ={
       userEmail,
       userPassword
   }
   this.props.login(user);
};

    render(){
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">
                   Login
               </NavLink>
               <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                <ModalBody>
                {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert>:null}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup> 

                             <Label for="userEmail">Email</Label>
                            <Input 
                              type="email"
                              name="userEmail"
                              id="userEmail"
                              placeholder="Email"
                              className="mb-3"
                              onChange={this.onChange}
                            />

                             <Label for="userPassword">Password</Label>
                            <Input 
                              type="password"
                              name="userPassword"
                              id="userPassword"
                              placeholder="Password"
                              className="mb-3"
                              onChange={this.onChange}
                            />

                            <Button color="dark" style={{ marginTop:"2rem"}} block>
                            Login
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
               </Modal>
            </div>
        );
    }
};

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    auth: state.auth,
    loginCheck: state.auth.loginCheck
});

export default connect(mapStateToProps,{login, clearErrors})(LoginModal);