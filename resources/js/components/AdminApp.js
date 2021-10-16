import React, {useMemo, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {BrowserRouter as Router, Switch, Route, Link, useParams, Redirect} from 'react-router-dom';
import Dashboard from './panes/Dashboard';
import AthletesTable from './panes/AthletesTable';
import DojosTable from './panes/DojosTable';
import PostsTable from './panes/PostsTable';
import SiteRefresh from './panes/SiteRefresh';

// {athletes.length ? <AthletesTable athletes={athletes} /> : <p>No Athletes</p>}
function AdminApp() {
  return (
    <Router>
    
      <Dashboard />
      <AthletesTable />
      <DojosTable />
      <PostsTable />

      <Route exact path='/admin/site/refresh' render={() => (<SiteRefresh />)} />

      <Route exact path="/admin">
        <Redirect to='/admin/athlete/list' />
      </Route>
    </Router>
  )
}

export default AdminApp;

if (document.getElementById('admin-app')) {
    ReactDOM.render(<AdminApp />, document.getElementById('admin-app'));
}
