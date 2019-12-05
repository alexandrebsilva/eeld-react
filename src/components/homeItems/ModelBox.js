import React from 'react';

class ModelBox extends React.Component {
  render() {
    return <div className="col-md-4 col-sm-12 p-2 homeDash">
    <p>{this.props.name}</p>
    <br/>
    <p>{this.props.count}</p>
    </div>;
  }
}

export default ModelBox;