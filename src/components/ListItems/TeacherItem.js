import React from 'react';

class TeacherItem extends React.Component {
  state = [
    {}
  ];
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

export default TeacherItem;