import React, {Component} from 'react';
import './boards.css';
// import {readBoard} from '../../actions/boardAction';
// import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import VisibilityIcon from '@material-ui/icons/Visibility';

import {Link} from 'react-router-dom';

class BoardsItem extends Component{
    constructor(props){
      super(props);
      this.state={
        id : ''
      }
    }
    // view(id){
    //   this.props.readBoard(id);
    // }
      render(){
          let num = (this.props.page -1)*this.props.limit;
          const date = String(this.props.boards.boardsDate).slice(0,10);
          return(

             <TableRow>
                  <TableCell>{(this.props.index+1)+num}</TableCell>
                  <TableCell component="th" scope="row" size="medium">{this.props.boards.title}</TableCell>
                  <TableCell>{this.props.boards.userName}</TableCell>
                  <TableCell>{date}</TableCell>
                  <TableCell>{this.props.boards.view}</TableCell>
                  <TableCell>
                    <Link to={'/read/'+this.props.boards._id} style={{'textDecoration':'none'}}>
                        <Button variant="contained" color="primary" disableElevation startIcon={<VisibilityIcon />}>
                          View
                        </Button>
                        </Link>
                  </TableCell>
                </TableRow>
            
          );
      }
  }
  
  // function mapDispatchToProps(dispatch) {
  //   return {
  //       readBoard: id =>{
  //         dispatch(readBoard(id));
  //     }
  //     }
  //   }
  
  // export default connect(null,mapDispatchToProps)(BoardsItem);
  export default BoardsItem;