import React, {Component} from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {createBoard} from '../../actions/boardAction';
import { bindActionCreators } from 'redux'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class BoardWrite extends Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            content:''
        }
    }
    
static propTypes ={
    loginCheck: propTypes.bool.isRequired,
    user: propTypes.object.isRequired
}

    componentDidMount(){
        if(!this.props.loginCheck){
            window.location="/";
        }
    }
    submitHandler = e =>{
        e.preventDefault();
        const board = {
            userId: this.props.user.id,
            userEmail: this.props.user.userEmail,
            userName: this.props.user.userName,
            title: this.state.title,
            content: this.state.content
        }
        this.props.createBoard(board);
        window.history.back();
    }
    // changeHandler = e =>{
    //     this.setState({[e.target.name]: e.target.value});
    // }
    render(){
        return(
            <div>
                <div>
                    <form onSubmit={this.submitHandler}>
                    <Typography>
                        글쓰기
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
                        등록하기
                    </Button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    loginCheck: state.auth.loginCheck,
    user: state.auth.user
});

function mapDispatchToProps(dispatch){
    return{
        createBoard: bindActionCreators(createBoard, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BoardWrite);