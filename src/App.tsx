import React from 'react';
import { Route } from 'react-router-dom';
import { Home, About, Posts, NivoChart, ReChart } from './pages';
import Menu from './components/Menu';
import ShowPageInfo from './components/ShowPageInfo';
import { Divider } from '@material-ui/core';
import HighlightAndZoomLineChart from './pages/HighlightAndZoomLineChart';

class App extends React.Component {
  render() {
    return (
      <div>
        <Menu/>
        <Route exact path='/' component={Home}/>
        <Route path='/about/:name?' component={About}/>
        <Route path="/posts" component={Posts}/>
        <Divider />
        <NivoChart />
        <Divider />
        <ReChart />
        <Divider />
        <HighlightAndZoomLineChart />
        <Divider />
        <ShowPageInfo/>
      </div>
    );
  }
}

export default App;
