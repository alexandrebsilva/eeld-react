import React from 'react';
import api from '../../services/api';

class ClassTeamItem extends React.Component{
    delete = () =>{
        api.delete('/classTeams/'+this.props.id)
        window.location.reload();
    }
    render(){
        return <tr> 
                    <th scope="row"><a href="turmas/detalhe/{this.props.id}">{this.props.id}</a></th>
                    <td>{this.props.name}</td>
                    <td>
                        <button className="btn btn-danger" onClick={this.delete}>Excluir</button>
                    </td>
                </tr>
    }
}


export default ClassTeamItem;