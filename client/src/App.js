import React,{Component} from 'react';
import { Provider } from 'react-redux';
import store from './store';
import {loadUser} from './actions/authAction';
import Dashboard from './component/nav/dashboard';
class App extends Component{
  componentDidMount(){
    store.dispatch(loadUser());
  }
  render(){

    return(
      <Provider store={store}>
  
        <div className="App">
           <Dashboard />
        </div>
     
      </Provider>
    );
  }
}

export default App;
