import React from 'react';
import './App.css';

import Nav from './components/Nav';
import Subjects from './components/Subjects';
import Teachers from './components/Teachers';
import Students from './components/Students';
import Periods from './components/Periods';
import PeriodDetail from './components/PeriodDetail';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import HomeDash  from './components/homeItems/HomeDash';
import ClassTeams from './components/ClassTeams';
import ClassTeam from './components/detail/ClassTeam';

//import Example from './components/Example';

function App() {
  return (
    <div className="container">
      <Nav/>
      <div className="text-center w-100">
      <h1>E.E.L.D</h1>
      <Router>
            <Route path="/" exact={true} component={HomeDash} />     
            <Route path="/alunos"  component={Students} />
            <Route path="/disciplinas"  component={Subjects} />
            <Route path="/turmas" exact={true} component={ClassTeams} />
            <Route path="/turmas/:id" component={ClassTeam} />
            <Route path="/professores" component={Teachers} />
            <Route path="/periodos" exact={true} component={Periods} />
            <Route path="/periodos/:id" exact={true} component={PeriodDetail} />
        </Router>
      <hr />   
    </div>
    </div>
  );
}

export default App;