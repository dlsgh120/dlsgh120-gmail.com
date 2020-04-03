import React,{Component} from 'react';
import './todos.css';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import {createTodo} from '../../actions/todoActions';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class TodosPost extends Component{
    constructor(props){
        super(props);

        this.state ={
            name:''
        };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    }


    changeHandler = e =>{
        this.setState({[e.target.name]: e.target.value})
    }
    submitHandler = e =>{
        e.preventDefault();
        
        const todo ={
            userId: this.props.user.id,
            name: this.state.name
        }
        this.props.createTodo(todo);
    }
    render(){
        return(
            <div>
                <form onSubmit={this.submitHandler}>
                    <TextField
                        type="string"
                        id="outlined-full-width"
                        label="Todo"
                        placeholder="할 일을 적어주세요"
                        rows="3"
                        rowsMax="3"
                        // helperText="Full width!"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={this.state.title}
                        onChange={({ target: { value } }) => this.setState({name:value})}
                    />

                    <Button  type="submit" variant="contained" color="primary" disableElevation>
                        등록하기
                    </Button>
                </form>
            </div>
        );
    }
}
const mapStatetoProps = state => ({
    todos: state.todos.items,
    user: state.auth.user
  });
function mapDispatchToProps(dispatch){
    return{
        createTodo: bindActionCreators(createTodo, dispatch)
    }
}
export default connect(mapStatetoProps,mapDispatchToProps)(TodosPost);