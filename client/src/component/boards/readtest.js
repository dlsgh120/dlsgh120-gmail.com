import React, {Component} from 'react';
import {connect} from 'react-redux';
import {readBoard} from '../../actions/boardAction';


class ReadTest extends Component{
    componentDidMount(){
        const id =this.props.match.params.id;
        this.props.readBoard(id);
        
    }
    render(){
        return(
            <div>
               {this.props.read._id}
            </div>
        );
    }
}

const mapStatetoProps = (state) => ({
        read: state.boards.read
  });

function mapDispatchToProps(dispatch) {
    return {
        readBoard: id =>{
          dispatch(readBoard(id));
      }
      }
    }
export default connect(mapStatetoProps,mapDispatchToProps)(ReadTest);