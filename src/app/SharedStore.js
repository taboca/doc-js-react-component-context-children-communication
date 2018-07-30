import React, { Component } from 'react';

export const SharedStoreContext = React.createContext();

export default class SharedStore extends Component {
  constructor(props) {
    super(props);
    this.state = { data: 'hello world'};
    this.sharedMethod = this.sharedMethod.bind(this);
  }

  sharedMethod() {
    this.setState({data: 'hi world 2'});
  }

  render() {
    return(
      <SharedStoreContext.Provider value = {{...this.state, execMethod: this.execMethod}}>
        {this.props.children}
      </SharedStoreContext.Provider>
    );
  }

}
