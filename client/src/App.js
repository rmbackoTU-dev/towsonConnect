/**
 * App.js is where the aggregation of all the react components occur
 * all of the modifications to index.js should happen here
 */
import React, {Component} from 'react';
import Layout from './components/feed/layout/grid-layout';
import './index.css'



class App extends Component
{
  render()
  {  
    return( <Layout />);
  }
}


export default App;