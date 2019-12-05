import React from 'react';
import api from '../services/api'

class Periods extends React.Component {
  
  getAllPeriods = (page = 1) => {
    api.get('/students?page='+page).
      then((resp)=>{
        this.setState({students:resp.data.docs});
      }
    )
  }
  /*render() {
    return <div>
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
  }*/
}

export default Periods;