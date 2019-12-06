import React from 'react';
import api from '../services/api'



class ClassTeamDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_turma: this.props.match.params.id,
      turmaDetail: {},
      allStudents: [],
      studentsOfTheClassTeam: [],
      totalStudents: '',
      lastStudent: '',
      addedStudents: []
    }
  }
  findWithAttr = (array, attr, value) => {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }


  getStudents = () => {
    api.get('/classTeams/availableStudents/' + this.props.match.params.id).then((resp) => {
      this.setState({ allStudents: resp.data })

    });
    /*let addedStudents = [];
    let allStudents = [];
    let availableStudents = [];
    api.get('/allStudents').then((resp)=>{
      allStudents = resp.data;
      console.log('todos alunos')
      console.log(allStudents)
      this.setState({allStudents:resp.data})
    });
    api.get('/classTeams/'+this.state.id_turma).then((resp)=>{
      addedStudents = resp.data.students;
      console.log('alunos added')
      console.log(addedStudents)
    });*/


  }


  getStudentsOfClassTeam = () => {
    api.get('/classTeams/' + this.state.id_turma).then((resp) => {
      const idStudents = resp.data.students;

      let studentsDetails = [];
      idStudents.map((idStu) => {
        api.get('/students/' + idStu).then((student) => {
          //this.setState({studentsOfTheClassTeam:studentsDetails})
          studentsDetails.push(student.data);
          this.setState({ studentsOfTheClassTeam: studentsDetails })
        })
      });
    })
  }

  enrollNewStudent = (event) => {
    api.post('/classTeams/addStudent', {
      student_id: event.target.value, classTeam_id: this.state.id_turma
    }).then((resp) => {
      this.getStudentsOfClassTeam();
      this.getStudents();
    })
  }

  componentDidMount() {
    this.getStudents();
    this.getStudentsOfClassTeam();

  }

  deleteStudent = (event) => {
    api.post('/classTeams/removeStudent', { student_id: event.target.value, classTeam_id: this.state.id_turma }).then(
      (resp) => {
        this.getStudents()
        this.getStudentsOfClassTeam();
      })

  }
  render() {
    //renderiza o cadastro apenas se o numero de alunos for menor ou igual a 12

    let head;
    if (this.state.studentsOfTheClassTeam.length < 12) {
      head = <div>
        <label>Adicionar alunos na turma</label>
        <select onChange={this.enrollNewStudent}>
          <option></option>
          {
            this.state.allStudents.map((student) => (
              <option value={student._id}>{student.name}</option>
            ))
          }
        </select>
      </div>;
    }
    else {
      head = <p className="bg-danger text-light">Turma lotada - Impossivel add mais alunos nessa turma</p>
    }

    return <div>
      <h2>Alunos da turma</h2>
      <br />
      <div>
        <p className="bg-success">Total de alunos: {this.state.studentsOfTheClassTeam.length}</p>
      </div>
      {head}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome da turma</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.studentsOfTheClassTeam.map((student) => (
              <tr>
                <th scope="row">{student._id}</th>
                <td>{student.name}</td>
                <td>
                  <button className="btn btn-danger" onClick={this.deleteStudent} value={student._id}>Remover da turma</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>

  }
}

export default ClassTeamDetail