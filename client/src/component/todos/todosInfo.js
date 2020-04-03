import React,{Component} from 'react';

// import axios from 'axios';

class TodosInfo extends Component{
    deleteTodos(id){
        if(window.confirm('삭제?')){
            // axios.delete('/api/todos/'+id);
            // const url ='/api/todos/delete/'+id;
            const url = `/api/todos/delete/${id}`;
            console.log(url);
            fetch(url,{
                method:'GET'
            }).then(res => {
                return res.json();
            }).then(data => {console.log(data); 
                                             this.props.stateRefresh();});
        }
       
    }

    render(){
        return(
            <div>
               <p>{this.props.name}</p>
               <button onClick={()=>this.deleteTodos(this.props.id)}>delete</button>
            </div>
        );
    }
}

export default TodosInfo;