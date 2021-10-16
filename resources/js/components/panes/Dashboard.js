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
            <ListButton hrefPrefix='/admin/athlete'>Cпортсмени</ListButton>
            <AddButton hrefPrefix='/admin/athlete'>Створити нового спортсмена</AddButton>

            <ListButton hrefPrefix='/admin/dojo'>Зали</ListButton>
            <AddButton hrefPrefix='/admin/dojo'>Створити новий зал</AddButton>

            <ListButton hrefPrefix='/admin/post'>Пости</ListButton>
            <AddButton hrefPrefix='/admin/post'>Створити новий пост</AddButton>

            <Link to='/admin/site/refresh' type="button" className="btn btn-outline-success">
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
