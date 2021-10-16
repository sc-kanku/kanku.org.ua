import React, {useState, useEffect} from 'react';

const EntitySelector = function({url, onSelect, onAllLoaded}) {
    const [entities, setEntities] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then((loadedEntities) => {
                setEntities(loadedEntities);
                onAllLoaded(loadedEntities);
            })
    }, []);
    
    let onChange = (event) => {
        onSelect(event.target.value);
    }

    let entitiesList = [
        <option key='-1' value={-1}>Виберіть</option>,
        <option key='0' value={0}>Створити новий</option>,
    ].concat(
        entities.map(entity => <option key={entity.id} value={entity.id}>{entity.name}</option>)
    );


    return (
            <select className="form-select" onChange={onChange}>{entitiesList}</select>
    )
}

export default EntitySelector;
