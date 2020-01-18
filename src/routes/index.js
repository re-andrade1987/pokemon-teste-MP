import React from 'react';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';

import { Main, PokemonList, Pokemon, Berries } from '../pages';

const Routes = () => (
  <Router basename='/'>
    <Switch>
      <Route exact path='/pokemon' component={PokemonList} />
      <Route path='/pokemon/:id' render={({ match }) => <Pokemon id={match.params.id} />}
      />
      <Route exact path='/berry' component={Berries} />
      />
      <Route exact path='/' component={Main} />
    </Switch>
  </Router>
);

export default Routes;