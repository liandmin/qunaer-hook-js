import React, { Component, createContext } from 'react'
// import logo from './logo.svg';
import './App.css';

const BatteryContext = createContext();

class Leaf extends Component {
  render() {
    return (
      <BatteryContext.Consumer>
        {
          battery => <h1>Battery: {battery}</h1>
        }
      </BatteryContext.Consumer>
    )
  }
}

class Middle extends Component {
  render() {
    return (
      <Leaf />
    )
  }
}

class App extends Component {
  render() {
    return (
      <BatteryContext.Provider value={60}>
        <Middle/>
      </BatteryContext.Provider>
    )
  }
}


export default App;
