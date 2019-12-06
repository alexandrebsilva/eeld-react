import React from 'react';
import Periods from './Periods';
import api from '../services/api';

class PeriodDetail extends React.Component {
  
  constructor(props){
    super(props);
    this.state ={
      periodo_id:this.props.match.params.id,
      details:{},
      classTeamsOfPeriod:[],
      subjectOfThePeriod:{},
      teacherOfThePeriod:{},

      allClassTeamsAvailable:[],
      allTeachersAvailable:[],
      allSubjectsAvailable:[],

      //recebe valores quando alterados os selects
      newClassTeam:'',
      newTeacher:'',
      newSubject:'',
    }
  }

  getPeriodDetail = () => {
    api.get('/periods/'+this.state.periodo_id).then(
      (resp) => {
        this.setState({details:resp.data})
      }
    )
  }

  getAllClassTeams = () => {
    api.get('/allClassTeams').then((resp)=>{
      this.setState({allClassTeamsAvailable:resp.data})
      //console.log(resp.data)
    })
  }

  getClassTeamsOfPeriod = () => {
    api.get('/periods/'+this.state.periodo_id).then((resp) => {
      this.setState({details:resp.data});
      this.setState({classTeamsOfPeriod:this.state.details.classTeams})
    })
  }
  getAllTeachers = ()=>{
    api.get('/allTeachers').then(
      (resp) => {this.setState({allTeachersAvailable:resp.data})}
    )
  }

  getAllSubjects = ()=>{
    api.get('/allSubjects').then(
      (resp) => {this.setState({allSubjectsAvailable:resp.data})}
    )
  }
  getClassTeamsInfo = () => {
    this.state.details.classTeams.map((classTeam)=>{
      //console.log(classTeam)
    })
  }

  componentDidMount(){
    this.getPeriodDetail();
    this.getAllClassTeams();
    this.getClassTeamsOfPeriod();
    this.getAllTeachers();
    this.getAllSubjects();
  }

changeClassTeam = (event) =>{
  this.setState({newClassTeam:event.target.value})
}
changeTeacher = (event) =>{
  this.setState({newTeacher:event.target.value})
}
changeSubject = (event) => {
  this.setState({newSubject:event.target.value})
}

createAula = () => {
  api.post('/periods/addClassTeam',{
    period_id:this.state.periodo_id, 
    classTeam_id:this.state.newClassTeam
  });
  api.post('/periods/addSubject',{
    period_id:this.state.periodo_id, 
    subject_id:this.state.newSubject
  });
  api.post('/periods/addTeacher',{
    period_id:this.state.periodo_id, 
    teacher_id:this.state.newTeacher
  });
  /*console.log(this.state.newClassTeam);
  console.log(this.state.newTeacher);
  console.log(this.state.newSubject);*/
}
    render() {
      return(
        <div>
          <h1>Turmas para esse periodo</h1>
          <div className="row">
            <div className="col-md-4">
            <p>Registre a turma para o periodo</p>
              <select onChange={this.changeClassTeam}>
                <option></option>
                {
                  this.state.allClassTeamsAvailable.map((classTeam)=>(
                    <option value={classTeam._id}>{classTeam.name}</option>
                  ))
                }
              </select>
            </div>
            <div className="col-md-4">
            <p>Registre um Professor para o periodo</p>
              <select onChange={this.changeTeacher}>
                <option></option>
                {
                  this.state.allTeachersAvailable.map((classTeam)=>(
                    <option value={classTeam._id}>{classTeam.name}</option>
                  ))
                }
              </select>
            </div>
            <div className="col-md-4">
            <p>Registre a materia para o periodo</p>
              <select onChange={this.changeSubject}>
                <option></option>
                {
                  this.state.allSubjectsAvailable.map((classTeam)=>(
                    <option value={classTeam._id}>{classTeam.name}</option>
                  ))
                }
              </select>
            </div>
          <div className="col-12 mx-auto">
            <button className="btn btn-success mt-2" onClick={this.createAula}>Criar aula</button>
          </div>
          </div>

          
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Turno</th>
                <th scope="col">Turma</th>
                <th scope="col">Professor</th>
                <th scope="col">Ação</th>
              </tr>
            </thead>
            <tbody>
            
        </tbody>
      </table>
        </div>
      )
    }
  }
  export default PeriodDetail