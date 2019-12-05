import React from 'react';
import api from '../../services/api'
import StudentItem from '../ListItems/StudentItem';
import StudentItemClass from '../ListItems/StudentItemClass';



class ClassTeam extends React.Component {
  state = {
    id_turma:this.props.match.params.id,
    turmaDetail:{},
    allStudents:[],
    studentsOfTheClassTeam:[],
    totalStudents:0
  }
  getStudents = () =>{
    api.get('/allStudents').then((resp)=>{
      return resp.data;
    })
  }
    getStudentsOfClassTeam = () =>{
        api.get('/classTeams/'+this.state.id_turma).then((resp)=>{
          const idStudents = resp.data.students;
          let studentsDetails = []; 
          let countStudents=0;
          idStudents.map((idStu)=>{
            api.get('/students/'+idStu).then((student)=>{
              studentsDetails.push(student.data);
              this.setState({studentsOfTheClassTeam:studentsDetails})
              countStudents=countStudents+1;
            })
          });
            this.setState({totalStudents:countStudents})
        })
      }

    componentDidMount(){
      this.getStudents();
      this.getStudentsOfClassTeam();
            console.log(this.state.studentsOfTheClassTeam.length)
    }

    render (){
        return <div>
          <h1>Alunos da turma</h1>
          <br/>
    <p>Total de alunos {this.state.totalStudents}</p>
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
            this.state.studentsOfTheClassTeam.map((student)=>(
              <StudentItemClass key={student._id} name={student.name} id={student._id}/>
            ))
          }
        </tbody>
      </table>
        
        
                  
                
              </div>
        
    }
}

export default ClassTeam