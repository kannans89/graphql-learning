import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route , Link} from 'react-router-dom'




//components
 import Posts from './components/posts'
 import Profile from './components/profile'
 import PostItem from './components/post_item'
 import Students from './components/students'
 import StudentDetail from './components/student-detail'


class App extends Component {
    
    
    render(){
        return(
            <div><h1>Home !!</h1></div>
        )
    }
}

const routes = <HashRouter>
             <div>
                 <h2>Router app</h2>
                 <header>
                   <Link to="/">Home</Link>&ensp;
                   <Link to="/posts">Posts</Link> &ensp;
                   <Link to="/profile">Profile</Link>&ensp;
                   <Link to="/students">Students</Link>&ensp;
                </header>
                    <Route exact path="/students" component={Students}></Route>
                    <Route exact path="/students/:studentId" component={StudentDetail}></Route>
                    <Route exact path="/posts" component={Posts}></Route>
                    <Route path="/profile" component={Profile}></Route>
                    <Route path="/posts/:postId" component={PostItem}></Route>
                    <Route exact path="/" component={App}></Route>
              </div>

              </HashRouter>

ReactDOM.render(routes, document.querySelector("#root"))

