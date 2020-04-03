import React,{Component} from 'react';
import './todos.css';
import TodosPost from './todosPost';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { fetchTodo, deleteTodo } from '../../actions/todoActions';

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';

class Todos extends Component{
   componentDidMount(){
    if(!this.props.auth.loginCheck){
      window.location="/";
    }else{
      this.props.fetchTodo(this.props.user.id);
    }
      
   }
   
   delete(id){
     const check = window.confirm('할 일을 끝내셨습니까?');
     if(check===true){
      this.props.deleteTodo(id);
     }
  
   }
    render(){
      
      let renderTodo = this.props.todos.map((todo, index) => 
      <TableRow key={index}>
        <TableCell style={{'width':'50%'}}>{todo.name}</TableCell>
        <TableCell align="center">{String(todo.date).slice(0,10)}</TableCell>
        <TableCell align="center"><Button variant="contained" color="secondary" startIcon={<DoneIcon />} onClick={()=>this.delete(todo._id)}>완료</Button></TableCell>
      </TableRow>

        );
        return(
            <div>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>목록</TableCell>
                      <TableCell align="center">작성날짜</TableCell>
                      <TableCell align="center">완료</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.todos?renderTodo:""}
                  </TableBody>
                </Table>
              </TableContainer>
               <TodosPost/>
            </div>
        );
    }
}


const mapStatetoProps = state => ({
  todos: state.todos.items,
  user: state.auth.user,
  auth: state.auth
});

function mapDispatchToProps(dispatch) {
  return {
    fetchTodo: id =>{
      dispatch(fetchTodo(id))},
    deleteTodo: bindActionCreators(deleteTodo, dispatch)
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Todos);