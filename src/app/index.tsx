/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { DashboardLayout } from './pages/DashboardLayout';
import { Landing } from './pages/Landing';
import { PageLoader } from 'utils/PageLoader';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Racoon Tracker"
        defaultTitle="Racoon Tracker"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/loader" component={PageLoader} />
        <Route path="/dashboard" component={DashboardLayout} />
      </Switch>
    </BrowserRouter>
  );
}
