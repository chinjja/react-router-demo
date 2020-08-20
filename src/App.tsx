import React from 'react';
import { Route } from 'react-router-dom';
import { Home, About, Posts } from './pages';
import Menu from './components/Menu';
import ShowPageInfo from './components/ShowPageInfo';

class App extends React.Component {
  render() {
    return (
      <div>
        <Menu/>
        <Route exact path='/' component={Home}/>
        <Route path='/about/:name?' component={About}/>
        <Route path="/posts" component={Posts}/>
        <hr/>
        <ShowPageInfo/>
      </div>
    );
  }
}

export default App;
