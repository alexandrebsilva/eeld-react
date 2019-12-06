import React from 'react';
import api from '../../services/api';

class ClassTeamItem extends React.Component{
    delete = () =>{
        api.delete('/classTeams/'+this.props.id)
        window.location.reload();
    }
    render(){
        return <tr> 
                    <th scope="row"><a href="/{this.props.id}">{this.props.id}</a></th>
                    <td>{this.props.name}</td>
                    <td>
                        <button className="btn btn-danger" onClick={this.delete}>Excluir</button>
                        <a href={'/turmas/'+this.props.id} className=" ml-1 btn btn-success">Visualizar</a>
                    </td>
                </tr>
    }
}

export default ClassTeamItem;