import React, { Component } from 'react';
import {SharedStoreContext} from './SharedStore.js';
import SecondLevelElement from './SecondLevelElement.js';

export default class FirstLevelElement extends Component {
  render() {
    return(
      <SharedStoreContext.Consumer>
        { (sharedValue)  => {
          return(
            <SecondLevelElement data={sharedValue.data} sharedMethod={sharedValue.sharedMethod} />
          )
        }}
      </SharedStoreContext.Consumer>
    );
  }
}
