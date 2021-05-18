import React from 'react';
import './App.css';
import Navbar from './components/Navbar.js';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Trending from './components/Trending.jsx';
import Movies from './components/Movies.jsx';
import TVSeries from './components/TVSeries.jsx';
import Search from './components/Search.jsx';


import Header from './components/Header.js';
import SimpleBottomNavigation from './components/Navbar.js';
import { Container } from '@material-ui/core';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        
        <div className='app'>
          <Container>
            <Switch>
              <Route exact path='/' component={Trending}/>
              <Route exact path='/movies' component={Movies}/>
              <Route exact path='/tvseries' component={TVSeries}/>
              <Route exact path='/search' component={Search}/>
            </Switch>
          </Container>
        </div>

        <SimpleBottomNavigation />
      </BrowserRouter>
    </>
  );
}

export default App;
