import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Header from './Header';
import {Dashboard} from './Dashboard';
import {Instances} from './Instances';
import {Instance} from './Instance';
import {NotFound} from './NotFound';
import classNames from './index.module.scss';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className={classNames.main}>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/instances">
            <Instances />
          </Route>
          <Route path="/instance/:id">
            <Instance />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export {App};
