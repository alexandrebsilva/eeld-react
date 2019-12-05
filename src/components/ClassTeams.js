import React from 'react';
import ClassTeamItem from './ListItems/ClassTeamItem'
import api from '../services/api';

class ClassTeams extends React.Component {

  getAllClassTeams = () => {
    api.get('/allClassTeams').
      then((resp)=>{
        console.log(resp.data)
        this.setState({classTeams:resp.data});
      }
    )
  }

  componentDidMount(){
    this.getAllClassTeams();
    console.log(this.state)
  }

  state = {
    classTeams:[],
    newClassTeamName:'',
    students:[]
  }
  onTypeName = (event) => {
    this.setState({newClassTeamName:event.target.value})
    console.log(this.state)
  }
  saveClassTeamHandler = (event) => {
    event.preventDefault();
    api.post('/classTeams',{
      name:this.state.newClassTeamName
    }).then(
      () => {
        this.setState({newClassTeamName:''});
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
            this.state.classTeams.map((classTeam)=>(
              <ClassTeamItem key={classTeam._id} name={classTeam.name} id={classTeam._id}/>
            ))
          }
        </tbody>
      </table>
    </div>;
  }
}

export default ClassTeams;