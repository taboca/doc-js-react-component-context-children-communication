import React, { Component } from 'react';

export default class SecondLevelElement extends Component {
  componentWillMount() {
    this.props.sharedMethod();
  }
  render() {
    return(
      <div>{this.props.data}</div>
    );
  }
}
