import React from 'react';
import api from '../services/api';

class Subjects extends React.Component {


  //nessa requisição se define a pagina para exibir
  getAllSubjects = (page = 1) => {
    api.get('/allSubjects').then((resp)=>{
      console.log(resp)
        this.setState({subjects:resp.data});
      }
    )
  }
  componentDidMount(){
    this.getAllSubjects();
    
  }
  state = {
    subjects:[],
    newSubjectName:''
  }
  onTypeName = (event) => {
    this.setState({newSubjectName:event.target.value})
    console.log(this.state)
  }
  saveSubjectHandler = (event) => {
    event.preventDefault();
    api.post('/subjects',{
      name:this.state.newSubjectName
    }).then(
      (resp)=>{
        this.setState({newSubjectName:''});
        this.getAllSubjects(); 
      }
    )
  }

  deleteSubjectHandler = (event) =>{
    api.delete('/subjects/'+event.target.value).then((resp)=>{
      this.getAllSubjects();
    })
    
    //isso nao pode nunca acontecer
    //window.location.reload();
}
 
  render() {
    console.log(this.state.subjects)
    return <div>
      <form>
        <input placeholder="Nome da Matéria" name="name" onChange={this.onTypeName} value={this.state.newSubjectName}></input>
        <button onClick={this.saveSubjectHandler}>Cadastrar</button>
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
        this.state.subjects.map((subject)=>(
          <tr> 
                    <th scope="row">{subject._id}</th>
                    <td>{subject.name}</td>
                    <td>
                        <button className="btn btn-danger" value={subject._id} onClick={this.deleteSubjectHandler}>Excluir</button>
                    </td>
                </tr>
        ))
      }
        </tbody>
      </table>
    </div>;
  }
}

export default Subjects;
