import React from 'react';
import TeacherItem from './ListItems/TeacherItem'
import api from '../services/api';

class Teachers extends React.Component {


  //nessa requisição se define a pagina para exibir
  getAllTeachers = (page = 1) => {
    api.get('/allTeachers').then((resp)=>{
      console.log(resp)
        this.setState({teachers:resp.data});
      }
    )
  }
  componentDidMount(){
    this.getAllTeachers();
    
  }

  state = {
    teachers:[],
    newTeacherName:''
  }

  onTypeName = (event) => {
    this.setState({newTeacherName:event.target.value})
    console.log(this.state)
  }
  saveTeacherHandler = (event) => {
    event.preventDefault();
    api.post('/teachers',{
      name:this.state.newTeacherName
    }).then(
      ()=>{
        this.setState({newTeacherName:''});
        this.getAllTeachers(); 
      }
    )
  }
 
  render() {
    console.log(this.state)
    return <div>
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
        this.state.teachers.map((teacher)=>(
          <TeacherItem key={teacher._id} name={teacher.name} id={teacher._id}/>
          
        ))
      }
        </tbody>
      </table>
    </div>;
  }
}

export default Teachers;

/*{
  this.state.teachers.map((teacher)=>(
    <TeacherItem key={teacher._id} name={teacher.name} id={teacher._id}/>
    
  ))
}*/