import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchBoard } from '../../actions/boardAction';
import { bindActionCreators } from 'redux'
import Pagination from './pagination';
import BoardSearchControl from './boardSearchControl';
import BoardsItem from './boardsItem';
import {actSearchBoard} from '../../actions/searchAction';
import './boards.css';

import Button from '@material-ui/core/Button';

import {Link} from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CreateIcon from '@material-ui/icons/Create';

class Boards extends Component{
    constructor(props){
        super(props);
        this.state={
            totalRecords: "",
            totalPages: "",
            pageLimit: 10,
            currentPage: "",
            startIndex: "",
            endIndex: ""
        }
    }
  
    componentDidMount(){
        this.props.fetchBoard();
    }

    renderBoards = boards => {
        var result = null;
        if (boards.length > 0) {
          result = boards.map((boards, index) => {
            return <BoardsItem key={index} boards={boards} index={index} page={this.state.currentPage} limit={this.state.pageLimit}/>;
          });
        }
        return result;
      };

    onChangePage = data => {
        this.setState({
          pageLimit: data.pageLimit,
          totalPages: data.totalPages,
          currentPage: data.page,
          startIndex: data.startIndex,
          endIndex: data.endIndex
        });
      };

      onSearch = keyword => {
        this.props.onSearchBoard(keyword);
      };

    render(){
    let { boards, keyword } = this.props;
    const {
      totalPages,
      currentPage,
      pageLimit,
      startIndex,
      endIndex
    } = this.state;

    if (keyword) {
      boards = boards.filter(boards => {
        return boards.title.toLowerCase().indexOf(keyword) !== -1;
      });
    }
    
    let rowsPerPage = [];
    rowsPerPage = boards.slice(startIndex, endIndex + 1);
        return(
    
              <div className="body-container">
                <div className="body-center">
          <div className="search">
          <BoardSearchControl
            onSearch={this.onSearch}
            keyword={this.props.keyword}
          />
          <div className="board-write">
            {this.props.loginCheck?<Link to="/write" style={{"textDecoration":"none"}}>
            <Button variant="contained" color="primary" disableElevation startIcon={<CreateIcon />}>
              글쓰기
            </Button></Link>
              :<Link to="/login" style={{"textDecoration":"none"}}>
            <Button variant="contained" color="primary" startIcon={<CreateIcon />} disableElevation>
             글쓰기
            </Button></Link>}
          </div>
          </div>

          <div>
            <TableContainer>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell component="th" scope="row" size="medium">제목</TableCell>
                    <TableCell>글쓴이</TableCell>
                    <TableCell>작성날짜</TableCell>
                    <TableCell>조회수</TableCell>
                    <TableCell>읽기</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                 {this.renderBoards(rowsPerPage)}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
      <div className="tableInfo">
        <div className="tableInfo-center">
                <p>게시물 수 : {boards.length}</p>
                <p>현재페이지 | 총 페이지{currentPage}/{totalPages}</p>
        </div>
      </div>

        <div className="page-container">
            <Pagination 
            totalRecords={boards.length}
            pageLimit={pageLimit}
            initialPage={1}
            pagesToShow={5}
            onChangePage={this.onChangePage}
        />
        </div>
        </div>
              </div>
        
        );
    }
}

const mapStatetoProps = (state) => ({
    boards: state.boards.items,
    keyword:state.search.search,
    loginCheck:state.auth.loginCheck
  });
  
  function mapDispatchToProps(dispatch) {
    return {
      fetchBoard: bindActionCreators(fetchBoard, dispatch),
      onSearchBoard: keyword =>{
          dispatch(actSearchBoard(keyword));
      }
      }
    }
  
export default connect(mapStatetoProps,mapDispatchToProps)(Boards);
