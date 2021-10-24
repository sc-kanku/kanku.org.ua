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
        updateEditedItemUrl : prefixes.api + '/save',
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
        <div className="card_ table-responsive">

        <Styles>
            <Switch>
                <Route path={[urls.editEntityWebUrl, urls.newEntityWebUrl]} render={() => (
                    <>
                    {/*
                        <AddButton hrefPrefix={prefixes.web} entity={entity}>Створити новий</AddButton>
                    
                        <ListButton hrefPrefix={prefixes.web} entity={entity}>До списку</ListButton>
                    */}
                        <EditEntity
                            name={entity}
                            getUrl={urls.getUrl}
                            updateUrl={urls.updateEditedItemUrl}
                        />
                    </>
                )}>
                </Route>

                <Route path={urls.listEntityWebUrl} exact render={() => (
                    <>
                    {/*
                        <AddButton hrefPrefix={prefixes.web} entity={entity}>Створити новий</AddButton>
                    */}
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
        </div>
        </>
    );
}
