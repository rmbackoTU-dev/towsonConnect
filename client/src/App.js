/**
 * App.js is where the aggregation of all the react components occur
 * all of the modifications to index.js should happen here
 */
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


import Register from "./components/login/Register";
import Login from "./components/login/Login";
//Add a way to select a course from a list
//import SelectCourse from "./components/login/SelectCourse";
import Layout from './components/layout/grid-layout';

//css imports
import "./index.css"


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
          </Switch>
        </div>
      </Router>
    );
  }
}


export default App;