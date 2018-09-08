import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route , Link} from 'react-router-dom'




//components

 import Students from './components/students'
 


class App extends Component {
    
    
    
    render(){
        return(
            <div><h1>Home !!</h1>
             <h2>Welcome to React Application !! </h2>
            </div>
        )
    }
}

function getTime(){
    var d =new Date();
    return d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()
}

const routes = <HashRouter>
             <div>
                <h4>Time from react app:{getTime()}</h4>
                 <header>
                     
                <h1>  <Link to="/">Home</Link>&ensp;
                  <Link to="/students">Students</Link>&ensp; </h1>
                </header>
                    <Route exact path="/students" component={Students}></Route>
                    <Route exact path="/" component={App}></Route>
              </div>

              </HashRouter>

ReactDOM.render(routes, document.querySelector("#root"))

