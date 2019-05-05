import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import './App.scss';
import Home from './components/Home';
import NewItem from './components/NewItem';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/addnewitem" component={NewItem} />
            </Switch>
          </>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
