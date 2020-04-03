import React, {Component, Fragment} from 'react';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    Container
  } from 'reactstrap';
  
  import {connect} from 'react-redux';
  import propTypes from 'prop-types';

  import RegisterModal from '../auth/RegisterModal';
  import LoginModal from '../auth/LoginModal';
  import Logout from '../auth/Logout';

  import {Link} from 'react-router-dom';
class AppNavbar extends Component{
    state={
        isOpen:false
    };

    static propTypes ={
        auth: propTypes.object.isRequired
    }
    
    toggle = () =>{
        this.setState({
            isOpen: !this.state.isOpen
        });
        console.log('toggle');
    };
    render(){
        const {loginCheck, user} =this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                     <p>{user ? `${user.userName}님`:''}</p>
                    </span>
                </NavItem>
              <NavItem>
                    <Logout />
              </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                 <NavItem>
                    <RegisterModal />
                 </NavItem>
                 <NavItem>
                    <LoginModal />
                 </NavItem>
                
            </Fragment>
        );

        return(
            <div className="header">
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <Link to="/">MERN</Link>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="m" navbar>
                              {loginCheck ? authLinks : guestLinks}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state =>({
    auth: state.auth
});
export default connect(mapStateToProps,null)(AppNavbar);