import React from 'react';
import api from '../../services/api';

class StudentItemClass extends React.Component
{

    delete = () =>{
        api.put('/classTeam/removeStudent'+this.props.id)
        window.location.reload();
    }
    render(){
        return <tr> 
                    <th scope="row">{this.props.id}</th>
                    <td>{this.props.name}</td>
                    <td>
                        <button className="btn btn-danger" onClick={this.delete}>Remover da turma</button>
                    </td>
                </tr>
    }
}

export default StudentItemClass;