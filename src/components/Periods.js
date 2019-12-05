import React from 'react';
import PeriodItem from './ListItems/PeriodItem'
import api from '../services/api';

class Periods extends React.Component {


  //nessa requisição se define a pagina para exibir
  getAllPeriods = (page = 1) => {
    api.get('/allPeriods').then((resp)=>{
      console.log(resp)
        this.setState({periods:resp.data});
      }
    )
  }
  componentDidMount(){
    this.getAllPeriods();
    
  }
  state = {
    periods:[],
    newPeriodInicio:'',
    newPeriodFim:'',
    order:''
  }
  onTypeInicio = (event) => {
    this.setState({newPeriodInicio:event.target.value})
    console.log(this.state)
  }
  onTypeFim = (event) => {
    this.setState({newPeriodFim:event.target.value})
    console.log(this.state)
  }
  
  onTypeOrder = (event) => {
    this.setState({order:event.target.value})
    console.log(this.state)
  }
  

  savePeriodHandler = (event) => {
    event.preventDefault();
    api.post('/periods',{
      order:this.state.order,
      beginTime:this.state.newPeriodInicio,
      finishTime:this.state.newPeriodFim,
    }).then(
      ()=>{
        this.setState({newPeriodInicio:''});
        this.setState({newPeriodFim:''});
        this.setState({order:''});
        this.getAllPeriods(); 
      }
    )
  }

 
  render() {
    console.log(this.state)
    return <div>
      <form>
        <input placeholder="Hora inicial" name="name" onChange={this.onTypeInicio} value={this.state.newPeriodInicio}></input>
        <input placeholder="Hora inicial" name="name" onChange={this.onTypeFim} value={this.state.newPeriodFim}></input>
        <input placeholder="Ordem cronologica (1,2,...)" name="name" onChange={this.onTypeOrder} value={this.state.order}></input>
        <button onClick={this.savePeriodHandler}>Cadastrar</button>
      </form>
      <table classInicio="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Hora inicial</th>
            <th scope="col">Hora final</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
        {
        this.state.periods.map((period)=>(
          <PeriodItem key={period._id} inicio={period.beginTime} fim={period.finishTime} order={period.order} id={period._id}/>
        ))
      }
        </tbody>
      </table>
    </div>;
  }
}

export default Periods;

/*{
  this.state.periods.map((period)=>(
    <PeriodItem key={period._id} name={period.name} id={period._id}/>
    
  ))
}*/