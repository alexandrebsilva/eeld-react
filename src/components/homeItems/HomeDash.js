import React from 'react';
import ModelBox from './ModelBox';
import api from '../../services/api';

 
class HomeDash extends React.Component {
  componentDidMount(){
    this.loadTotalTurma();
  }
  loadTotalTurma = () => {
    const estados = {};

    api.get('/classTeams')
    .then((resp)=>{
      estados.totalTurma = resp.data.total;
        api.get('/periods')
      .then((resp)=>{
        estados.totalPeriodo = resp.data.total;
            api.get('/subjects')
            .then((resp)=>{
            estados.totalDisciplina = resp.data.total;
            api.get('/students')
            .then((resp)=>{
              estados.totalAluno = resp.data.total;
              api.get('/teachers')
              .then((resp)=>{
                estados.totalProfessor = resp.data.total;
                this.setState(estados)
              });
            });
         });
      });
    }); 
    
   
  }
  state = {};
  
  render() {
    
    return <div className="row">
        <ModelBox name="Turmas" count={this.state.totalTurma}/>
        <ModelBox name="Periodos" count={this.state.totalPeriodo}/>
        <ModelBox name="Disciplinas" count={this.state.totalDisciplina}/>
        <ModelBox name="Alunos" count={this.state.totalAluno}/>
        <ModelBox name="Professores" count={this.state.totalProfessor}/>
      </div>;
  }
}

export default HomeDash;