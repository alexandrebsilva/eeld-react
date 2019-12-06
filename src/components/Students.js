import React from 'react';
import api from '../services/api';

class Students extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      students: [],
      newStudentName: '',
      disableBtn: false
    }
  }

  //nessa requisição se define a pagina para exibir
  //por questao de simplificação de tempo de entrega, paginação nao será implantada
  /*getAllStudents = (page = 1) => {
    api.get('/students?page='+page).then((resp)=>{
        this.setState({students:resp.data.docs});
      }
    )
  }*/
  getAllStudents = () => {
    api.get('/students/allStudents').then((resp) => {
      this.setState({ students: resp.data });
    }
    )
  }

  componentDidMount() {
    this.getAllStudents();

  }

  onTypeName = (event) => {
    this.setState({ newStudentName: event.target.value })
    console.log(this.state)
  }
  saveStudentHandler = (event) => {
    this.setState({ disableBtn: true })
    event.preventDefault();
    event.target.disabled = true;
    api.post('students', {
      name: this.state.newStudentName
    }).then(
      () => {
        this.setState({ newStudentName: '' });
        this.getAllStudents();
        this.setState({ disableBtn: false })
      }
    )
  }
  deleteStudentHandler = (event) => {
    //event.target.setAttribute("disabled", "disabled");
    this.setState({ disableBtn: true })
    api.delete('/students/' + event.target.value).then(
      () => {
        this.getAllStudents();
        this.setState({ disableBtn: false })
      }
    )
  }
  render() {
    return <div>
      <hr />
      <h2>Alunos</h2>
      <form>
        <input placeholder="Nome do aluno" name="name" onChange={this.onTypeName} value={this.state.newStudentName}></input>
        <button onClick={this.saveStudentHandler} disabled={this.state.disableBtn} >Cadastrar</button>
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
            this.state.students.map((student) => (
              <tr>
                <th scope="row" key={student._id}>{student._id}</th>
                <td>{student.name}</td>
                <td>
                  <button disabled={this.state.disableBtn} className="btn btn-danger" value={student._id} onClick={this.deleteStudentHandler}>Excluir</button>
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