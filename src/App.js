import React from 'react';
import './App.css';

import Nav from './components/Nav';
import Subjects from './components/Subjects';
import Teachers from './components/Teachers';
import Students from './components/Students';
import Periods from './components/Periods';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomeDash  from './components/homeItems/HomeDash';
//import Example from './components/Example';

function App() {
  return (
    <div className="container">
      <Nav/>
      <div className="text-center w-100">
      <h1>EELD</h1>
      <Router>
            <Route path="/" exact={true} component={HomeDash} />     
            <Route path="/alunos" component={Students} />
            <Route path="/professores" component={Teachers} />
        </Router>
      <hr />   
    </div>
    </div>
  );
}

export default App;
