import React,{Component} from 'react';
import { connect } from 'react-redux';
import {updateBoard} from '../../actions/boardAction';
import { bindActionCreators } from 'redux'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class BoardUpdate extends Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            content:'',
        }
    }
    componentDidMount(){
        if(this.props.boardError){
            window.location="/";
        }
        this.setState({
            title:this.props.read.title,
            content:this.props.read.content
        })
    }
    changeHandler = e =>{
        this.setState({[e.target.name]: e.target.value});
    }
    submitHandler = e =>{
        e.preventDefault();
        const board = {
            title: this.state.title,
            content: this.state.content
        }
        this.props.updateBoard(this.props.read._id,board);
        window.history.back(2);
    }

    render(){
        return(
            <div>
            <form onSubmit={this.submitHandler}>
            <Typography>
                        글변경
                    </Typography>
                    <TextField
                        type="string"
                        id="outlined-full-width"
                        label="title"
                        placeholder="제목을 작성해주세요"
                        // helperText="Full width!"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={this.state.title}
                        onChange={({ target: { value } }) => this.setState({title:value})}
                    />

                    <TextField
                         type="string"
                        id="outlined-full-width"
                        label="content"
                        multiline
                        rows="25"
                        rowsMax="25"
                        placeholder="내용을 작성해주세요"
                        // helperText="Full width!"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={this.state.content}
                        onChange={({ target: { value } }) => this.setState({content:value})}
                    />
                    <Button  type="submit" variant="contained" color="primary" style={{"marginTop":"50px"}} disableElevation>
                        변경하기
                    </Button>
           </form>
       </div>
        );
    }
}

const mapStatetoProps = state => ({
    read:state.boards.read,
    boardError:state.boards.boardError
  });

  function mapDispatchToProps(dispatch){
    return{
        updateBoard: bindActionCreators(updateBoard, dispatch)
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(BoardUpdate);