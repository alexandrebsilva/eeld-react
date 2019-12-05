import React  from 'react';

class Periods extends React.Component {

  render(){
    return <h1>Periodos</h1>;
  }
/*
  //nessa requisição se define a pagina para exibir
  getAllStudents = (page = 1) => {
    api.get('/allPeriods').then((resp)=>{
        this.setState({periods:resp.data.docs});
      }
    )
  }
  componentDidMount(){
    this.getAllStudents();
    
  }
  state = {
    periods:[],
    newPeriodName:''
  }
  onTypeName = (event) => {
    this.setState({newPeriodName:event.target.value})
    console.log(this.state)
  }
  saveStudentHandler = (event) => {
    event.preventDefault();
    api.post('/periods',{
      name:this.state.newPeriodName
    }).then(
      ()=>{
        this.setState({newStudentName:''});
        this.getAllStudents(); 
      }
    )
  }

  render() {
    return <div>
      <h1>testes</h1>
      <form>
        <input placeholder="hora inicial" name="name" ></input>
        <button >Cadastrar</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Hora inicial</th>
            <th scope="col">Hora final</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>;
  }
}*/
}

export default Periods;