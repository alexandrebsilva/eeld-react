import React from 'react';
import Periods from './Periods';
import api from '../services/api';

class PeriodDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      periodo_id: this.props.match.params.id,
      details: {},
      classTeamsOfPeriod: [],
      subjectOfThePeriod: {},
      teacherOfThePeriod: {},
      sessions: [],

      allClassTeamsAvailable: [],
      allTeachersAvailable: [],
      allSubjectsAvailable: [],

      //recebe valores quando alterados os selects
      newClassTeam: '',
      newTeacher: '',
      newSubject: '',
    }
  }

  getPeriodDetail = () => {
    api.get('/periods/' + this.state.periodo_id).then(
      (resp) => {
        this.setState({ details: resp.data })
      }
    )
  }

  getAllClassTeams = () => {
    api.get('/classTeams/allClassTeams').then((resp) => {
      this.setState({ allClassTeamsAvailable: resp.data })
      //console.log(resp.data)
    })
  }

  getClassTeamsOfPeriod = () => {
    api.get('/periods/' + this.state.periodo_id).then((resp) => {
      this.setState({ details: resp.data });
      this.setState({ classTeamsOfPeriod: this.state.details.classTeams })
      //console.log(this.state.details.classTeams)
    })
  }
  getAllTeachers = () => {
    api.get('/teachers/allTeachers').then(
      (resp) => { this.setState({ allTeachersAvailable: resp.data }) }
    )
  }

  getAllSubjects = () => {
    api.get('/subjects/allSubjects').then(
      (resp) => {
        this.setState({ allSubjectsAvailable: resp.data })
        console.log(resp.data)
      }
    )
  }

  getSessionsById = () => {
    api.get('/sessions/period/' + this.state.periodo_id).then(
      (resp) => {
        this.setState({ sessions: resp.data })
        console.log(resp.data)
      }
    )
  }


  componentDidMount() {
    this.getSessionsById();
    this.getPeriodDetail();
    this.getAllClassTeams();
    this.getClassTeamsOfPeriod();
    this.getAllTeachers();
    this.getAllSubjects();
    //console.log(this.state.sessions)
  }

  changeClassTeam = (event) => {
    this.setState({ newClassTeam: event.target.value })
  }
  changeTeacher = (event) => {
    this.setState({ newTeacher: event.target.value })
  }
  changeSubject = (event) => {
    this.setState({ newSubject: event.target.value })
  }

  createAula = () => {
    console.log('clicou no btn')
    api.post('/sessions', {
      periodo_id: this.state.periodo_id,
      teacher: this.state.newTeacher,
      classTeam: this.state.newClassTeam,
      subject: this.state.newSubject,
    }).then(
      (resp) => {
        console.log(resp);
        this.getSessionsById();
      })
    this.setState({ newTeacher: '' })
    this.setState({ newClassTeam: '' })
    this.setState({ newSubject: '' })
  }

  removeSession = (event) => {
    api.delete('/sessions/' + event.target.value).then((resp) => {
      this.getSessionsById();
    })
    //not working! WTF?
    console.log(event.target.value + ' sessao excluida')
  }

  render() {

    let btn;
    if (this.state.newClassTeam == '' || this.state.newTeacher == '' || this.state.newSubject == '') {
      btn = <button disabled className="btn btn-success mt-2" onClick={this.createAula}>Criar aula</button>
    } else {
      btn = <button className="btn btn-success mt-2" onClick={this.createAula}>Criar aula</button>
    }

    return (
      <div>
        <h1>Turmas para esse periodo</h1>
        <div className="row">
          <div className="col-md-4">
            <p>Registre a turma para o periodo</p>
            <select onChange={this.changeClassTeam}>
              <option></option>
              {
                this.state.allClassTeamsAvailable.map((classTeam) => (
                  <option key={classTeam.name} value={classTeam.name}>{classTeam.name}</option>
                ))
              }
            </select>
          </div>
          <div className="col-md-4">
            <p>Registre um Professor para o periodo</p>
            <select onChange={this.changeTeacher}>
              <option></option>
              {
                this.state.allTeachersAvailable.map((classTeam) => (
                  <option key={classTeam.name} value={classTeam.name}>{classTeam.name}</option>
                ))
              }
            </select>
          </div>
          <div className="col-md-4">
            <p>Registre a materia para o periodo</p>
            <select onChange={this.changeSubject}>
              <option></option>
              {
                this.state.allSubjectsAvailable.map((classTeam) => (
                  <option key={classTeam.name} value={classTeam.name}>{classTeam.name}</option>
                ))
              }
            </select>
          </div>
          <div className="col-12 mx-auto">
            {btn}
          </div>
        </div>


        <table className="table">
          <thead>
            <tr>
              <th scope="col">Turno</th>
              <th scope="col">Turma</th>
              <th scope="col">Professor</th>
              <th scope="col">Materia</th>
              <th scope="col">Ação</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.sessions.map((session) => (
                <tr>
                  <th scope="row">{this.state.details.order}</th>
                  <td>{session.classTeam}</td>
                  <td>{session.teacher}</td>
                  <td>{session.subject}</td>
                  <td>
                    <button className="btn btn-danger" onClick={this.removeSession} value={session._id}>Remover da aula</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}
export default PeriodDetail