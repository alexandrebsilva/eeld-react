import React from 'react';
import api from '../services/api';

class Teachers extends React.Component {


  //nessa requisição se define a pagina para exibir
  getAllTeachers = (page = 1) => {
    api.get('/teachers/allTeachers').then((resp) => {
      console.log(resp)
      this.setState({ teachers: resp.data });
    }
    )
  }
  componentDidMount() {
    this.getAllTeachers();
  }

  state = {
    teachers: [],
    newTeacherName: ''
  }

  onTypeName = (event) => {
    this.setState({ newTeacherName: event.target.value })
    console.log(this.state)
  }

  saveTeacherHandler = (event) => {
    event.preventDefault();
    api.post('/teachers', {
      name: this.state.newTeacherName
    }).then(
      () => {
        this.setState({ newTeacherName: '' });
        this.getAllTeachers();
      }
    )
  }
  deleteTeacherHandler = (event) => {
    api.delete('/teachers/' + event.target.value).then(
      () => {
        this.getAllTeachers();
      }
    );
  }

  render() {
    console.log(this.state)
    return <div>
      <hr />
      <h2>Professores</h2>
      <form>
        <input placeholder="Nome do Professor" name="name" onChange={this.onTypeName} value={this.state.newTeacherName}></input>
        <button onClick={this.saveTeacherHandler}>Cadastrar</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.teachers.map((teacher) => (
              <tr>
                <th scope="row">{teacher._id}</th>
                <td>{teacher.name}</td>
                <td>
                  <button className="btn btn-danger" value={teacher._id} onClick={this.deleteTeacherHandler}>Excluir</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>;
  }
}

export default Teachers;