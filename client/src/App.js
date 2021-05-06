/**
 * App.js is where the aggregation of all the react components occur
 * all of the modifications to index.js should happen here
 */
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


import Register from "./components/login/Register";
import Login from "./components/login/Login";
import Layout from './components/layout/grid-layout';
import MessageBoard2 from './components/message-board/MessageBoard2';
import ThreadBoard2 from './components/message-board/ThreadBoard2';
import Upload from './components/mediaspace/upload';
import CourseList from './components/course-list/CourseList';

//css imports
import "./index.scss"

//bootsrap import
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends Component
{
  render()
  {  
    return(
    <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Register} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/content"  component={Layout}/>
            <Route exact path="/messageboard" component={MessageBoard2} />
            <Route exact path="/threadboard" component={ThreadBoard2} />
            <Route exact path="/upload" component={Upload} />
            <Route exact path="/course-list" component={CourseList} />
          </Switch>
        </div>
      </Router>
    );
  }
}


export default App;