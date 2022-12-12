import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Trending from './components/Trending/Trending';
import Movies from './components/Movies/Movies';
import TVSeries from './components/TVSeries/TVSeries';
import Search from './components/Search/Search';

import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/Navbar/Navbar';
require('dotenv').config();

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        
        <div className='app'>
          {/* <Container> */}
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Trending}/>
              <Route exact path='/movies' component={Movies}/>
              <Route exact path='/tvseries' component={TVSeries}/>
              <Route exact path='/search' component={Search}/>
            </Switch>
          </div>
          {/* </Container> */}
        </div>

        <SimpleBottomNavigation />
      </BrowserRouter>
    </>
  );
}

export default App;
