import React from 'react';
import api from '../../services/api';

class PeriodItem extends React.Component
{

    delete = () =>{
        api.delete('/periods/'+this.props.id)
        window.location.reload();
    }
    render(){
        return <tr> 
                    <th scope="row">{this.props.id}</th>
                    <td>{this.props.order}</td>
                    <td>{this.props.inicio}</td>
                    <td>{this.props.fim}</td>
                    <td>
                        <button className="btn btn-danger" onClick={this.delete}>Excluir</button>
                        <a href={'/periodos/'+this.props.id} className=" ml-1 btn btn-success">Visualizar</a>
                    </td>
                </tr>
    }
}

export default PeriodItem;