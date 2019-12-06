import React from 'react';
import api from '../services/api';

class Students extends React.Component {


  //nessa requisição se define a pagina para exibir
  //por questao de simplificação de tempo de entrega, paginação nao será implantada
  /*getAllStudents = (page = 1) => {
    api.get('/students?page='+page).then((resp)=>{
        this.setState({students:resp.data.docs});
      }
    )
  }*/
  getAllStudents = () => {
    api.get('/allStudents').then((resp)=>{
        this.setState({students:resp.data});
      }
    )
  }
  componentDidMount(){
    this.getAllStudents();
    
  }
  state = {
    students:[],
    newStudentName:''
  }
  onTypeName = (event) => {
    this.setState({newStudentName:event.target.value})
    console.log(this.state)
  }
  saveStudentHandler = (event) => {
    event.preventDefault();
    api.post('students',{
      name:this.state.newStudentName
    }).then(
      ()=>{
        this.setState({newStudentName:''});
        this.getAllStudents(); 
      }
    )
  }
  deleteStudentHandler = (event) =>{
    api.delete('/students/'+event.target.value).then(
      ()=>{
        this.getAllStudents(); 
      }
    )
}
  render() {
    return <div>
      <hr/>
      <h2>Alunos</h2>
      <form>
        <input placeholder="Nome do aluno" name="name" onChange={this.onTypeName} value={this.state.newStudentName}></input>
        <button onClick={this.saveStudentHandler}>Cadastrar</button>
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
            this.state.students.map((student)=>(
              <tr> 
                    <th scope="row">{student._id}</th>
                    <td>{student.name}</td>
                    <td>
                        <button className="btn btn-danger" value={student._id} onClick={this.deleteStudentHandler}>Excluir</button>
                    </td>
                </tr>              
            ))
          }
        </tbody>
      </table>
    </div>;
  }
}

export default Students;