import React from 'react';
import api from '../../services/api';

class TeacherItem extends React.Component
{

    delete = () =>{
        api.delete('/teachers/'+this.props.id)
        window.location.reload();
    }
    render(){
        return <tr> 
                    <th scope="row">{this.props.id}</th>
                    <td>{this.props.name}</td>
                    <td>
                        <button className="btn btn-danger" onClick={this.delete}>Excluir</button>
                    </td>
                </tr>
    }
}

export default TeacherItem;