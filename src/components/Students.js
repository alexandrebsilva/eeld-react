import React from 'react';
import StudentItem from './ListItems/StudentItem'
import api from '../services/api';

class Students extends React.Component {


  //nessa requisição se define a pagina para exibir
  getAllStudents = (page = 1) => {
    api.get('/students?page='+page).then((resp)=>{
        this.setState({students:resp.data.docs});
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
              <StudentItem key={student._id} name={student.name} id={student._id}/>
              
            ))
          }
        </tbody>
      </table>
    </div>;
  }
}

export default Students;