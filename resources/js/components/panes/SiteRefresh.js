import React, {useEffect, useState} from 'react';

export default function SiteRefresh () {
    const [updatingState, setUpdatingState] = useState('beforeUpdate');
    const [pagesUpdated, setPagesUpdated] = useState(0);

    useEffect(() => {
        if (updatingState == 'beforeUpdate') {
            setUpdatingState('updating');

            fetch('/api/site/refresh', {
                method: 'POST'
            })
            .then(response => response.json())
            .then( response => {
                setUpdatingState('updated');
                setPagesUpdated(response.updated);
            });
        }
    });

    return (
        <>
            <br />
            <div class="alert alert-success" role="alert">
                {(updatingState == 'updating') && '...Оновлення...'}
                {(updatingState == 'updated') && 'Оновлено!'}
            </div>

            <div class="alert alert-info" role="alert">
                <p>Серверний кеш рівня аплікації тимчасово відключено.</p>
                <p> Всі зміни в даних атлетів, залів та новин 
                автоматично відображаються всюди на сайті і без його оновлення</p>
            </div>
        </>
    )
}
