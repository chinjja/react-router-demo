import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import Menu from './components/Menu';
import ShowPageInfo from './components/ShowPageInfo';

const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Posts = React.lazy(() => import('./pages/Posts'));

class App extends React.Component {
  render() {
    return (
      <div>
        <Menu/>
        <Suspense fallback={<div>Loading...</div>}>
          <Route exact path='/' component={Home}/>
          <Route path='/about/:name?' component={About}/>
          <Route path="/posts" component={Posts}/>
        </Suspense>
        <ShowPageInfo/>
      </div>
    );
  }
}

export default App;
