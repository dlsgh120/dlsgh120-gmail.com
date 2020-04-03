import React, {Component} from 'react';
import {connect} from 'react-redux';
import './review.css';
import {createReview} from '../../actions/reviewAction';
import { bindActionCreators } from 'redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class ReviewPost extends Component{
    constructor(props){
        super(props);
        this.state={
            content:''
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    submitHandler=e=>{
        e.preventDefault();
    //   console.log(this.props.user.id);
    //   console.log(this.props.read._id);
    //   console.log(this.props.user.userName);
    //   console.log(this.state.content);

      const review ={
          userId: this.props.user.id,
          boardId: this.props.read._id,
          content: this.state.content,
          userName: this.props.user.userName
      }
      this.props.createReview(review);
      this.setState({content:''});
    }

    changeHandler = e =>{
        this.setState({[e.target.name]: e.target.value});
    }
    render(){
        const reviewTrue =(
            <form onSubmit={this.submitHandler}>
                  <div className="reviewPost">
                           <div className="reviewPost-left">
                           <p>댓글달기</p>
                           <p>{this.props.user.userName}님</p>
                           </div>
                            <div className="reviewPost-middle">
                            <TextField
                                type="string"
                                id="outlined-full-width"
                                label="content"
                                multiline
                                rows="2"
                                rowsMax="25"
                                placeholder="내용을 작성해주세요"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                                variant="outlined"
                                value={this.props.content}
                                onChange={({ target: { value } }) => this.setState({content:value})}
                           />
                            </div>
                           <div className="reviewPost-right">
                           <Button type="submit" variant="contained" color="primary" fullWidth style={{'height':'70px'}}>등록</Button>


                           </div>
                      </div>
                   
           </form>
        );
        const reviewFalse =(
                      <div className="reviewPost">
                           <div className="reviewPost-left">
                            <p>댓글달기</p>
                            <p>로그인 후 이용바랍니다.</p>
                           </div>
                            <div className="reviewPost-middle">
                            <TextField
                                id="outlined-full-width"
                                label="content"
                                multiline
                                rows="2"
                                rowsMax="5"
                                placeholder="작성할수 없습니다."
                                // helperText="Full width!"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={this.state.content}
                            />
                            </div>
                           <div className="reviewPost-right">
                              <Button variant="contained" color="primary" fullWidth style={{'height':'70px'}}>등록</Button>
                           </div>
                      </div>
                   
        );
        return(
            <div className="Review-post-container">
                {this.props.loginCheck?reviewTrue:reviewFalse}
              
            </div>
        );
    }
}

const mapStatetoProps = (state) => ({
    loginCheck: state.auth.loginCheck,
    user: state.auth.user,
    read: state.boards.read
  });

  function mapDispatchToProps(dispatch){
    return{
        createReview: bindActionCreators(createReview, dispatch)
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(ReviewPost);