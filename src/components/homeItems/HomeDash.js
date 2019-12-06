import React from 'react';
import ModelBox from './ModelBox';
import api from '../../services/api';


class HomeDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalTurma: 0,
      totalPeriodo: 0,
      totalDisciplina: 0,
      totalAluno: 0,
      totalProfessor: 0
    }
  }
  componentDidMount() {
    this.loadTotalTurma();
  }

  loadTotalTurma = () => {

    api.get('/classTeams')
      .then((resp) => {
        this.setState({ totalTurma: resp.data.total })
      });

    api.get('/periods')
      .then((resp) => {
        this.setState({ totalPeriodo: resp.data.total })
      });

    api.get('/subjects')
      .then((resp) => {
        this.setState({ totalDisciplina: resp.data.total })
      });

    api.get('/students')
      .then((resp) => {
        this.setState({ totalAluno: resp.data.total })
      });

    api.get('/teachers')
      .then((resp) => {
        this.setState({ totalProfessor: resp.data.total })
      });
  }

  render() {

    return <div className="row">
      <ModelBox name="Turmas" count={this.state.totalTurma} />
      <ModelBox name="Periodos" count={this.state.totalPeriodo} />
      <ModelBox name="Disciplinas" count={this.state.totalDisciplina} />
      <ModelBox name="Alunos" count={this.state.totalAluno} />
      <ModelBox name="Professores" count={this.state.totalProfessor} />
    </div>;
  }
}

export default HomeDash;