import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {ScrollToTop, Navbar, Sidebar, Footer} from './components';
import {Home, About, Login, Signup, SingleProduct, NewAd, Products} from './pages';

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/signup'>
            <Signup />
          </Route>
          <Route exact path='/products'>
            <Products />
          </Route>
          <Route exact path='/products/:id'>
            <SingleProduct />
          </Route>
          <Route exact path='/newad'>
            <NewAd />
          </Route>
        </Switch>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
