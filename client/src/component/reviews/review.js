import React,{Component} from 'react';
import './review.css';
import {fetchReview} from '../../actions/reviewAction';
import {connect} from 'react-redux';
import {deleteReview} from '../../actions/reviewAction';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';


class Review extends Component{
    componentDidMount(){
        this.props.fetchReview(this.props.id);
    }
    delete(id){
        const ok = window.confirm("리뷰를 삭제하시겠습니까?");
        if(ok===true){
            this.props.deleteReview(id);
        }
    }
    render(){
        const render_review=(
            this.props.review.map((reviews, index)=>
                <TableRow key={index} style={{'borderBottom':'1px solid #e5e5e5'}}>
                    <TableCell style={{ 'width': '15%' }}>
                        <p>{reviews.userName}</p>
                        <p>{String(reviews.date).slice(0,10)}</p>
                    </TableCell >
                    <TableCell >
                        <p>{reviews.content}</p>
                    </TableCell >
                  {reviews.userId===this.props.user.id?
                  <TableCell  style={{'textAlign':'right', 'paddingRight':'15px'}}>
                      <Button variant="contained" color="primary" onClick={()=>this.delete(reviews._id)}>
                          삭제
                      </Button>  
                    </TableCell >
                  :<TableCell ></TableCell >}
                </TableRow>
            )
        );
        return(
            <div className="review-fetch-container">
              <TableContainer>
                  <Table>
                     <TableBody>
                      {render_review}
                     </TableBody>
                  </Table>
              </TableContainer>
            </div>
        );
    }
}
const mapStatetoProps = (state) => ({
    review: state.review.items,
    user: state.auth.user,
    length: state.review.length
  });

  function mapDispatchToProps(dispatch) {
    return {
        fetchReview: id =>{
        dispatch(fetchReview(id));
    },
    deleteReview: id =>{
        dispatch(deleteReview(id));
    }
    }
  }
export default connect(mapStatetoProps,mapDispatchToProps)(Review);