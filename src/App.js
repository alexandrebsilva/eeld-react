import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Subjects from './components/Subjects';
import Teachers from './components/Teachers';
import Students from './components/Students';
import Periods from './components/Periods';
import ClassTeams from './components/ClassTeams';
import ClassTeam from './components/detail/ClassTeam';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomeDash  from './components/homeItems/HomeDash';
//import Example from './components/Example';

function App() {
  return (
    <Router>
    <div>
      <Nav/>
      <div className="container">
      <div className="text-center w-100">
      <h1>EELD</h1>
      <hr />
      </div>
      <Route path="/dash" component={HomeDash}/>
      <Route path="/disciplinas" component={Subjects} />
      <Route path="/turmas" component={ClassTeams} />
      <Route path="/turmas/:id" component={ClassTeam} />
      <Route path="/periodos" component={Periods} />
      <Route path="/professores" component={Teachers} />
      <Route path="/alunos" component={Students} />
      </div>
    </div>
    </Router>
  );
}

export default App;
