import React, {Component} from 'react';
import {connect} from 'react-redux';
import {readBoard} from '../../actions/boardAction';

import propTypes from 'prop-types';
import {deleteBoard} from '../../actions/boardAction';
import {Link} from 'react-router-dom';
import './boards.css';
import ReviewPost from '../reviews/reviewPost';
import Review from '../reviews/review';
import {allDeleteReview} from '../../actions/reviewAction';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';


class BoardRead extends Component{
    static propTypes={
        loginCheck:propTypes.bool.isRequired,
        readCheck: propTypes.bool.isRequired
    }
    componentDidMount(){
        const id =this.props.match.params.id;
        this.props.readBoard(id);

    }
    delete(){
      const ok= window.confirm("삭제하시겠습니까?");
      if(ok===true){
          this.props.deleteBoard(this.props.match.params.id);
          this.props.allDeleteReview(this.props.match.params.id);
          window.history.back();
      
      }
    }

    render(){
        let {read, user} = this.props;
        let date = String(read.boardsDate).slice(0,10);
        const deletebutton = (
            <div className="delete-button">
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={()=>this.delete()}
                >
                    삭제
                </Button>
                <Link to="/update" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" startIcon={<UpdateIcon />}>
                     변경
                    </Button>
                </Link>
            </div>
        );
        
      
        return(
            <div className="read-container">
                {this.props.readCheck?<div className="board-read">
            <p className="board-read-logo">자유게시판</p>
            <div className="board-read-title">
                {read.title}
            </div>
            <div>
                <div className="board-read-content-sub">
                   <p> {date} 조회수 : {read.view+1}</p>
                </div>
                <div className="board-read-content">
                    <p>{read.content}</p>
                </div>
                <div className="board-read-back">
                <Button variant="contained" color="primary" disableElevation onClick={()=>{window.history.back()}}> 
                  목록
                </Button>
              {this.props.loginCheck&& read.userId===user.id?deletebutton:""}
                </div>
            </div>
                <ReviewPost />
                <Review id={this.props.match.params.id}/>
          </div>:''}

       
            </div>
        );
    }
}
const mapStatetoProps = (state) => ({
    read:state.boards.read,
    user: state.auth.user,
    loginCheck: state.auth.loginCheck,
    readCheck: state.boards.readCheck
  });

  function mapDispatchToProps(dispatch) {
    return {
        deleteBoard: id =>{
            dispatch(deleteBoard(id));
        },
      readBoard: id =>{
        dispatch(readBoard(id));
    },
    allDeleteReview: id =>{
        dispatch(allDeleteReview(id));
    }
    }
  }

export default connect(mapStatetoProps,mapDispatchToProps)(BoardRead);