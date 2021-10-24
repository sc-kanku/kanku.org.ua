import React, {useMemo, useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import EditButton from '../controls/buttons/EditButton'
import ListButton from '../controls/buttons/ListButton';
import AddButton from '../controls/buttons/AddButton';


// {athletes.length ? <AthletesTable athletes={athletes} /> : <p>No Athletes</p>}
function Dashboard() {
  return (
    /*
    <Switch>
    <Route path='/admin/dashboard' render={() => (
    */
        <>
          <div className="btn-group" role="group" style={{margin: '1em 0.3em 0 0'}}>
            <ListButton hrefPrefix='/admin/athlete'>Cпортсмени</ListButton>
            <AddButton hrefPrefix='/admin/athlete'></AddButton>
          </div>

          <div className="btn-group" role="group" style={{margin: '1em 0.3em 0 0'}}>
            <ListButton hrefPrefix='/admin/dojo'>Зали</ListButton>
            <AddButton hrefPrefix='/admin/dojo'></AddButton>
          </div>

          <div className="btn-group" role="group" style={{margin: '1em 0.3em 0 0'}}>
            <ListButton hrefPrefix='/admin/post'>Пости</ListButton>
            <AddButton hrefPrefix='/admin/post'></AddButton>
          </div>

            <Link to='/admin/site/refresh' type="button" className="btn btn-outline-success" style={{margin: '1em 0.3em 0 0'}}>
                <i className="fas fa-refresh"></i>Оновити сайт
            </Link>
          </>
          /*
    )} />
    </Switch>
          */
  );
}

export default Dashboard;
