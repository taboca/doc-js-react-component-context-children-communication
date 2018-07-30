# Introduction

This is a simple application created with "create-react-app". It was initiated with the following execution:

```
npx create-react-app my-context-app
```

The initial checked code includes the following files:

* ./app/SharedStore.js
* ./app/FirstLevelElement.js
* ./app/SecondLevelElement.js

The idea is to allow a child element to access a main store, and also to call a method so that to have the store data manipulated. For this, the example will use the new [Context API](https://reactjs.org/docs/context.html) from React.

# Code changes to have the shared context at the child:

First we have created a SharedStore component that is responsible for the creation of a context named "SharedStoreContext" (using React.createContext()) and applying it to its children:

```
import React, { Component } from 'react';
export const SharedStoreContext = React.createContext();

export default class SharedStore extends Component {
  constructor(props) {
    super(props);
    this.state = { data: 'hello world'};
    this.execMethod = this.execMethod.bind(this);
  }
  execMethod() {
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

```

Via doing that, it's possible to go back to the main App.js and simply wrap any component with the SharedStore:

```
import React, { Component } from 'react';
import SharedStore from './app/SharedStore';
import FirstLevelElement from './app/FirstLevelElement';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SharedStore>
          <FirstLevelElement />
        </SharedStore>
      </div>
    );
  }
}

export default App;
```

The above should pass the elements of this.state (from SharedStore) plus one method, into FirstLevelElement's props — check above the value attribute associated with the SharedStoreContext.Provider

```
value = {{...this.state, execMethod: this.execMethod}}
```

Therefore FirstLevelElement is a component that should be able to access "data" and "sharedMethod" from it's render scope.
FirstLevelElement will be then responsible for forwarding these to its child, SecondLevelElement:

```
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
```

And finally,

```
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
```
