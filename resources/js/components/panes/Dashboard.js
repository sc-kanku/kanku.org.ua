import React, {useMemo, useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import ListButton from '../controls/buttons/ListButton';
import AddButton from '../controls/buttons/AddButton';


// {athletes.length ? <AthletesTable athletes={athletes} /> : <p>No Athletes</p>}
function Dashboard() {
  return (
        <>
            <div className="mt-2 alert alert-info border border-info">
                Працює додавання нового спортсмена
                (але з <a data-bs-toggle="collapse" href="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2" style={{margin: '1em 0.3em 0 0'}}>н'юансами</a>)
                <div className="collapse mt-2" id="collapseExample2">
                Якщо ви вже знаходитесь в редагуванні спортсмена чи в процесі створювання іншого нового спортсмена, то спочатку треба переключитись на якийсь інший екран.
                </div>

            </div>

            <a className="btn btn-outline-warning" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" style={{margin: '1em 0.3em 0 0'}}>
                <i className="fas fa-info-circle"></i>
            </a>

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

            <div className="collapse mt-2 alert alert-warning border border-warning" id="collapseExample">
                <ul>
                    <li className="alert-heading"><h5>Редагування спортсмена / залу / події в загальному працює.</h5></li>

                    <li className="alert-heading">
                        <h5>Наразі не працює:</h5>
                        <ol>
                            <li>Додавання нового спортсмена працює, але якщо ви вже знаходитесь в редагуванні спортсмена чи в процесі створювання іншого нового спортсмена, то спочатку треба переключитись на якийсь інший екран.</li>
                            <li>Додавання нового залу / новини</li>
                            <li>Редагування фото</li>
                            <li>Валідація</li>
                            <li>Галереї спортсмена / залу / новини відключені наразі</li>
                            <li>В секції 'зали / додати dojo' потрібно показувати лише ті зали в яких даний третер не тренує (В секції 'інструктори / додати athlete' потрібно показувати лише ті athlete в яких даного доджо нема)</li>
                            <li>Редагування Залу / Вручну встановлені координати</li>
                            <li>Редагування Розкладу / Час - злітає фокус on typing</li>
                        </ol>

                        <p>Якби ще вилізло щось інше (або просто маєте хороші ідеї), то дайте будь ласка знати</p>
                    </li>
                <li className="alert-heading">
                    <h5>TODO</h5>
                    <ol>
                        <li>Додавання нового  залу / новини</li>
                        <li>Редагування Розкладу / Час - Крок 15 (чи 30) хв</li>
                        <li>Текстові поля скороченого варіанту опису спортсмена / залу / новини генерувати автоматично</li>
                    </ol>
                </li>
                </ul>
            </div>
          </>
  );
}

export default Dashboard;
