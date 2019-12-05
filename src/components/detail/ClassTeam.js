import React from 'react';
import api from '../../services/api'



class ClassTeam extends React.Component {
    componentDidMount(){
        const { handle } = this.props.match.params;
        console.log(handle)
    }
    render (){
        return <h1>Ola detalhe</h1>
    }
}

export default ClassTeam