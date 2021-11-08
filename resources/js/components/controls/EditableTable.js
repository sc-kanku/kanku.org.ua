import React, {useMemo, useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Styles from './TableStyles';
import Table from './Table';
import EditEntity from './EditEntity';
import AddButton from './buttons/AddButton';
import ListButton from './buttons/ListButton';

export default function EditableTable ({
        columns,
        entity
    }) {

    const [prefixes, setPrefixes] = useState({
        api: '/api/' + entity,
        web: '/admin/' + entity,
    });

    const [urls, setUrls] = useState({
        getTableDataUrl : prefixes.api + '/list',
        inlineUpdateUrl : prefixes.api + '/update',
        getUrl : prefixes.api + '/edit',
        // updateEditedItemUrl : prefixes.api + '/save',
        listEntityWebUrl : prefixes.web + '/list',
        editEntityWebUrl : prefixes.web + '/edit/:id',
        newEntityWebUrl : prefixes.web + '/new',
    })

    const [fullUrls, setFullUrls] = useState({
        editEntityUrl : urls.getUrl + '/:id'
    })

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetch(urls.getTableDataUrl)
            .then(response => response.json())
            .then(setTableData)
    }, []);

    return (
        <>        

        <Styles>
            <Switch>
                <Route path={[urls.editEntityWebUrl, urls.newEntityWebUrl]} render={() => (
                    <>
                    {/*
                        <AddButton hrefPrefix={prefixes.web} entity={entity}>Створити новий</AddButton>
                    
                        <ListButton hrefPrefix={prefixes.web} entity={entity}>До списку</ListButton>
                    */}
                        { entity == 'athlete' && <>
                            <div className="alert alert-success mt-3" role="alert">
                                <h4 className="alert-heading">На цій сторінці наступне вже працює:</h4>
                                <ol>
                                    <li className="text-danger">Розділ 'зали' вже зберігається</li>
                                    <li>Відредаговані дані зберігаються на сервер по втраті фокусу (крім розкладу)
                                        (для текстових полів) чи зміні значення (для селектів і чекбоксів)</li>
                                    <li>і якщо все добре збереглось то з'являється зелена пімпочка справа поля, яке редагувалось
                                    (якщо щось не збереглось, то повідомляє про це аналогічна червона пімпочка)</li>
                                </ol>
                            </div>

                            <div className="alert alert-warning" role="alert">
                                <h4 className="alert-heading">Наразі не працює:</h4>
                                <ol>
                                    <span className="text-secondary">
                                        <li>Додавання нового спортсмена / залу / новини</li>
                                        <li>Редагування фото</li>
                                        <li>Валідація</li>    
                                        <li>І також галереї тренера відключені наразі</li>
                                        <li>В секції 'зали / додати dojo' потрібно показувати лише ті зали в яких даний третер не тренує.</li>
                                    </span>
                                </ol>

                                <p>Якби ще вилізло щось інше (або просто маєте хороші ідеї), то дайте будь ласка знати</p>
                            </div>
                        </>}

                        { entity == 'dojo' && <>
                            <div className="alert alert-success mt-3" role="alert">
                                <h4 className="alert-heading">На цій сторінці майже все працює.</h4>
                            </div>

                            <div className="alert alert-warning" role="alert">
                                <h4 className="alert-heading">Крім:</h4>
                                <ol>
                                    <li>Локація \ Розташування</li>
                                    <li>Вручну встановлені координати? в цьому випадку вони не будуть перераховуватися автоматично</li>
                                    
                                    <span className="text-secondary">
                                        <li>Редагування фото</li>
                                        <li>Валідація</li>
                                        <li>І також галереї відключені наразі</li>
                                        <li>В секції 'інструктори / додати athlete' потрібно показувати лише ті athlete в яких даного доджо нема.</li>
                                    </span>
                                </ol>

                                <p>Якби ще вилізло щось інше (або просто маєте хороші ідеї), то дайте будь ласка знати</p>
                            </div>
                        </>}

                        <EditEntity
                            name={entity}
                            getUrl={urls.getUrl}
                            updateUrl={urls.inlineUpdateUrl}
                        />
                    </>
                )}>
                </Route>

                <Route path={urls.listEntityWebUrl} exact render={() => (
                    <>
                    {/*
                        <AddButton hrefPrefix={prefixes.web} entity={entity}>Створити новий</AddButton>
                    */}
                    { entity == 'athlete' && <>
                            <div className="alert alert-info mt-3" role="alert">
                                <h4 className="alert-heading">На цій сторінці наступне вже працює:</h4>
                                <ol>
                                    <li>Таблиця сортується і фільтрується (Пошук) по всім полям</li>
                                    <li>Дані можна редагувати безпосередньо в таблиці.</li>
                                    <li>Після втрати фокусу поля редагування його значення зберігається на сервері, 
                                    і якщо все добре збереглось то з'являється зелена пімпочка справа в клітинці, яка редагувалась
                                    (якщо щось не збереглось, то повідомляє про це аналогічна червона пімпочка)</li>
                                </ol>
                            </div>

                            <div className="alert alert-warning" role="alert">
                                <h4 className="alert-heading">Наразі не працює:</h4>
                                <ol>
                                    <li>Валідація</li>
                                    <li>Cортування по ступеню</li>
                                    <li>Cинхронізація даних таблички зі змінами, які були внесені на сторінці редагування спортсмена</li>
                                </ol>

                                <p>Якби ще вилізло щось інше (або просто маєте хороші ідеї), то дайте будь ласка знати</p>
                            </div>
                        </>}

                        { entity == 'dojo' && <>
                            <div className="alert alert-info mt-3" role="alert">
                                <h4 className="alert-heading">На цій сторінці все працює</h4>
                            </div>

                            <div className="alert alert-warning" role="alert">
                                <h4 className="alert-heading">Крім</h4>
                                <ol>
                                    <li>Випадайки для Львів / Область і Район</li>
                                    <span className="text-secondary">
                                        <li>Валідація</li>
                                        <li>Cинхронізація даних таблички зі змінами, які були внесені на сторінці редагування залу</li>
                                    </span>
                                </ol>

                                <p>Якби ще вилізло щось інше (або просто маєте хороші ідеї), то дайте будь ласка знати</p>
                            </div>
                        </>}
                        <h2>Всі {entity}</h2>
                        <Table
                            columns={columns} 
                            data={tableData} 
                            inlineUpdateUrl={urls.inlineUpdateUrl}
                        />
                        
                    </>
                )}>
                </Route>
            </Switch>
        </Styles>
        </>
    );
}
