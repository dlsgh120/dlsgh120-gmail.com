import React,{Component} from 'react';
import './boards.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

class BoardSearchControl extends Component{
    constructor(props){
        super(props);
        this.state={
            keyword:"",
            showSearchInfo:false
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.keyword) {
          this.setState({
            keyword: nextProps.keyword,
            showSearchInfo: true
          });
        }
      }

      onHandleChange = e => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
          [name]: value
        });
      };

      onSearch = e => {
        e.preventDefault();
        this.props.onSearch(this.state.keyword);
      };


      onClearSearch = () => {
        this.props.onSearch("");
        this.setState({
          keyword: "",
          showSearchInfo: false
        });
      };


      clear(){
        const clear = !this.state.showSearchInfo?'':
        <Button onClick={this.onClearSearch} color="primary">
        검색초기화
      </Button >
      return clear;
      }

    render(){
        return(
            <div className="search-container">
        <form onSubmit={this.onSearch}>
          
            <TextField id="standard-basic" 
            label="search" 
            type="string" 
            value={this.state.keyword}
            onChange={({ target: { value } }) => this.setState({keyword:value})}
            />
             <Button variant="contained" 
             color="primary" 
             disableElevation
             startIcon={<SearchIcon />}
             onClick={this.onSearch}>
                검색
             </Button>
             {this.clear()}
          <div className="search-sub">
        {this.state.keyword?<strong>검색어 : {this.state.keyword}</strong>:''}
          </div>
        </form>
      </div>
        )
    }
}

export default BoardSearchControl;  