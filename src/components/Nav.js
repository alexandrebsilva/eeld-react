import React from 'react';

function Nav() {
  return (
    <ul className="nav justify-content-center">
      <li className="nav-item">
        <a className="nav-link" href="/">home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/periodos">Periodos</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/turmas">Turmas</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/disciplinas">Disciplinas</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/alunos">Alunos</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/professores">Professores</a>
      </li>
    </ul>
  );
}

export default Nav;