import React from 'react';
import Home from './routes/home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PageNotFound from './routes/page-not-found';

const Entry: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* other route redirects to home */}
        <Route path="/*" render={(props) => <PageNotFound props={props} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Entry;
