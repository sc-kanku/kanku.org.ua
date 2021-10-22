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
            {(updatingState == 'updating') && '...Оновлення...'}
            {(updatingState == 'updated') && 'Оновлено!'}
        </>
    )
}
