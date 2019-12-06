import React from 'react';
import api from '../services/api';

class ClassTeams extends React.Component {

  getAllClassTeams = () => {
    api.get('/classTeams/allClassTeams').
      then((resp) => {
        console.log(resp.data)
        this.setState({ classTeams: resp.data });
      }
      )
  }

  componentDidMount() {
    this.getAllClassTeams();
    console.log(this.state)
  }

  state = {
    classTeams: [],
    newClassTeamName: '',
    students: []
  }
  onTypeName = (event) => {
    this.setState({ newClassTeamName: event.target.value })
    console.log(this.state)
  }
  saveClassTeamHandler = (event) => {
    event.preventDefault();
    api.post('/classTeams', {
      name: this.state.newClassTeamName
    }).then(
      () => {
        this.setState({ newClassTeamName: '' });
        this.getAllClassTeams();
      }
    )
  }

  deleteClassTeamHandler = (event) => {
    api.delete('/classTeams/' + event.target.value).then(
      () => {
        this.getAllClassTeams();
      }
    )
  }

  render() {
    return <div>
      <form>
        <input placeholder="Nome da turma" name="name" onChange={this.onTypeName} value={this.state.newClassTeamName}></input>
        <button onClick={this.saveClassTeamHandler}>Cadastrar</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome Turma</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.classTeams.map((classTeam) => (
              <tr key={classTeam._id}>
                <th scope="row">{classTeam._id}</th>
                <td>{classTeam.name}</td>
                <td>
                  <button className="btn btn-danger" value={classTeam._id} onClick={this.deleteClassTeamHandler}>Excluir</button>
                  <a href={'/turmas/' + classTeam._id} className=" ml-1 btn btn-success">Visualizar</a>
                </td>
              </tr>

            ))
          }
        </tbody>
      </table>
    </div>;
  }
}

export default ClassTeams;