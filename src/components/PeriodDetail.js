import React from 'react';
import Periods from './Periods';
import api from '../services/api';

class PeriodDetail extends React.Component {
  
  state = {
    periodo_id:this.props.match.params.id,
    details:{},
    classTeams:{}
  }
  getPeriodDetail = () => {
    api.get('/periods/'+this.state.periodo_id).then(
      (resp) => {
        this.setState({details:resp.data})
        console.log(this.state.details)
      }
    )
  }
  getClassTeamsInfo = () => {
    this.state.details.classTeams.map((classTeam)=>{
      console.log(classTeam)
    })
  }

  componentDidMount(){
    this.getPeriodDetail();
  }

    render() {
      return(
        <div>
          <h1>Turmas para esse periodo</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
            
        </tbody>
      </table>
        </div>
      )
    }
  }
  export default PeriodDetail