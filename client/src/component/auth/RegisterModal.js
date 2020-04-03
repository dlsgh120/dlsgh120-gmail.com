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
import { register } from '../../actions/authAction';
import { clearErrors } from '../../actions/errorAction';


class RegisterModal extends Component{
    constructor(props){
      super(props);
      this.state ={
        modal: false,
        userName:'',
        userEmail:'',
        userPassword:'',
        msg:this.props.error.msg
    };
    }
    static propTypes ={
        isAuthenticated:propTypes.bool,       
        auth: propTypes.object.isRequired,
        register: propTypes.func.isRequired,
        clearErrors: propTypes.func.isRequired,
        registerCheck: propTypes.bool
    }

    componentDidUpdate(prevProps,prevState){
      const {error} = this.props;
      const {auth} = this.props;

      if(error !==prevProps.error){
        if(error.id==='REGISTER_FAIL'){
          this.setState({msg:error.msg});
        }else{
          this.setState({msg:null});
        }
      }
      if(auth !== prevProps.auth){
        if(this.props.registerCheck){
          this.toggle();
        }
      }
  }
  toggle = () =>{
    // clear errors
    this.props.clearErrors();
    this.setState({modal:!this.state.modal});
    this.setState({userEmail:'', userName:'',userPassword:''});
};

onChange = e =>{
    this.setState({[e.target.name]: e.target.value});
}

onSubmit = e =>{
    e.preventDefault();
    //create user object
    const newUser = {
        userName: this.state.userName,
        userEmail: this.state.userEmail,
        userPassword: this.state.userPassword
     };
     this.props.register(newUser);
};

    render(){
        return(
            <div>
               <NavLink onClick={this.toggle} href="#">
                   Resiger
               </NavLink>

               <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                <ModalBody>
                     {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert>:null}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup> 
                            <Label for="userName">Name</Label>
                            <Input 
                              type="text"
                              name="userName"
                              id="userName"
                              placeholder="Name"
                              className="mb-3"
                              onChange={this.onChange}
                            />

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
                            Register
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
    registerCheck: state.auth.registerCheck
});

export default connect(mapStateToProps,{register, clearErrors})(RegisterModal);