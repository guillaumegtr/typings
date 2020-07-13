import React from 'react';
import Home from './routes/home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PageNotFound from './routes/page-not-found';

export default function Entry() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* other route redirects to home */}
        <Route path="/*" render={(props) => <PageNotFound props={props} />} />
      </Switch>
    </BrowserRouter>
  );
}
